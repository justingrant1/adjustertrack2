"use client"

import { Button } from "@/components/ui/button"
import { Award, BookOpen, Calendar, FileText, Home, LogOut, Settings, Shield, User } from "lucide-react"
import Link from "next/link"

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-64 border-r bg-muted/40 md:min-h-screen">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/demo" className="flex items-center gap-2 font-semibold">
              <Shield className="h-5 w-5 text-primary" />
              <span>AdjusterTrack</span>
            </Link>
          </div>
          <nav className="grid gap-1 p-2">
            <Link href="/demo">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Home className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/demo/licenses">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Award className="h-4 w-4" />
                Licenses
              </Button>
            </Link>
            <Link href="/demo/education">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <BookOpen className="h-4 w-4" />
                Education
              </Button>
            </Link>
            <Link href="/demo/calendar">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Calendar className="h-4 w-4" />
                Calendar
              </Button>
            </Link>
            <Link href="/demo/documents">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                Documents
              </Button>
            </Link>
            <Link href="/demo/profile">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <User className="h-4 w-4" />
                Profile
              </Button>
            </Link>
            <Link href="/demo/settings">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <LogOut className="h-4 w-4" />
                Exit Demo
              </Button>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 overflow-auto">
          <div className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px]">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
