import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    // Create a response object that we can modify
    const response = NextResponse.next()

    // Create the Supabase client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
              // Ensure the cookie is accessible
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/'
            })
          },
          remove(name: string, options: CookieOptions) {
            // Remove the cookie
            response.cookies.delete({
              name,
              ...options,
              path: '/'
            })
          },
        },
      }
    )

    // Get the session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    // Log the session state for debugging
    console.log('Middleware session check:', {
      path: request.nextUrl.pathname,
      hasSession: !!session,
      error: sessionError?.message
    })

    // Public routes that don't require authentication
    const publicRoutes = ['/login', '/signup', '/']
    const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname)

    if (sessionError) {
      console.error('Middleware session error:', sessionError)
      // On session error, allow access to public routes, redirect others to login
      if (!isPublicRoute) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
      return response
    }

    // If there's no session and the route requires auth, redirect to login
    if (!session && !isPublicRoute) {
      console.log('No session, redirecting to login')
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // If there's a session and we're on a public route (except /), redirect to dashboard
    if (session && isPublicRoute && request.nextUrl.pathname !== '/') {
      console.log('Has session on public route, redirecting to dashboard')
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // For all other cases, proceed with the request
    return response
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