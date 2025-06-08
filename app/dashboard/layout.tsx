"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Award, Bell, BookOpen, Calendar, FileText, Home, LogOut, Settings, Shield, User } from "lucide-react"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  // Function to validate session
  const isValidSession = (session: any) => {
    if (!session || !session.expires_at) return false
    
    const now = Date.now()
    const expiresAt = new Date(session.expires_at * 1000).getTime()
    
    console.log("Dashboard session validation:", {
      now: new Date(now).toLocaleString(),
      expires_at: new Date(expiresAt).toLocaleString(),
      isValid: expiresAt > now
    })
    
    return expiresAt > now
  }

  useEffect(() => {
    console.log("Dashboard layout mounted")
    
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error("Dashboard session error:", error)
          window.location.href = "/login"
          return
        }

        if (!session) {
          console.log("No session in dashboard, redirecting to login")
          window.location.href = "/login"
          return
        }

        if (!isValidSession(session)) {
          console.log("Expired session in dashboard, signing out and redirecting")
          await supabase.auth.signOut()
          window.location.href = "/login"
          return
        }

        console.log("Valid session in dashboard:", {
          user: session.user.email,
          expires_at: session.expires_at ? new Date(session.expires_at * 1000).toLocaleString() : 'unknown'
        })

        // Set up auth state change listener
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
          console.log("Auth state changed in dashboard:", event, session?.user?.email)
          if (event === 'SIGNED_OUT' || !session || !isValidSession(session)) {
            window.location.href = "/login"
          }
        })

        setIsLoading(false)

        // Cleanup subscription
        return () => {
          subscription.unsubscribe()
        }
      } catch (error) {
        console.error("Dashboard auth error:", error)
        window.location.href = "/login"
      }
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar - now in the layout so it persists across all dashboard pages */}
        <aside className="w-full md:w-64 border-r bg-muted/40 md:min-h-screen">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Shield className="h-5 w-5 text-primary" />
              <span>AdjusterTrack</span>
            </Link>
          </div>
          <nav className="grid gap-1 p-2">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Home className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/licenses">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Award className="h-4 w-4" />
                Licenses
              </Button>
            </Link>
            <Link href="/dashboard/education">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <BookOpen className="h-4 w-4" />
                Education
              </Button>
            </Link>
            <Link href="/dashboard/calendar">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Calendar className="h-4 w-4" />
                Calendar
              </Button>
            </Link>
            <Link href="/dashboard/documents">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                Documents
              </Button>
            </Link>
            <Link href="/dashboard/profile">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <User className="h-4 w-4" />
                Profile
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px]">
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <Button size="sm" variant="outline" className="ml-auto gap-1">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}