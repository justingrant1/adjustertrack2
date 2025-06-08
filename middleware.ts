import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    // Verify environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase environment variables')
      return NextResponse.next()
    }

    // Create a response object that we can modify
    const response = NextResponse.next()

    // Create the Supabase client
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            // Set the cookie in the response
            response.cookies.set({
              name,
              value,
              ...options,
              // Ensure the cookie is accessible in the browser
              httpOnly: false,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/'
            })
          },
          remove(name: string, options: CookieOptions) {
            // Remove the cookie from the response
            response.cookies.set({
              name,
              value: '',
              ...options,
              maxAge: 0,
              path: '/'
            })
          },
        },
      }
    )

    try {
      // Get the user's session
      const { data: { session } } = await supabase.auth.getSession()
      
      // Public routes that don't require authentication
      const publicRoutes = ['/login', '/signup', '/']
      const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname)
      
      // If there's no session and the route requires auth, redirect to login
      if (!session && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', request.url))
      }

      // If there's a session and we're on a public route (except /), redirect to dashboard
      if (session && isPublicRoute && request.nextUrl.pathname !== '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }

      // For all other cases, proceed with the request
      return response
    } catch (error) {
      console.error('Auth error:', error)
      // On auth error, allow access to public routes, redirect others to login
      if (!['/login', '/signup', '/'].includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
      return response
    }
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}