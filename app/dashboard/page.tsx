"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Award, BookOpen, Clock, FileText, AlertTriangle } from "lucide-react"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [licenses, setLicenses] = useState<any[]>([])
  const [education, setEducation] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  useEffect(() => {
    if (user) {
      fetchLicenses()
      fetchEducation()
    }
  }, [user])

  const fetchLicenses = async () => {
    if (!user) return
    const { data, error } = await supabase
      .from('licenses')
      .select('*')
      .eq('user_id', user.id)
    if (error) {
      console.error('Error fetching licenses:', error)
    } else if (data) {
      setLicenses(data)
    }
  }

  const fetchEducation = async () => {
    if (!user) return
    const { data, error } = await supabase
      .from('education_credits')
      .select('*')
      .eq('user_id', user.id)
    if (error) {
      console.error('Error fetching education credits:', error)
    } else if (data) {
      setEducation(data)
    }
  }

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
                  {education.reduce((sum, course) => sum + course.credits, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across {education.length} courses
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{licenses.filter(l => new Date(l.expiration_date) > new Date()).length}</div>
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
                <div className="space-y-6">
                  {licenses.map((license) => {
                    // Calculate CE progress
                    // Find all education credits for this license (by state and type)
                    // This assumes you have education credits with a license_id or similar, otherwise you may need to filter by state/type
                    // For now, sum all credits for the user
                    const ceCompleted = 0; // TODO: Replace with actual calculation
                    const ceRequired = license.ce_requirement || 0;
                    return (
                      <div key={license.id} className="pb-4 border-b last:border-b-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-lg">
                              {license.state} - {license.license_type}
                            </p>
                            <p className="text-sm text-muted-foreground">License #: {license.license_number}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">Expires: {new Date(license.expiration_date).toLocaleDateString()}</p>
                            <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium">CE Progress</p>
                          <Progress value={ceCompleted} max={ceRequired} className="h-3 rounded-full bg-gray-200" />
                          <p className="text-sm mt-1">{ceCompleted}/{ceRequired} credits</p>
                        </div>
                      </div>
                    );
                  })}
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
                  {licenses.filter(l => new Date(l.expiration_date) > new Date()).map((license) => (
                    <Alert key={license.id}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle className="flex items-center gap-2">
                        {license.state} License Renewal
                      </AlertTitle>
                      <AlertDescription>Due on {new Date(license.expiration_date).toLocaleDateString()}</AlertDescription>
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
                        <p className="text-sm">Expires: {new Date(license.expiration_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Link href="/dashboard/licenses">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <Link href="/dashboard/licenses">
                        <Button variant="outline" size="sm">
                          Manage CE
                        </Button>
                      </Link>
                      <Link href="/dashboard/licenses">
                        <Button size="sm">Renew</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Link href="/dashboard/licenses">
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
                {education.map((course) => (
                  <div key={course.id} className="rounded-lg border p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{course.course_name}</h3>
                        <p className="text-sm text-muted-foreground">Provider: {course.provider}</p>
                      </div>
                      <div className="flex flex-col md:items-end">
                        <p className="text-sm">Completed: {new Date(course.date_completed).toLocaleDateString()}</p>
                        <p className="text-sm font-medium">{course.credits} Credits</p>
                      </div>
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
                <Link href="/dashboard/education">
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
