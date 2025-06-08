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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error("Auth error:", error)
          throw error
        }

        if (!session) {
          console.log("No session found, redirecting to login")
          router.replace("/login")
          return
        }

        console.log("Session found:", {
          user: session.user.email,
          expires_at: new Date(session.expires_at!).toLocaleString()
        })
        setIsLoading(false)
      } catch (error) {
        console.error("Dashboard auth error:", error)
        router.replace("/login")
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
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