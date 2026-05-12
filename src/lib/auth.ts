import { NextRequest, NextResponse } from "next/server";

/**
 * Basic authentication check for admin routes.
 * In a real-world scenario, you would integrate NextAuth or verify JWT tokens here.
 * For this implementation, we use a shared secret ADMIN_TOKEN.
 */
export function checkAdminAuth(req: NextRequest): boolean {
  const adminToken = process.env.ADMIN_TOKEN;

  // If no token is configured, deny access by default for security
  if (!adminToken) {
    return false;
  }

  // 1. Check Authorization header
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    if (token === adminToken) {
      return true;
    }
  }

  // 2. Check cookie (useful for page navigations)
  const cookieToken = req.cookies.get("admin_token")?.value;
  if (cookieToken === adminToken) {
    return true;
  }

  return false;
}

/**
 * Higher-order function to wrap API route handlers with authentication check.
 */
export function withAuth(handler: (req: NextRequest, ...args: unknown[]) => Promise<NextResponse> | NextResponse) {
  return async (req: NextRequest, ...args: unknown[]) => {
    if (!checkAdminAuth(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return handler(req, ...args);
  };
}
