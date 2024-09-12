import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Function to check if token is expired
function isTokenExpired(token: string): boolean {
  // Here, you can implement the logic to check if the token has expired.
  // For example, if you're using JWT, you can decode the token and check the expiration.
  const payload = JSON.parse(atob(token.split('.')[1]));
  return Date.now() >= payload.exp * 1000; // Checking if current time is past the expiration time
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token'); // Assuming the token is stored in cookies

  // Redirect to sign-up if accessing /portfolio or if the token is expired
  if (pathname === '/portfolio' || (token && isTokenExpired(token.value))) {
    const url = req.nextUrl.clone();
    url.pathname = '/sign-up'; // Redirect to sign-up page
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed if token is valid or not accessing restricted page
  return NextResponse.next();
}

// Define the paths that should trigger the middleware
export const config = {
  matcher: ['/portfolio'], // You can add other routes here
};
