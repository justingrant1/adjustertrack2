"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
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
import { Award, Calendar, Download, Edit, FileText, Plus, Search, Trash } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

type License = {
  id: number
  user_id: string
  state: string
  license_number: string
  license_type: string
  expiration_date: string
  issue_date: string
  ce_required: number
  ce_completed: number
  notes: string
  status: string
}

const mockLicenses: License[] = [
    {
      id: 1,
      user_id: "demo-user",
      state: "Florida",
      license_number: "P012345",
      license_type: "Public Adjuster",
      expiration_date: "2025-08-15",
      issue_date: "2023-08-15",
      ce_required: 24,
      ce_completed: 12,
      notes: "This is a sample note for the Florida license.",
      status: "Active",
    },
    {
      id: 2,
      user_id: "demo-user",
      state: "Texas",
      license_number: "TX98765",
      license_type: "Independent Adjuster",
      expiration_date: "2025-05-22",
      issue_date: "2023-05-22",
      ce_required: 30,
      ce_completed: 5,
      notes: "This is a sample note for the Texas license.",
      status: "Active",
    },
    {
      id: 3,
      user_id: "demo-user",
      state: "California",
      license_number: "CA54321",
      license_type: "Public Adjuster",
      expiration_date: "2024-12-01",
      issue_date: "2022-12-01",
      ce_required: 24,
      ce_completed: 24,
      notes: "This is a sample note for the California license.",
      status: "Active",
    },
]

