"use client"

import { useState } from "react"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Award, BookOpen } from "lucide-react"

const mockEvents = [
    {
      id: 1,
      title: "Texas License Renewal",
      date: new Date(2025, 4, 22), // May 22, 2025
      type: "renewal",
      description: "Texas Independent Adjuster License renewal due",
    },
    {
      id: 2,
      title: "Florida CE Deadline",
      date: new Date(2025, 1, 15), // Feb 15, 2025
      type: "ce",
      description: "Complete remaining 12 CE credits for Florida license",
    },
    {
      id: 3,
      title: "Ethics Course",
      date: new Date(2024, 3, 10), // April 10, 2024
      type: "course",
      description: "Registered for Ethics for Insurance Professionals course",
    },
]

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState("month")

  // Function to highlight dates with events
  const isDayWithEvent = (day: Date) => {
    return mockEvents.some(
      (event) =>
        day.getDate() === event.date.getDate() &&
        day.getMonth() === event.date.getMonth() &&
        day.getFullYear() === event.date.getFullYear(),
    )
  }

  // Get events for the selected date
  const selectedDateEvents = date
    ? mockEvents.filter(
        (event) =>
          date.getDate() === event.date.getDate() &&
          date.getMonth() === event.date.getMonth() &&
          date.getFullYear() === event.date.getFullYear(),
      )
    : []

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <div className="flex items-center gap-2">
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
          <Button>Today</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card>
          <CardHeader>
            <CardTitle>License and CE Calendar</CardTitle>
            <CardDescription>View your upcoming license renewals and CE deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                event: (day) => isDayWithEvent(day),
              }}
              modifiersStyles={{
                event: {
                  fontWeight: "bold",
                  backgroundColor: "var(--primary-50)",
                  borderBottom: "2px solid var(--primary)",
                },
              }}
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Selected Date</CardTitle>
              <CardDescription>
                {date
                  ? date.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "No date selected"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                      <div className="rounded-full bg-primary/10 p-2">
                        {event.type === "renewal" ? (
                          <Award className="h-4 w-4 text-primary" />
                        ) : (
                          <BookOpen className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">No events for this date</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your next deadlines and important dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEvents
                  .filter((event) => event.date >= new Date())
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .slice(0, 3)
                  .map((event) => (
                    <div key={event.id} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                      <div className="rounded-full bg-primary/10 p-2">
                        {event.type === "renewal" ? (
                          <Award className="h-4 w-4 text-primary" />
                        ) : (
                          <BookOpen className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.date.toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
