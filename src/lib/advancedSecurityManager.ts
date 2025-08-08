// Advanced Security Manager for Vercel Cost Protection
interface SecurityMetrics {
  totalRequests: number;
  dailyRequests: number;
  suspiciousRequests: number;
  blockedRequests: number;
  lastReset: number;
  dailyResetTime: number;
}

interface IPTracker {
  count: number;
  hourlyCount: number;
  dailyCount: number;
  firstRequest: number;
  lastRequest: number;
  resetTime: number;
  hourlyResetTime: number;
  dailyResetTime: number;
  riskScore: number;
  consecutiveBlocks: number;
  isBlacklisted: boolean;
  suspiciousPatterns: string[];
}

interface CostLimits {
  maxDailyRequests: number;
  maxHourlyRequestsPerIP: number;
  maxDailyRequestsPerIP: number;
  emergencyStopThreshold: number;
  highRiskThreshold: number;
}

// Global security metrics
const securityMetrics: SecurityMetrics = {
  totalRequests: 0,
  dailyRequests: 0,
  suspiciousRequests: 0,
  blockedRequests: 0,
  lastReset: Date.now(),
  dailyResetTime: Date.now() + 24 * 60 * 60 * 1000
};

// IP tracking store
const ipTracker = new Map<string, IPTracker>();

// Blacklisted IPs (persistent across requests)
const blacklistedIPs = new Set<string>();

// Cost limits configuration
const COST_LIMITS: CostLimits = {
  maxDailyRequests: 500, // 1日最大500リクエスト
  maxHourlyRequestsPerIP: 2, // IP毎1時間最大2リクエスト（さらに厳しく）
  maxDailyRequestsPerIP: 5, // IP毎1日最大5リクエスト
  emergencyStopThreshold: 1000, // 緊急停止閾値
  highRiskThreshold: 80 // 高リスク閾値
};

// Known malicious patterns
const MALICIOUS_PATTERNS = {
  userAgents: [
    'curl', 'wget', 'python', 'java', 'go-http', 'node', 'axios', 'postman',
    'insomnia', 'httpie', 'scrapy', 'requests', 'urllib', 'okhttp'
  ],
  suspiciousKeywords: [
    'test', 'example', 'lorem', 'ipsum', 'admin', 'root', 'api', 'bot',
    'script', 'hack', 'exploit', 'payload', 'injection', 'xss', 'sql'
  ],
  tempEmailDomains: [
    'tempmail.com', '10minutemail.com', 'guerrillamail.com', 'mailinator.com',
    'throwaway.email', 'maildrop.cc', 'temp-mail.org', 'getairmail.com',
    'yopmail.com', 'mohmal.com', 'mailnesia.com', 'trashmail.com'
  ]
};

export interface AdvancedSecurityResult {
  allowed: boolean;
  reason?: string;
  riskScore: number;
  remainingRequests: number;
  retryAfter?: number;
  emergencyStop: boolean;
  costAlert: boolean;
  metrics: SecurityMetrics;
}

// Cleanup expired entries
function cleanupExpiredEntries() {
  const now = Date.now();
  
  // Cleanup IP tracker
  for (const [ip, tracker] of ipTracker.entries()) {
    // Remove entries older than 7 days
    if (now - tracker.firstRequest > 7 * 24 * 60 * 60 * 1000) {
      ipTracker.delete(ip);
    }
  }
  
  // Reset daily metrics if needed
  if (now > securityMetrics.dailyResetTime) {
    securityMetrics.dailyRequests = 0;
    securityMetrics.dailyResetTime = now + 24 * 60 * 60 * 1000;
    
    // Reset daily counts for all IPs
    for (const tracker of ipTracker.values()) {
      tracker.dailyCount = 0;
      tracker.dailyResetTime = now + 24 * 60 * 60 * 1000;
    }
  }
}

