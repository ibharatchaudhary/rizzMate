import { useState, useEffect } from "react"
import { Camera, Edit2, MapPin, Heart, User, Briefcase, GraduationCap, Ruler, PawPrint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Header } from "@/components/Header"
import { useAuth } from "@/contexts/AuthContext"
import ProfileEditor from "@/components/ProfileEditor"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const { user, isAuthenticated, updateProfile } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  if (!user) {
    return null
  }

  const handleSave = (updatedProfile: Partial<typeof user>) => {
    updateProfile(updatedProfile)
    setIsEditing(false)
    toast({
      title: "Profile updated! ✨",
      description: "Your changes have been saved successfully",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Photo & Basic Info */}
          <Card className="md:col-span-1 bg-card/80 backdrop-blur-sm border-border/40 shadow-romantic">
            <CardContent className="p-6 text-center">
              <div className="relative mb-4">
                <Avatar className="w-32 h-32 mx-auto">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-primary text-white text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  id="avatar-upload"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        updateProfile({ avatar: reader.result as string })
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                />

                {/* Camera Button */}
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => document.getElementById("avatar-upload")?.click()}
                  className="absolute -bottom-2 -right-2 rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              
              <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
              <p className="text-muted-foreground mb-4">{user.age} years old</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Heart className="h-4 w-4 text-primary" />
                  <span>{user.orientation}</span>
                </div>
              </div>

              <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                  <Button className="w-full mt-4 bg-gradient-primary hover:opacity-90">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <ProfileEditor 
                    profile={user} 
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)}
                  />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <div className="md:col-span-2 space-y-6">
            {/* About Section */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/40 shadow-romantic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  About Me
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span>{user.occupation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span>{user.education}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lifestyle Section */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/40 shadow-romantic">
              <CardHeader>
                <CardTitle>Lifestyle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-primary" />
                    <span>{user.height}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>{user.fitness}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PawPrint className="h-4 w-4 text-primary" />
                    <span>{user.pets}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferences Section */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/40 shadow-romantic">
              <CardHeader>
                <CardTitle>Match Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Age Range</label>
                    <p className="font-medium">{user.ageRange}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Looking For</label>
                    <p className="font-medium">{user.genderPreference}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Relationship Goal</label>
                  <p className="font-medium">{user.relationshipGoal}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}