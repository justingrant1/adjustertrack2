"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
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
import { Bell, Camera, Mail, Phone, Shield, User } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function ProfilePage() {
  // User profile state
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St",
    city: "Miami",
    state: "Florida",
    zipCode: "33101",
    bio: "Insurance adjuster with over 10 years of experience specializing in catastrophe claims and property damage assessment.",
    company: "Independent Adjusters LLC",
    title: "Senior Claims Adjuster",
    yearsExperience: "10",
    specialties: ["Property", "Catastrophe", "Flood"],
    profileImage: "/placeholder.svg?height=128&width=128",
  })

  // Account settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false,
    autoRenewalReminders: true,
    ceDeadlineReminders: true,
    dataSharing: false,
  })

  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Dialog states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)

  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  // Handle settings toggle
  const handleSettingToggle = (setting: string) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }))
  }

  // Handle password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle profile save
  const handleProfileSave = () => {
    // In a real app, this would send the updated profile to your backend
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  // Handle settings save
  const handleSettingsSave = () => {
    // In a real app, this would send the updated settings to your backend
    toast({
      title: "Settings updated",
      description: "Your account settings have been updated successfully.",
    })
  }

  // Handle password change
  const handlePasswordSave = () => {
    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would send the password change request to your backend
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    })
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setIsPasswordDialogOpen(false)
  }

  // Handle profile image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, this would upload the image to your backend
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file)
      setProfile((prev) => ({ ...prev, profileImage: imageUrl }))
      toast({
        title: "Profile image updated",
        description: "Your profile image has been updated successfully.",
      })
    }
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">
            <User className="h-4 w-4 mr-2" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="account">
            <Shield className="h-4 w-4 mr-2" />
            Account Settings
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage
                      src={profile.profileImage || "/placeholder.svg"}
                      alt={`${profile.firstName} ${profile.lastName}`}
                    />
                    <AvatarFallback>
                      {profile.firstName.charAt(0)}
                      {profile.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 p-1 rounded-full bg-primary text-primary-foreground cursor-pointer"
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Change profile picture</span>
                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg font-medium">
                    {profile.firstName} {profile.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                  <p className="text-sm text-muted-foreground">{profile.phone}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" value={profile.firstName} onChange={handleProfileChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" value={profile.lastName} onChange={handleProfileChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={profile.email} onChange={handleProfileChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" value={profile.phone} onChange={handleProfileChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={profile.address} onChange={handleProfileChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={profile.city} onChange={handleProfileChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={profile.state}
                    onValueChange={(value) => setProfile((prev) => ({ ...prev, state: value }))}
                  >
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alabama">Alabama</SelectItem>
                      <SelectItem value="Alaska">Alaska</SelectItem>
                      <SelectItem value="Arizona">Arizona</SelectItem>
                      <SelectItem value="California">California</SelectItem>
                      <SelectItem value="Florida">Florida</SelectItem>
                      <SelectItem value="Texas">Texas</SelectItem>
                      {/* Add more states as needed */}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input id="zipCode" name="zipCode" value={profile.zipCode} onChange={handleProfileChange} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" name="bio" value={profile.bio} onChange={handleProfileChange} rows={4} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleProfileSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Account Settings Tab */}
        <TabsContent value="account">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">
                            Receive updates, reminders, and alerts via email
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={() => handleSettingToggle("emailNotifications")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive urgent alerts via text message</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.smsNotifications}
                        onCheckedChange={() => handleSettingToggle("smsNotifications")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Auto-Renewal Reminders</p>
                          <p className="text-sm text-muted-foreground">Get notified before license renewals are due</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.autoRenewalReminders}
                        onCheckedChange={() => handleSettingToggle("autoRenewalReminders")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">CE Deadline Reminders</p>
                          <p className="text-sm text-muted-foreground">Get notified about upcoming CE deadlines</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.ceDeadlineReminders}
                        onCheckedChange={() => handleSettingToggle("ceDeadlineReminders")}
                      />
                    </div>
                  </div>
                </div>

                <Separator />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSettingsSave}>Save Settings</Button>
              </CardFooter>
            </Card>

            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Actions here can't be undone. Please proceed with caution.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Password Change Dialog */}
      <AlertDialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Password</AlertDialogTitle>
            <AlertDialogDescription>
              Enter your current password and a new password to update your credentials.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                name="currentPassword"
                type="password"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                name="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePasswordSave}>Change Password</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Account Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove all your data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground">Delete Account</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 