// Enhanced bot detection
function detectAdvancedBot(request: Request, formData?: Record<string, unknown>): number {
  let botScore = 0;
  
  const userAgent = request.headers.get('user-agent') || '';
  const accept = request.headers.get('accept') || '';
  const acceptLanguage = request.headers.get('accept-language') || '';
  const acceptEncoding = request.headers.get('accept-encoding') || '';
  
  // User-Agent analysis
  const lowerUA = userAgent.toLowerCase();
  for (const pattern of MALICIOUS_PATTERNS.userAgents) {
    if (lowerUA.includes(pattern)) {
      botScore += 40;
      break;
    }
  }
  
  // Missing browser headers
  if (!accept || !acceptLanguage || !acceptEncoding) {
    botScore += 30;
  }
  
  // Suspicious header combinations
  if (accept === '*/*' && !acceptLanguage) {
    botScore += 25;
  }
  
  // Check for headless browser signatures
  const headlessSignatures = ['headless', 'phantom', 'selenium', 'webdriver'];
  if (headlessSignatures.some(sig => lowerUA.includes(sig))) {
    botScore += 50;
  }
  
  // Form data analysis
  if (formData) {
    const textContent = Object.values(formData)
      .filter(v => typeof v === 'string')
      .join(' ')
      .toLowerCase();
    
    for (const keyword of MALICIOUS_PATTERNS.suspiciousKeywords) {
      if (textContent.includes(keyword)) {
        botScore += 15;
      }
    }
    
    // Check for automated patterns
    if (typeof formData.name === 'string' && typeof formData.company === 'string') {
      const name = formData.name.toLowerCase();
      const company = formData.company.toLowerCase();
      
      // Identical or very similar fields
      if (name === company) {
        botScore += 20;
      }
      
      // Common test values
      if (name.includes('test') || company.includes('test') || 
          name.includes('example') || company.includes('example')) {
        botScore += 30;
      }
    }
  }
  
  return Math.min(botScore, 100);
}

// Geographic restrictions (basic implementation)
function checkGeographicRestrictions(request: Request): number {
  let geoScore = 0;
  
  // Check for Cloudflare country header
  const cfCountry = request.headers.get('cf-ipcountry');
  
  // High-risk countries (adjust as needed)
  const highRiskCountries = ['CN', 'RU', 'KP', 'IR'];
  const mediumRiskCountries = ['BR', 'IN', 'PK', 'BD'];
  
  if (cfCountry) {
    if (highRiskCountries.includes(cfCountry)) {
      geoScore += 30;
    } else if (mediumRiskCountries.includes(cfCountry)) {
      geoScore += 15;
    }
  }
  
  return geoScore;
}

// Email validation enhancement
function validateEmail(email: string): number {
  let emailScore = 0;
  
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return 50;
  
  // Check against temporary email domains
  if (MALICIOUS_PATTERNS.tempEmailDomains.includes(domain)) {
    emailScore += 40;
  }
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /^[a-z]+\d+@/,  // Simple pattern like user123@
    /^\d+@/,        // Only numbers before @
    /^[a-z]{1,3}@/, // Very short username
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(email.toLowerCase())) {
      emailScore += 20;
      break;
    }
  }
  
  return emailScore;
}

