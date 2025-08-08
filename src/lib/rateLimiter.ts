// Simple in-memory rate limiter for serverless environments
interface RateLimit {
  count: number;
  resetTime: number;
  firstRequest: number;
}

// Memory store for rate limiting
const rateLimitStore = new Map<string, RateLimit>();

// Cleanup old entries periodically to prevent memory leaks
const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL) {
    for (const [key, limit] of rateLimitStore.entries()) {
      if (now > limit.resetTime) {
        rateLimitStore.delete(key);
      }
    }
    lastCleanup = now;
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 3,
  windowMs: number = 60 * 60 * 1000 // 1 hour default
): RateLimitResult {
  cleanup();
  
  const now = Date.now();
  const key = `diagnosis:${identifier}`;
  
  let limit = rateLimitStore.get(key);
  
  if (!limit) {
    // First request
    limit = {
      count: 1,
      resetTime: now + windowMs,
      firstRequest: now
    };
    rateLimitStore.set(key, limit);
    
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: limit.resetTime
    };
  }
  
  // Check if window has expired
  if (now >= limit.resetTime) {
    limit.count = 1;
    limit.resetTime = now + windowMs;
    limit.firstRequest = now;
    rateLimitStore.set(key, limit);
    
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: limit.resetTime
    };
  }
  
  // Within the window
  if (limit.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: limit.resetTime,
      retryAfter: Math.ceil((limit.resetTime - now) / 1000)
    };
  }
  
  // Increment count
  limit.count += 1;
  rateLimitStore.set(key, limit);
  
  return {
    allowed: true,
    remaining: maxRequests - limit.count,
    resetTime: limit.resetTime
  };
}

// Get client IP with proxy support
export function getClientIP(request: Request): string {
  // Check various headers for real IP (common in proxy/CDN setups)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfIp = request.headers.get('cf-connecting-ip'); // Cloudflare
  const xClientIp = request.headers.get('x-client-ip');
  
  if (forwarded) {
    // X-Forwarded-For can contain multiple IPs, get the first one
    return forwarded.split(',')[0].trim();
  }
  
  return realIp || cfIp || xClientIp || 'unknown';
}

// Additional security checks
export interface SecurityCheckResult {
  allowed: boolean;
  reason?: string;
  riskScore: number; // 0-100, higher = more suspicious
}

export function performSecurityChecks(request: Request, formData: Record<string, unknown>): SecurityCheckResult {
  let riskScore = 0;
  const reasons: string[] = [];
  
  // Check User-Agent
  const userAgent = request.headers.get('user-agent') || '';
  if (!userAgent) {
    riskScore += 30;
    reasons.push('Missing User-Agent');
  } else if (userAgent.includes('bot') || userAgent.includes('crawler') || userAgent.includes('spider')) {
    riskScore += 40;
    reasons.push('Bot User-Agent detected');
  } else if (userAgent.length < 20) {
    riskScore += 20;
    reasons.push('Suspicious User-Agent');
  }
  
  // Check Referer
  const referer = request.headers.get('referer') || '';
  if (!referer) {
    riskScore += 15;
    reasons.push('Missing Referer');
  } else {
    try {
      const refererUrl = new URL(referer);
      const allowedDomains = ['gyaku-ten.jp', 'localhost'];
      if (!allowedDomains.some(domain => refererUrl.hostname.includes(domain))) {
        riskScore += 25;
        reasons.push('Suspicious Referer domain');
      }
    } catch {
      riskScore += 20;
      reasons.push('Invalid Referer URL');
    }
  }
  
  // Check Origin
  const origin = request.headers.get('origin') || '';
  if (origin) {
    try {
      const originUrl = new URL(origin);
      const allowedDomains = ['gyaku-ten.jp', 'localhost'];
      if (!allowedDomains.some(domain => originUrl.hostname.includes(domain))) {
        riskScore += 25;
        reasons.push('Suspicious Origin domain');
      }
    } catch {
      riskScore += 20;
      reasons.push('Invalid Origin URL');
    }
  }
  
  // Check form data patterns
  if (formData) {
    // Check for common spam patterns
    const spamPatterns = [
      /[a-zA-Z]{50,}/, // Very long strings without spaces
      /\d{10,}/, // Very long numbers
      /(viagra|cialis|pharmacy|casino|poker)/i,
      /http[s]?:\/\/[^\s]+\.(tk|ml|ga|cf)/i, // Suspicious TLDs
      /[A-Z]{10,}/, // All caps strings
    ];
    
    const textFields = [
      typeof formData.name === 'string' ? formData.name : '',
      typeof formData.company === 'string' ? formData.company : '',
      typeof formData.message === 'string' ? formData.message : ''
    ].filter(Boolean);
    
    for (const text of textFields) {
      for (const pattern of spamPatterns) {
        if (pattern.test(text)) {
          riskScore += 30;
          reasons.push('Suspicious content pattern detected');
          break;
        }
      }
    }
    
    // Check email domain
    if (typeof formData.email === 'string' && formData.email) {
      const emailParts = formData.email.split('@');
      if (emailParts.length === 2) {
        const domain = emailParts[1].toLowerCase();
        const suspiciousDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com'];
        if (suspiciousDomains.includes(domain)) {
          riskScore += 20;
          reasons.push('Temporary email service detected');
        }
      }
    }
    
    // Check for duplicate content (same text in multiple fields)
    const name = typeof formData.name === 'string' ? formData.name : '';
    const company = typeof formData.company === 'string' ? formData.company : '';
    if (name === company && name.length > 5) {
      riskScore += 15;
      reasons.push('Duplicate content across fields');
    }
  }
  
  return {
    allowed: riskScore < 60, // Block if risk score is 60 or higher
    reason: reasons.length > 0 ? reasons.join(', ') : undefined,
    riskScore
  };
}