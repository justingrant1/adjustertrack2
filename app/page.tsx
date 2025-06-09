import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Metadata } from 'next'
import {
  ArrowRight,
  Award,
  Bell,
  BookOpen,
  Calendar,
  Clock,
  Shield,
  CheckCircle,
  Star,
  Quote,
  AlertTriangle,
  DollarSign,
  FileText,
  Zap,
} from "lucide-react"

export const metadata: Metadata = {
  title: 'AdjusterTrack - #1 Insurance Adjuster License Management Software | Track CE Credits & Renewals',
  description: 'Professional license management software for insurance adjusters. Track licenses across all 50 states, manage CE credits, get automated renewal reminders. 30-day free trial. Join 10,000+ professionals.',
  keywords: 'insurance adjuster license tracking, adjuster license management software, CE credit tracking, license renewal reminders, continuing education management, multi-state license tracking, adjuster compliance software, insurance license renewal system',
  openGraph: {
    title: 'AdjusterTrack - Never Miss a License Renewal Again',
    description: 'Join 10,000+ insurance professionals using AdjusterTrack to manage licenses, track CE credits, and stay compliant across all states.',
    url: 'https://adjustertrack.com',
    type: 'website',
    images: [
      {
        url: 'https://adjustertrack.com/og-homepage.jpg',
        width: 1200,
        height: 630,
        alt: 'AdjusterTrack Homepage - Insurance Adjuster License Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AdjusterTrack - Never Miss a License Renewal Again',
    description: 'Professional license management for insurance adjusters. Track licenses, manage CE credits, get reminders.',
    images: ['https://adjustertrack.com/twitter-homepage.jpg'],
  },
  alternates: {
    canonical: 'https://adjustertrack.com',
  },
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6 text-primary" />
            <span>AdjusterTrack</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#why-choose-us" className="text-muted-foreground hover:text-foreground transition-colors">
              Why Choose Us
            </Link>
            <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline" className="w-fit">
                    Trusted by 10,000+ Insurance Professionals
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Never Miss a License Renewal Again
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    The complete solution for insurance adjusters to track licenses, manage continuing education, and
                    stay compliant across all states. Save time, avoid penalties, and focus on what matters most.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="w-full">
                      Start Free 30-Day Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button size="lg" variant="outline" className="w-full">
                      Watch Demo
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/placeholder.svg?height=550&width=550&text=Dashboard+Preview"
                  width={550}
                  height={550}
                  alt="AdjusterTrack Dashboard Preview"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last shadow-2xl"
                />
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="font-medium text-sm">License Expiring Soon</p>
                      <p className="text-xs text-muted-foreground">Texas - 30 days left</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement Section */}
        <section className="w-full py-16 md:py-20 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  The Hidden Costs of License Management
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Insurance adjusters face serious challenges that can impact their careers and income
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
              <Card className="border-destructive/20 bg-destructive/5 hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4 pb-3">
                  <div className="rounded-full bg-destructive/10 p-2">
                    <DollarSign className="h-6 w-6 text-destructive" />
                  </div>
                  <CardTitle className="text-lg text-destructive">Expensive Penalties</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">
                    Late renewal fees can cost $200-$500 per license. Expired licenses mean lost income and potential
                    legal issues.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20 bg-orange-50/50 hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4 pb-3">
                  <div className="rounded-full bg-orange-100 p-2">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg text-orange-800">Time Wasted</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">
                    Manually tracking multiple licenses across states takes hours each month. Time better spent on
                    claims.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-primary/5 hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4 pb-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-primary">Career Risk</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">
                    Working with an expired license can result in fines, suspension, or even termination from your
                    position.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-8">
              <p className="text-lg font-medium text-muted-foreground">
                Don't let administrative tasks derail your career. There's a better way.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline">Features</Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything You Need to Stay Compliant
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our comprehensive platform automates license management so you can focus on what you do best
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Award className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Smart License Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Automatically track all your licenses across multiple states with renewal dates, requirements, and
                    status updates.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Bell className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Intelligent Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get personalized reminders via email and SMS. Never miss a deadline with customizable advance
                    notifications.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">CE Credit Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Track continuing education credits, course completions, and requirements for each license
                    automatically.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Calendar className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Visual Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    See all your important dates at a glance with our intuitive calendar view and deadline tracking.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <FileText className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Secure Document Storage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Store licenses, certificates, and course records securely in the cloud with easy access anywhere.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Zap className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">One-Click Renewals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Streamline the renewal process with direct links to state websites and pre-filled forms when
                    possible.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-choose-us" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <Badge variant="outline">Why AdjusterTrack</Badge>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Built by Adjusters, for Adjusters
                  </h2>
                  <p className="text-muted-foreground md:text-xl">
                    We understand the unique challenges of the insurance industry because we've been there.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Industry Expertise</h3>
                      <p className="text-muted-foreground">
                        Created by licensed adjusters who understand state requirements and industry nuances.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Always Up-to-Date</h3>
                      <p className="text-muted-foreground">
                        We monitor state regulation changes and update requirements automatically.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Proven ROI</h3>
                      <p className="text-muted-foreground">
                        Save 10+ hours monthly and avoid costly penalties. Pays for itself with just one prevented late
                        fee.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Enterprise Security</h3>
                      <p className="text-muted-foreground">
                        Bank-level encryption and SOC 2 compliance to protect your sensitive information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary">10,000+</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </Card>
                  <Card className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary">50+</div>
                    <div className="text-sm text-muted-foreground">States Supported</div>
                  </Card>
                  <Card className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary">99.9%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </Card>
                  <Card className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline">Testimonials</Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Trusted by Industry Professionals
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what adjusters are saying about AdjusterTrack
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <Card className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    "AdjusterTrack saved me from a $500 late renewal fee. The alerts are perfect and I never worry about
                    deadlines anymore."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium">SM</span>
                    </div>
                    <div>
                      <p className="font-medium">Sarah Martinez</p>
                      <p className="text-sm text-muted-foreground">Independent Adjuster, FL</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    "Managing licenses across 5 states was a nightmare. Now it's completely automated. Best investment
                    I've made for my business."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium">MJ</span>
                    </div>
                    <div>
                      <p className="font-medium">Mike Johnson</p>
                      <p className="text-sm text-muted-foreground">Public Adjuster, TX</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    "The CE tracking feature is incredible. I can see exactly what I need for each state and when. No
                    more spreadsheets!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium">LC</span>
                    </div>
                    <div>
                      <p className="font-medium">Lisa Chen</p>
                      <p className="text-sm text-muted-foreground">Staff Adjuster, CA</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline">Pricing</Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that fits your needs. All plans include a 30-day free trial.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-xl">Starter</CardTitle>
                  <div className="text-3xl font-bold">
                    $19<span className="text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                  <p className="text-muted-foreground">Perfect for new adjusters</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Up to 3 licenses</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Email notifications</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">CE tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Document storage (1GB)</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
              <Card className="p-6 border-primary relative">
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
                <CardHeader>
                  <CardTitle className="text-xl">Professional</CardTitle>
                  <div className="text-3xl font-bold">
                    $39<span className="text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                  <p className="text-muted-foreground">For working adjusters</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Unlimited licenses</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Email & SMS notifications</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Advanced CE management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Document storage (10GB)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Priority support</span>
                    </li>
                  </ul>
                  <Button className="w-full">Start Free Trial</Button>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-xl">Enterprise</CardTitle>
                  <div className="text-3xl font-bold">
                    $99<span className="text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                  <p className="text-muted-foreground">For teams and firms</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Everything in Professional</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Team management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Custom integrations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Unlimited storage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Dedicated support</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Take Control of Your Licenses?
                </h2>
                <p className="max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of adjusters who never worry about license renewals again. Start your free trial today.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="w-full">
                    Start Free 30-Day Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full bg-white/10 border-white text-white hover:bg-white hover:text-primary"
                  >
                    Schedule Demo
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-primary-foreground/60">
                No credit card required • Cancel anytime • 24/7 support
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0 bg-muted/40">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2 font-bold">
            <Shield className="h-5 w-5 text-primary" />
            <span>AdjusterTrack</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 AdjusterTrack. All rights reserved. Built for insurance professionals.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}