// Main security check function
export function performAdvancedSecurityCheck(
  request: Request, 
  formData?: Record<string, unknown>
): AdvancedSecurityResult {
  cleanupExpiredEntries();
  
  const now = Date.now();
  const clientIP = getClientIP(request);
  
  // Check for emergency stop
  if (securityMetrics.totalRequests > COST_LIMITS.emergencyStopThreshold) {
    console.error(`🚨 EMERGENCY STOP: Total requests exceeded ${COST_LIMITS.emergencyStopThreshold}`);
    return {
      allowed: false,
      reason: 'Service temporarily unavailable due to high load',
      riskScore: 100,
      remainingRequests: 0,
      emergencyStop: true,
      costAlert: true,
      metrics: securityMetrics
    };
  }
  
  // Check daily limit
  if (securityMetrics.dailyRequests >= COST_LIMITS.maxDailyRequests) {
    console.warn(`📊 Daily limit reached: ${securityMetrics.dailyRequests}/${COST_LIMITS.maxDailyRequests}`);
    return {
      allowed: false,
      reason: 'Daily request limit reached. Please try again tomorrow.',
      riskScore: 0,
      remainingRequests: 0,
      emergencyStop: false,
      costAlert: true,
      retryAfter: Math.ceil((securityMetrics.dailyResetTime - now) / 1000),
      metrics: securityMetrics
    };
  }
  
  // Check if IP is blacklisted
  if (blacklistedIPs.has(clientIP)) {
    console.warn(`🚫 Blacklisted IP blocked: ${clientIP}`);
    securityMetrics.blockedRequests++;
    return {
      allowed: false,
      reason: 'Access denied',
      riskScore: 100,
      remainingRequests: 0,
      emergencyStop: false,
      costAlert: false,
      metrics: securityMetrics
    };
  }
  
  // Get or create IP tracker
  let tracker = ipTracker.get(clientIP);
  if (!tracker) {
    tracker = {
      count: 0,
      hourlyCount: 0,
      dailyCount: 0,
      firstRequest: now,
      lastRequest: now,
      resetTime: now + 60 * 60 * 1000, // 1 hour
      hourlyResetTime: now + 60 * 60 * 1000,
      dailyResetTime: now + 24 * 60 * 60 * 1000,
      riskScore: 0,
      consecutiveBlocks: 0,
      isBlacklisted: false,
      suspiciousPatterns: []
    };
    ipTracker.set(clientIP, tracker);
  }
  
  // Reset hourly count if needed
  if (now > tracker.hourlyResetTime) {
    tracker.hourlyCount = 0;
    tracker.hourlyResetTime = now + 60 * 60 * 1000;
  }
  
  // Reset daily count if needed
  if (now > tracker.dailyResetTime) {
    tracker.dailyCount = 0;
    tracker.dailyResetTime = now + 24 * 60 * 60 * 1000;
    tracker.consecutiveBlocks = Math.max(0, tracker.consecutiveBlocks - 1); // Reduce penalty over time
  }
  
  // Check IP-specific limits
  if (tracker.hourlyCount >= COST_LIMITS.maxHourlyRequestsPerIP) {
    tracker.consecutiveBlocks++;
    securityMetrics.blockedRequests++;
    
    // Auto-blacklist after repeated violations
    if (tracker.consecutiveBlocks >= 3) {
      blacklistedIPs.add(clientIP);
      tracker.isBlacklisted = true;
      console.error(`🚨 IP auto-blacklisted for repeated violations: ${clientIP}`);
      
      // Send alert email
      sendSecurityAlert(`IP ${clientIP} has been auto-blacklisted for repeated rate limit violations`);
    }
    
    return {
      allowed: false,
      reason: 'Hourly rate limit exceeded',
      riskScore: 0,
      remainingRequests: 0,
      retryAfter: Math.ceil((tracker.hourlyResetTime - now) / 1000),
      emergencyStop: false,
      costAlert: false,
      metrics: securityMetrics
    };
  }
  
  if (tracker.dailyCount >= COST_LIMITS.maxDailyRequestsPerIP) {
    tracker.consecutiveBlocks++;
    securityMetrics.blockedRequests++;
    return {
      allowed: false,
      reason: 'Daily rate limit exceeded for this IP',
      riskScore: 0,
      remainingRequests: 0,
      retryAfter: Math.ceil((tracker.dailyResetTime - now) / 1000),
      emergencyStop: false,
      costAlert: false,
      metrics: securityMetrics
    };
  }
  
  // Calculate risk score
  let riskScore = 0;
  
  // Bot detection
  riskScore += detectAdvancedBot(request, formData);
  
  // Geographic restrictions
  riskScore += checkGeographicRestrictions(request);
  
  // Request frequency analysis
  if (tracker.hourlyCount >= 2) {
    riskScore += 20;
  }
  
  // Time-based analysis
  const timeSinceLastRequest = now - tracker.lastRequest;
  if (timeSinceLastRequest < 30000) { // Less than 30 seconds
    riskScore += 25;
    tracker.suspiciousPatterns.push('rapid_requests');
  }
  
  // Form validation
  if (formData) {
    // Email validation
    if (typeof formData.email === 'string') {
      riskScore += validateEmail(formData.email);
    }
    
    // Website URL validation
    if (typeof formData.website === 'string') {
      try {
        const websiteUrl = new URL(formData.website);
        const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf'];
        if (suspiciousTLDs.some(tld => websiteUrl.hostname.endsWith(tld))) {
          riskScore += 30;
        }
      } catch {
        riskScore += 20;
      }
    }
  }
  
  // Check if risk score exceeds threshold
  if (riskScore >= COST_LIMITS.highRiskThreshold) {
    tracker.consecutiveBlocks++;
    securityMetrics.suspiciousRequests++;
    securityMetrics.blockedRequests++;
    
    console.warn(`⚠️ High-risk request blocked: IP=${clientIP}, Score=${riskScore}`);
    
    return {
      allowed: false,
      reason: 'Request flagged as high risk',
      riskScore,
      remainingRequests: 0,
      emergencyStop: false,
      costAlert: riskScore >= 90,
      metrics: securityMetrics
    };
  }
  
  // Update counters
  tracker.count++;
  tracker.hourlyCount++;
  tracker.dailyCount++;
  tracker.lastRequest = now;
  tracker.riskScore = riskScore;
  
  securityMetrics.totalRequests++;
  securityMetrics.dailyRequests++;
  
  if (riskScore > 40) {
    securityMetrics.suspiciousRequests++;
  }
  
  // Cost alert if approaching limits
  const costAlert = (
    securityMetrics.dailyRequests > COST_LIMITS.maxDailyRequests * 0.8 ||
    securityMetrics.totalRequests > COST_LIMITS.emergencyStopThreshold * 0.8
  );
  
  return {
    allowed: true,
    riskScore,
    remainingRequests: Math.max(0, COST_LIMITS.maxDailyRequests - securityMetrics.dailyRequests),
    emergencyStop: false,
    costAlert,
    metrics: securityMetrics
  };
}

