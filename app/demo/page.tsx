"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Award, BookOpen, Clock, FileText, AlertTriangle } from "lucide-react"

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data - in a real app this would come from your database
  const licenses = [
    {
      id: 1,
      state: "Florida",
      licenseNumber: "P012345",
      type: "Public Adjuster",
      expirationDate: "2025-08-15",
      status: "Active",
      ceRequired: 24,
      ceCompleted: 12,
    },
    {
      id: 2,
      state: "Texas",
      licenseNumber: "TX98765",
      type: "Independent Adjuster",
      expirationDate: "2025-05-22",
      status: "Active",
      ceRequired: 30,
      ceCompleted: 5,
    },
    {
      id: 3,
      state: "California",
      licenseNumber: "CA54321",
      type: "Public Adjuster",
      expirationDate: "2024-12-01",
      status: "Active",
      ceRequired: 24,
      ceCompleted: 24,
    },
  ]

  const upcomingDeadlines = [
    {
      id: 1,
      title: "Texas License Renewal",
      date: "2025-05-22",
      daysLeft: 90,
      type: "renewal",
    },
    {
      id: 2,
      title: "Florida CE Requirement",
      date: "2025-02-15",
      daysLeft: 30,
      type: "ce",
    },
  ]

  const ceHistory = [
    {
      id: 1,
      course: "Ethics for Insurance Professionals",
      provider: "Insurance Educators Inc.",
      date: "2024-01-15",
      credits: 4,
      states: ["FL", "TX", "CA"],
    },
    {
      id: 2,
      course: "Flood Insurance Claims Handling",
      provider: "Adjuster Training Academy",
      date: "2024-02-22",
      credits: 8,
      states: ["FL", "TX"],
    },
    {
      id: 3,
      course: "California Insurance Law Updates",
      provider: "West Coast Insurance Education",
      date: "2023-11-10",
      credits: 12,
      states: ["CA"],
    },
  ]

  return (
    <div className="container py-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="licenses">Licenses</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Licenses</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{licenses.length}</div>
                <p className="text-xs text-muted-foreground">
                  Across {new Set(licenses.map((l) => l.state)).size} states
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CE Credits Completed</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {licenses.reduce((sum, license) => sum + license.ceCompleted, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Out of {licenses.reduce((sum, license) => sum + license.ceRequired, 0)} required
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingDeadlines.length}</div>
                <p className="text-xs text-muted-foreground">Within the next 90 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documents Stored</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Licenses, certificates, and more</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>License Status</CardTitle>
                <CardDescription>Overview of your current licenses and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {licenses.map((license) => (
                    <div key={license.id} className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {license.state} - {license.type}
                          </p>
                          <p className="text-sm text-muted-foreground">License #: {license.licenseNumber}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">Expires: {new Date(license.expirationDate).toLocaleDateString()}</p>
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                            {license.status}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <p>CE Progress</p>
                          <p>
                            {license.ceCompleted}/{license.ceRequired} credits
                          </p>
                        </div>
                        <Progress value={(license.ceCompleted / license.ceRequired) * 100} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Important dates to keep in mind</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline) => (
                    <Alert key={deadline.id} variant={deadline.daysLeft < 45 ? "destructive" : "default"}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle className="flex items-center gap-2">
                        {deadline.title}
                        <span className="text-xs font-normal">({deadline.daysLeft} days left)</span>
                      </AlertTitle>
                      <AlertDescription>Due on {new Date(deadline.date).toLocaleDateString()}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="licenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Licenses</CardTitle>
              <CardDescription>Manage all your adjuster licenses in one place</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {licenses.map((license) => (
                  <div key={license.id} className="rounded-lg border p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">
                          {license.state} - {license.type}
                        </h3>
                        <p className="text-sm text-muted-foreground">License #: {license.licenseNumber}</p>
                      </div>
                      <div className="flex flex-col md:items-end">
                        <p className="text-sm">Expires: {new Date(license.expirationDate).toLocaleDateString()}</p>
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                          {license.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <p>CE Progress</p>
                        <p>
                          {license.ceCompleted}/{license.ceRequired} credits
                        </p>
                      </div>
                      <Progress value={(license.ceCompleted / license.ceRequired) * 100} />
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Link href="/demo/licenses">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <Link href="/demo/licenses">
                        <Button variant="outline" size="sm">
                          Manage CE
                        </Button>
                      </Link>
                      <Link href="/demo/licenses">
                        <Button size="sm">Renew</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Link href="/demo/licenses">
                  <Button>View All Licenses</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Continuing Education History</CardTitle>
              <CardDescription>Track your completed courses and credits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ceHistory.map((course) => (
                  <div key={course.id} className="rounded-lg border p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{course.course}</h3>
                        <p className="text-sm text-muted-foreground">Provider: {course.provider}</p>
                      </div>
                      <div className="flex flex-col md:items-end">
                        <p className="text-sm">Completed: {new Date(course.date).toLocaleDateString()}</p>
                        <p className="text-sm font-medium">{course.credits} Credits</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">Applicable States: {course.states.join(", ")}</p>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        View Certificate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Link href="/demo/education">
                  <Button>View All Courses</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
