import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth } from './lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    if (!checkAdminAuth(request)) {
      // Redirect to home if not authorized
      // In a real app, you might redirect to a login page
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // /api/admin routes are already protected by withAuth higher-order function,
  // but adding it here as a second layer of defense is good practice.
  if (pathname.startsWith('/api/admin')) {
    if (!checkAdminAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
