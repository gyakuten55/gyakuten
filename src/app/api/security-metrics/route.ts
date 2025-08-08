import { NextRequest, NextResponse } from 'next/server';
import { getSecurityMetrics, getClientIP } from '@/lib/advancedSecurityManager';

export async function GET(request: NextRequest) {
  try {
    // Simple admin authentication (you may want to implement proper auth)
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.ADMIN_API_KEY;
    
    if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const metrics = getSecurityMetrics();
    const clientIP = getClientIP(request);
    
    // Log admin access
    console.log(`[${new Date().toISOString()}] 📊 Security metrics accessed by: ${clientIP}`);
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      metrics: {
        ...metrics,
        dailyLimitUtilization: (metrics.dailyRequests / 500) * 100, // 500 is max daily requests
        emergencyThresholdUtilization: (metrics.totalRequests / 1000) * 100 // 1000 is emergency threshold
      },
      status: {
        healthy: metrics.dailyRequests < 400 && metrics.totalRequests < 800,
        warning: metrics.dailyRequests >= 400 || metrics.totalRequests >= 800,
        critical: metrics.dailyRequests >= 450 || metrics.totalRequests >= 900,
        emergency: metrics.totalRequests >= 1000
      }
    });
    
  } catch (error) {
    console.error('Security metrics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST endpoint for manual IP management
export async function POST(request: NextRequest) {
  try {
    // Admin authentication
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.ADMIN_API_KEY;
    
    if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { action, ip, reason } = await request.json();
    const clientIP = getClientIP(request);
    
    console.log(`[${new Date().toISOString()}] 🔧 Admin action by ${clientIP}: ${action} on ${ip}`);
    
    switch (action) {
      case 'blacklist':
        const { blacklistIP } = await import('@/lib/advancedSecurityManager');
        blacklistIP(ip, reason);
        break;
        
      case 'unblacklist':
        const { removeFromBlacklist } = await import('@/lib/advancedSecurityManager');
        removeFromBlacklist(ip);
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
    
    return NextResponse.json({
      success: true,
      message: `IP ${ip} ${action} successful`
    });
    
  } catch (error) {
    console.error('Security management API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}