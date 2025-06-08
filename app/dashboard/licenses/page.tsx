"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
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
}

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
  })
  const [editFormData, setEditFormData] = useState<Partial<License>>({})
  const [licenses, setLicenses] = useState<License[]>([])
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
    const { error } = await supabase
      .from('licenses')
      .update(editFormData)
      .eq('id', selectedLicense.id)
    if (error) {
      console.error('Error updating license:', error)
    } else {
      fetchLicenses()
      setIsEditOpen(false)
    }
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

    const { error } = await supabase
      .from('licenses')
      .update({
        expiration_date: newExpDate.toISOString().split("T")[0],
      })
      .eq('id', selectedLicense.id)

    if (error) {
      console.error('Error renewing license:', error)
    } else {
      fetchLicenses()
      setIsRenewOpen(false)
    }
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
    const { error } = await supabase
      .from('licenses')
      .delete()
      .eq('id', selectedLicense.id)
    if (error) {
      console.error('Error deleting license:', error)
    } else {
      fetchLicenses()
      setIsDeleteOpen(false)
    }
  }

  const handleAddLicense = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const { error } = await supabase.from('licenses').insert([
      { ...newLicenseFormData, user_id: user.id },
    ])

    if (error) {
      console.error('Error adding license:', error)
    } else {
      fetchLicenses()
      setIsAddOpen(false)
      setNewLicenseFormData({
        state: "",
        license_number: "",
        license_type: "",
        expiration_date: "",
      })
    }
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
                    <Label htmlFor="expirationDate">Expiration Date</Label>
                    <Input id="expirationDate" type="date" value={newLicenseFormData.expiration_date} onChange={(e) => setNewLicenseFormData({ ...newLicenseFormData, expiration_date: e.target.value })} />
                  </div>
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
                            <p className="text-xs text-muted-foreground">Expiration Date</p>
                            <p className="text-sm">{new Date(license.expiration_date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Expiration Date</h3>
                  <p>{new Date(selectedLicense.expiration_date).toLocaleDateString()}</p>
                </div>
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
                  <Label htmlFor="edit-expirationDate">Expiration Date</Label>
                  <Input
                    id="edit-expirationDate"
                    type="date"
                    value={editFormData.expiration_date}
                    onChange={(e) => setEditFormData({ ...editFormData, expiration_date: e.target.value })}
                  />
                </div>
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
                        Your license will be renewed for 2 years from the current expiration date.
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
