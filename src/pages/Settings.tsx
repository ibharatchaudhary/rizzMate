import { useState } from "react"
import { Bell, Shield, LogOut, User, Heart, Moon, Sun, Globe, HelpCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Header } from "@/components/Header"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useTheme } from "@/components/ThemeProvider"

export default function Settings() {
  const { theme } = useTheme()
  const [settings, setSettings] = useState({
    notifications: {
      newMatches: true,
      messages: true,
      promotions: false,
      push: true
    },
    privacy: {
      showDistance: true,
      showAge: true,
      incognito: false,
      readReceipts: true
    },
    discovery: {
      globalMode: true,
      showMeOn: true
    }
  })

  const updateSetting = (category: string, key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }))
  }

  const handleLogout = () => {
    // Here you would handle logout logic
    console.log("Logging out...")
  }

  const handleDeleteAccount = () => {
    // Here you would handle account deletion
    console.log("Deleting account...")
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              Settings
            </h1>
            <p className="text-white opacity-80">
              Customize your RizzMate experience
            </p>
          </div>

          {/* Account Section */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/40 shadow-romantic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Theme</h4>
                  <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                </div>
                <ThemeToggle />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Language</h4>
                  <p className="text-sm text-muted-foreground">Select your language</p>
                </div>
                <Select defaultValue="english">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Español</SelectItem>
                    <SelectItem value="french">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/40 shadow-romantic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">New Matches</h4>
                  <p className="text-sm text-muted-foreground">Get notified when someone likes you</p>
                </div>
                <Switch
                  checked={settings.notifications.newMatches}
                  onCheckedChange={(checked) => updateSetting('notifications', 'newMatches', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Messages</h4>
                  <p className="text-sm text-muted-foreground">Get notified of new messages</p>
                </div>
                <Switch
                  checked={settings.notifications.messages}
                  onCheckedChange={(checked) => updateSetting('notifications', 'messages', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                </div>
                <Switch
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) => updateSetting('notifications', 'push', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Promotions</h4>
                  <p className="text-sm text-muted-foreground">Receive promotional emails</p>
                </div>
                <Switch
                  checked={settings.notifications.promotions}
                  onCheckedChange={(checked) => updateSetting('notifications', 'promotions', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Section */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/40 shadow-romantic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Show Distance</h4>
                  <p className="text-sm text-muted-foreground">Display your distance to other users</p>
                </div>
                <Switch
                  checked={settings.privacy.showDistance}
                  onCheckedChange={(checked) => updateSetting('privacy', 'showDistance', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Show Age</h4>
                  <p className="text-sm text-muted-foreground">Display your age on your profile</p>
                </div>
                <Switch
                  checked={settings.privacy.showAge}
                  onCheckedChange={(checked) => updateSetting('privacy', 'showAge', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Incognito Mode</h4>
                  <p className="text-sm text-muted-foreground">Browse without being seen</p>
                </div>
                <Switch
                  checked={settings.privacy.incognito}
                  onCheckedChange={(checked) => updateSetting('privacy', 'incognito', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Read Receipts</h4>
                  <p className="text-sm text-muted-foreground">Let others know when you've read their messages</p>
                </div>
                <Switch
                  checked={settings.privacy.readReceipts}
                  onCheckedChange={(checked) => updateSetting('privacy', 'readReceipts', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Discovery Section */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/40 shadow-romantic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Discovery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Global Mode</h4>
                  <p className="text-sm text-muted-foreground">See people from around the world</p>
                </div>
                <Switch
                  checked={settings.discovery.globalMode}
                  onCheckedChange={(checked) => updateSetting('discovery', 'globalMode', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Show Me On RizzMate</h4>
                  <p className="text-sm text-muted-foreground">Make your profile visible to others</p>
                </div>
                <Switch
                  checked={settings.discovery.showMeOn}
                  onCheckedChange={(checked) => updateSetting('discovery', 'showMeOn', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Support Section */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/40 shadow-romantic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start">
                Help Center
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Contact Support
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Privacy Policy
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Terms of Service
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/40 shadow-romantic border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Trash2 className="h-5 w-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full border-destructive/20 text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove all your data from our servers including your matches and messages.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}