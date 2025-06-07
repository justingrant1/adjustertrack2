"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Mock data - in a real app this would come from your database
  const events = [
    { date: "2025-05-22", title: "Texas License Renewal", type: "renewal" },
    { date: "2025-08-15", title: "Florida License Renewal", type: "renewal" },
    { date: "2024-12-01", title: "California License Renewal", type: "renewal" },
    { date: "2025-02-15", title: "Florida CE Deadline", type: "ce" },
  ]

  const getEventsForDate = (d: Date) => {
    const dateString = d.toISOString().split("T")[0]
    return events.filter((event) => event.date === dateString)
  }

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Calendar</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
                components={{
                  DayContent: ({ date }) => {
                    const dailyEvents = getEventsForDate(date)
                    return (
                      <div className="relative h-full w-full">
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          {date.getDate()}
                        </span>
                        {dailyEvents.length > 0 && (
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                            {dailyEvents.map((event) => (
                              <div
                                key={event.title}
                                className={`h-1.5 w-1.5 rounded-full ${event.type === "renewal" ? "bg-red-500" : "bg-blue-500"}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Events for {date ? date.toLocaleDateString() : "selected date"}</CardTitle>
            </CardHeader>
            <CardContent>
              {date && getEventsForDate(date).length > 0 ? (
                <ul className="space-y-2">
                  {getEventsForDate(date).map((event) => (
                    <li key={event.title} className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${event.type === "renewal" ? "bg-red-500" : "bg-blue-500"}`}
                      />
                      <span>{event.title}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No events for this date.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}