export default function LicensesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isRenewOpen, setIsRenewOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newLicenseFormData, setNewLicenseFormData] = useState({
    state: "",
    license_number: "",
    license_type: "",
    expiration_date: "",
    issue_date: "",
    ce_required: 0,
    notes: "",
  })
  const [editFormData, setEditFormData] = useState<Partial<License>>({})
  const [licenses, setLicenses] = useState<License[]>(mockLicenses)

  const filteredLicenses = licenses.filter(
    (license) =>
      license.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.license_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.license_type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle view license details
  const handleViewLicense = (license: License) => {
    setSelectedLicense(license)
    setIsViewOpen(true)
  }

  // Handle edit license
  const handleEditLicense = (license: License) => {
    setSelectedLicense(license)
    setEditFormData(license)
    setIsEditOpen(true)
  }

  // Handle save edited license
  const handleSaveEdit = async () => {
    if (!selectedLicense) return
    // In a real app, you would update the database. Here we just update the state.
    setLicenses(licenses.map(l => l.id === selectedLicense.id ? {...l, ...editFormData} : l))
    setIsEditOpen(false)
  }

  // Handle renew license
  const handleRenewLicense = (license: License) => {
    setSelectedLicense(license)
    setIsRenewOpen(true)
  }

  // Handle save renewal
  const handleSaveRenewal = async () => {
    if (!selectedLicense) return
    const currentExpDate = new Date(selectedLicense.expiration_date)
    const newExpDate = new Date(currentExpDate)
    newExpDate.setFullYear(newExpDate.getFullYear() + 2)

    setLicenses(licenses.map(l => l.id === selectedLicense.id ? {
        ...l,
        expiration_date: newExpDate.toISOString().split("T")[0],
        ce_completed: 0,
        notes: (l.notes || "") + " Renewed on " + new Date().toLocaleDateString() + ".",
    } : l))
    setIsRenewOpen(false)
  }

  // Handle export license
  const handleExportLicense = (license: License) => {
    // Create a JSON string of the license data
    const licenseData = JSON.stringify(license, null, 2)

    // Create a blob and download link
    const blob = new Blob([licenseData], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    // Create a temporary link and trigger download
    const link = document.createElement("a")
    link.href = url
    link.download = `${license.state}_${license.license_number}_license.json`
    document.body.appendChild(link)
    link.click()

    // Clean up
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Handle delete license
  const handleDeleteLicense = (license: License) => {
    setSelectedLicense(license)
    setIsDeleteOpen(true)
  }

  // Confirm delete license
  const confirmDeleteLicense = async () => {
    if (!selectedLicense) return
    setLicenses(licenses.filter(l => l.id !== selectedLicense.id))
    setIsDeleteOpen(false)
  }

  const handleAddLicense = async (e: React.FormEvent) => {
    e.preventDefault()
    const newId = licenses.length > 0 ? Math.max(...licenses.map(l => l.id)) + 1 : 1;
    const newLicense: License = {
        id: newId,
        user_id: "demo-user",
        status: "Active",
        ce_completed: 0,
        ...newLicenseFormData,
    };
    setLicenses([...licenses, newLicense]);
    setIsAddOpen(false)
    setNewLicenseFormData({
        state: "",
        license_number: "",
        license_type: "",
        expiration_date: "",
        issue_date: "",
        ce_required: 0,
        notes: "",
    })
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">License Management</h1>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New License
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleAddLicense}>
              <DialogHeader>
                <DialogTitle>Add New License</DialogTitle>
                <DialogDescription>Enter the details of your adjuster license.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" value={newLicenseFormData.state} onChange={(e) => setNewLicenseFormData({ ...newLicenseFormData, state: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licenseType">License Type</Label>
                    <Input id="licenseType" value={newLicenseFormData.license_type} onChange={(e) => setNewLicenseFormData({ ...newLicenseFormData, license_type: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input id="licenseNumber" value={newLicenseFormData.license_number} onChange={(e) => setNewLicenseFormData({ ...newLicenseFormData, license_number: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="issueDate">Issue Date</Label>
                    <Input id="issueDate" type="date" value={newLicenseFormData.issue_date} onChange={(e) => setNewLicenseFormData({ ...newLicenseFormData, issue_date: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expirationDate">Expiration Date</Label>
                    <Input id="expirationDate" type="date" value={newLicenseFormData.expiration_date} onChange={(e) => setNewLicenseFormData({ ...newLicenseFormData, expiration_date: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ceRequirement">CE Requirement (Credits)</Label>
                  <Input id="ceRequirement" type="number" min="0" value={newLicenseFormData.ce_required} onChange={(e) => setNewLicenseFormData({ ...newLicenseFormData, ce_required: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" value={newLicenseFormData.notes} onChange={(e) => setNewLicenseFormData({ ...newLicenseFormData, notes: e.target.value })} />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save License</Button>
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
            placeholder="Search licenses..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Licenses</TabsTrigger>
          <TabsTrigger value="expired">Expired Licenses</TabsTrigger>
          <TabsTrigger value="pending">Pending Renewal</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          {filteredLicenses.length > 0 ? (
            filteredLicenses.map((license) => (
              <Card key={license.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-3">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {license.state} - {license.license_type}
                        </h3>
                        <p className="text-sm text-muted-foreground">License #: {license.license_number}</p>
                        <div className="flex flex-wrap gap-4 mt-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Issue Date</p>
                            <p className="text-sm">{new Date(license.issue_date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Expiration Date</p>
                            <p className="text-sm">{new Date(license.expiration_date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Status</p>
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                              {license.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="space-y-1 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <p>CE Progress</p>
                          <p>
                            {license.ce_completed}/{license.ce_required} credits
                          </p>
                        </div>
                        <Progress value={(license.ce_completed / license.ce_required) * 100} />
                      </div>
                      <div className="flex flex-wrap gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => handleViewLicense(license)}
                        >
                          <FileText className="h-4 w-4" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => handleEditLicense(license)}
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => handleRenewLicense(license)}
                        >
                          <Calendar className="h-4 w-4" />
                          Renew
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => handleExportLicense(license)}
                        >
                          <Download className="h-4 w-4" />
                          Export
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="gap-1"
                          onClick={() => handleDeleteLicense(license)}
                        >
                          <Trash className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No active licenses found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="expired">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No expired licenses found.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No licenses pending renewal.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View License Dialog */}
      {selectedLicense && (
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>License Details</DialogTitle>
              <DialogDescription>
                {selectedLicense.state} - {selectedLicense.license_type}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">License Number</h3>
                  <p>{selectedLicense.license_number}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Status</h3>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                    {selectedLicense.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Issue Date</h3>
                  <p>{new Date(selectedLicense.issue_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Expiration Date</h3>
                  <p>{new Date(selectedLicense.expiration_date).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">CE Requirements</h3>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <p>Progress</p>
                    <p>
                      {selectedLicense.ce_completed}/{selectedLicense.ce_required} credits
                    </p>
                  </div>
                  <Progress value={(selectedLicense.ce_completed / selectedLicense.ce_required) * 100} />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Notes</h3>
                <p className="text-sm text-muted-foreground">{selectedLicense.notes || "No notes available."}</p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsViewOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit License Dialog */}
      {selectedLicense && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit License</DialogTitle>
              <DialogDescription>Update the details of your license.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-state">State</Label>
                  <Input
                    id="edit-state"
                    value={editFormData.state}
                    onChange={(e) => setEditFormData({ ...editFormData, state: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-type">License Type</Label>
                  <Input
                    id="edit-type"
                    value={editFormData.license_type}
                    onChange={(e) => setEditFormData({ ...editFormData, license_type: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-licenseNumber">License Number</Label>
                <Input
                  id="edit-licenseNumber"
                  value={editFormData.license_number}
                  onChange={(e) => setEditFormData({ ...editFormData, license_number: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-issueDate">Issue Date</Label>
                  <Input
                    id="edit-issueDate"
                    type="date"
                    value={editFormData.issue_date}
                    onChange={(e) => setEditFormData({ ...editFormData, issue_date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-expirationDate">Expiration Date</Label>
                  <Input
                    id="edit-expirationDate"
                    type="date"
                    value={editFormData.expiration_date}
                    onChange={(e) => setEditFormData({ ...editFormData, expiration_date: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-ceRequired">CE Required</Label>
                  <Input
                    id="edit-ceRequired"
                    type="number"
                    min="0"
                    value={editFormData.ce_required}
                    onChange={(e) => setEditFormData({ ...editFormData, ce_required: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-ceCompleted">CE Completed</Label>
                  <Input
                    id="edit-ceCompleted"
                    type="number"
                    min="0"
                    value={editFormData.ce_completed}
                    onChange={(e) => setEditFormData({ ...editFormData, ce_completed: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={editFormData.notes}
                  onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
                  placeholder="Add any notes about this license"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Renew License Dialog */}
      {selectedLicense && (
        <Dialog open={isRenewOpen} onOpenChange={setIsRenewOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Renew License</DialogTitle>
              <DialogDescription>
                Confirm renewal of your {selectedLicense.state} {selectedLicense.license_type} license.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="rounded-md bg-amber-50 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Calendar className="h-5 w-5 text-amber-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800">Renewal Information</h3>
                    <div className="mt-2 text-sm text-amber-700">
                      <p>
                        Your license will be renewed for 2 years from the current expiration date. CE credits will be
                        reset to 0 and you will need to complete {selectedLicense.ce_required} credits before the next
                        renewal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Current Expiration Date</h3>
                  <p>{new Date(selectedLicense.expiration_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">New Expiration Date</h3>
                  <p>
                    {(() => {
                      const currentExpDate = new Date(selectedLicense.expiration_date)
                      const newExpDate = new Date(currentExpDate)
                      newExpDate.setFullYear(newExpDate.getFullYear() + 2)
                      return newExpDate.toLocaleDateString()
                    })()}
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRenewOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveRenewal}>Confirm Renewal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete License Confirmation */}
      {selectedLicense && (
        <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the {selectedLicense.state} {selectedLicense.license_type} license (
                {selectedLicense.license_number}). This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteLicense} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
