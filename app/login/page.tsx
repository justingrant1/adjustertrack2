"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield } from "lucide-react"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  // Function to handle navigation
  const navigateToDashboard = async () => {
    try {
      setSuccessMessage("Login successful! Redirecting to dashboard...")
      
      // Force a router refresh and navigation
      router.refresh()
      router.prefetch('/dashboard')
      
      // Try both navigation methods
      setTimeout(() => {
        console.log("Attempting navigation to dashboard...")
        router.push('/dashboard')
        
        // Fallback to window.location if router doesn't work
        setTimeout(() => {
          if (window.location.pathname !== '/dashboard') {
            console.log("Fallback: using window.location for navigation")
            window.location.href = '/dashboard'
          }
        }, 500)
      }, 1000)
    } catch (error) {
      console.error("Navigation error:", error)
      // Final fallback
      window.location.href = '/dashboard'
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")
    setIsLoading(true)

    try {
      console.log("Starting login process...")

      // Attempt to sign in
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      })

      if (signInError) {
        console.error("Sign in error:", signInError)
        throw signInError
      }

      if (!data?.session) {
        console.error("No session after sign in")
        throw new Error("Failed to create session")
      }

      console.log("Sign in successful, session created:", {
        user: data.session.user.email,
        expires_at: new Date(data.session.expires_at!).toLocaleString()
      })

      // Store the session in localStorage for backup
      localStorage.setItem('supabase.auth.token', JSON.stringify(data.session))

      // Double check the session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) {
        console.error("Session verification error:", sessionError)
        throw sessionError
      }

      if (!session) {
        console.error("No session found during verification")
        throw new Error("Session not established")
      }

      console.log("Session verified successfully:", {
        user: session.user.email,
        expires_at: new Date(session.expires_at!).toLocaleString()
      })

      // Navigate to dashboard
      await navigateToDashboard()
    } catch (err: any) {
      console.error("Login process error:", err)
      setError(err.message || "Failed to sign in")
      setSuccessMessage("")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="mt-4 text-sm text-red-500">{error}</div>}
            {successMessage && <div className="mt-4 text-sm text-green-500">{successMessage}</div>}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}