// Get client IP (reused from existing code)
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfIp = request.headers.get('cf-connecting-ip');
  const xClientIp = request.headers.get('x-client-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  return realIp || cfIp || xClientIp || 'unknown';
}

// Security alert function
async function sendSecurityAlert(message: string) {
  try {
    console.error(`🚨 SECURITY ALERT: ${message}`);
    
    // Optional: Send email alert to admin
    if (process.env.ADMIN_EMAIL && process.env.SMTP_HOST) {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.default.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      
      await transporter.sendMail({
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: process.env.ADMIN_EMAIL,
        subject: '🚨【GYAKUTEN】セキュリティアラート',
        html: `
          <h2>セキュリティアラート</h2>
          <p><strong>時刻:</strong> ${new Date().toLocaleString('ja-JP')}</p>
          <p><strong>内容:</strong> ${message}</p>
          <hr>
          <h3>現在の統計</h3>
          <ul>
            <li>総リクエスト数: ${securityMetrics.totalRequests}</li>
            <li>日次リクエスト数: ${securityMetrics.dailyRequests}</li>
            <li>疑わしいリクエスト数: ${securityMetrics.suspiciousRequests}</li>
            <li>ブロックされたリクエスト数: ${securityMetrics.blockedRequests}</li>
          </ul>
        `
      });
    }
  } catch (error) {
    console.error('Failed to send security alert:', error);
  }
}

// Get current security metrics (for monitoring)
export function getSecurityMetrics(): SecurityMetrics & { blacklistedIPCount: number; trackedIPCount: number } {
  cleanupExpiredEntries();
  return {
    ...securityMetrics,
    blacklistedIPCount: blacklistedIPs.size,
    trackedIPCount: ipTracker.size
  };
}

// Manual IP management functions
export function blacklistIP(ip: string, reason?: string) {
  blacklistedIPs.add(ip);
  console.log(`🚫 Manually blacklisted IP: ${ip} (${reason || 'No reason provided'})`);
  sendSecurityAlert(`IP ${ip} manually blacklisted: ${reason || 'No reason provided'}`);
}

export function removeFromBlacklist(ip: string) {
  blacklistedIPs.delete(ip);
  console.log(`✅ Removed IP from blacklist: ${ip}`);
}

export function isIPBlacklisted(ip: string): boolean {
  return blacklistedIPs.has(ip);
}