"use client"

import { useState } from "react"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { BookOpen, Download, Edit, FileText, Plus, Search, Trash } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

type Course = {
  id: number
  user_id: string
  course_name: string
  provider: string
  date_completed: string
  credits: number
  notes: string
}

const mockCourses: Course[] = [
    {
      id: 1,
      user_id: "demo-user",
      course_name: "Ethics for Insurance Professionals",
      provider: "Insurance Educators Inc.",
      date_completed: "2024-01-15",
      credits: 4,
      notes: "Completed for Florida license renewal.",
    },
    {
      id: 2,
      user_id: "demo-user",
      course_name: "Flood Insurance Claims Handling",
      provider: "Adjuster Training Academy",
      date_completed: "2024-02-22",
      credits: 8,
      notes: "Required for Texas license.",
    },
    {
      id: 3,
      user_id: "demo-user",
      course_name: "California Insurance Law Updates",
      provider: "West Coast Insurance Education",
      date_completed: "2023-11-10",
      credits: 12,
      notes: "Annual requirement for California.",
    },
]

export default function EducationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [newCourseFormData, setNewCourseFormData] = useState({
    course_name: "",
    provider: "",
    date_completed: "",
    credits: 0,
    notes: "",
  })
  const [editCourseFormData, setEditCourseFormData] = useState<Partial<Course>>({})

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    const newCourse: Course = {
        id: newId,
        user_id: "demo-user",
        ...newCourseFormData,
    };
    setCourses([...courses, newCourse]);
    setIsAddOpen(false)
    setNewCourseFormData({
        course_name: "",
        provider: "",
        date_completed: "",
        credits: 0,
        notes: "",
    })
  }

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course)
    setEditCourseFormData(course)
    setIsEditOpen(true)
  }

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCourse) return
    setCourses(courses.map(c => c.id === selectedCourse.id ? {...c, ...editCourseFormData} : c))
    setIsEditOpen(false)
  }

  const handleDeleteCourse = (course: Course) => {
    setSelectedCourse(course)
    setIsDeleteOpen(true)
  }

  const confirmDeleteCourse = async () => {
    if (!selectedCourse) return
    setCourses(courses.filter(c => c.id !== selectedCourse.id))
    setIsDeleteOpen(false)
  }

  const filteredCourses = courses.filter(
    (course) =>
      course.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.provider.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Continuing Education</h1>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleAddCourse}>
              <DialogHeader>
                <DialogTitle>Add Continuing Education</DialogTitle>
                <DialogDescription>Enter the details of your completed CE course.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course Name</Label>
                  <Input id="courseName" value={newCourseFormData.course_name} onChange={(e) => setNewCourseFormData({ ...newCourseFormData, course_name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provider">Provider</Label>
                  <Input id="provider" value={newCourseFormData.provider} onChange={(e) => setNewCourseFormData({ ...newCourseFormData, provider: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="completionDate">Completion Date</Label>
                    <Input id="completionDate" type="date" value={newCourseFormData.date_completed} onChange={(e) => setNewCourseFormData({ ...newCourseFormData, date_completed: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="credits">Credits</Label>
                    <Input id="credits" type="number" min="0" step="0.5" value={newCourseFormData.credits} onChange={(e) => setNewCourseFormData({ ...newCourseFormData, credits: Number(e.target.value) })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" value={newCourseFormData.notes} onChange={(e) => setNewCourseFormData({ ...newCourseFormData, notes: e.target.value })} />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Course</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <Card key={course.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-3">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{course.course_name}</h3>
                        <p className="text-sm text-muted-foreground">Provider: {course.provider}</p>
                        <div className="flex flex-wrap gap-4 mt-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Completion Date</p>
                            <p className="text-sm">{new Date(course.date_completed).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Credits</p>
                            <p className="text-sm">{course.credits} credits</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 items-start justify-end">
                      <Button variant="outline" size="sm" className="gap-1" onClick={() => handleEditCourse(course)}>
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" className="gap-1" onClick={() => handleDeleteCourse(course)}>
                        <Trash className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No courses found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Course Dialog */}
      {selectedCourse && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleSaveEdit}>
              <DialogHeader>
                <DialogTitle>Edit Continuing Education</DialogTitle>
                <DialogDescription>Update the details of your completed CE course.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-courseName">Course Name</Label>
                  <Input id="edit-courseName" value={editCourseFormData.course_name} onChange={(e) => setEditCourseFormData({ ...editCourseFormData, course_name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-provider">Provider</Label>
                  <Input id="edit-provider" value={editCourseFormData.provider} onChange={(e) => setEditCourseFormData({ ...editCourseFormData, provider: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-completionDate">Completion Date</Label>
                    <Input id="edit-completionDate" type="date" value={editCourseFormData.date_completed} onChange={(e) => setEditCourseFormData({ ...editCourseFormData, date_completed: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-credits">Credits</Label>
                    <Input id="edit-credits" type="number" min="0" step="0.5" value={editCourseFormData.credits} onChange={(e) => setEditCourseFormData({ ...editCourseFormData, credits: Number(e.target.value) })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-notes">Notes</Label>
                  <Textarea id="edit-notes" value={editCourseFormData.notes} onChange={(e) => setEditCourseFormData({ ...editCourseFormData, notes: e.target.value })} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Course Confirmation */}
      {selectedCourse && (
        <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the {selectedCourse.course_name} course. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteCourse} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
