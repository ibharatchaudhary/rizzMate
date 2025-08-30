import { useState } from "react"
import { Camera, Edit2, MapPin, Heart, User, Briefcase, GraduationCap, Calendar, Ruler, PawPrint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Header } from "@/components/Header"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Alex Jordan",
    age: "28",
    gender: "Non-binary",
    orientation: "Pansexual",
    location: "San Francisco, CA",
    bio: "Adventure seeker, coffee enthusiast, and dog lover. Looking for genuine connections and memorable experiences.",
    occupation: "Software Engineer",
    education: "UC Berkeley",
    interests: ["Hiking", "Photography", "Cooking", "Travel", "Music"],
    height: "5'8\"",
    fitness: "Regularly active",
    pets: "Dog lover",
    relationshipGoal: "Long-term relationship",
    ageRange: "25-35",
    genderPreference: "Any"
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would save to backend
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
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gradient-primary text-white text-2xl">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
              <p className="text-muted-foreground mb-4">{profile.age} years old</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Heart className="h-4 w-4 text-primary" />
                  <span>{profile.orientation}</span>
                </div>
              </div>

              <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                  <Button className="w-full mt-4 bg-gradient-primary hover:opacity-90">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <Input value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Age</label>
                        <Input value={profile.age} onChange={(e) => setProfile({...profile, age: e.target.value})} />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Bio</label>
                      <Textarea 
                        value={profile.bio} 
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Gender</label>
                        <Select value={profile.gender} onValueChange={(value) => setProfile({...profile, gender: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Non-binary">Non-binary</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Sexual Orientation</label>
                        <Select value={profile.orientation} onValueChange={(value) => setProfile({...profile, orientation: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Straight">Straight</SelectItem>
                            <SelectItem value="Gay">Gay</SelectItem>
                            <SelectItem value="Lesbian">Lesbian</SelectItem>
                            <SelectItem value="Bisexual">Bisexual</SelectItem>
                            <SelectItem value="Pansexual">Pansexual</SelectItem>
                            <SelectItem value="Asexual">Asexual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button onClick={handleSave} className="w-full bg-gradient-primary hover:opacity-90">
                      Save Changes
                    </Button>
                  </div>
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
                <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span>{profile.occupation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span>{profile.education}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, index) => (
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
                    <span>{profile.height}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>{profile.fitness}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PawPrint className="h-4 w-4 text-primary" />
                    <span>{profile.pets}</span>
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
                    <p className="font-medium">{profile.ageRange}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Looking For</label>
                    <p className="font-medium">{profile.genderPreference}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Relationship Goal</label>
                  <p className="font-medium">{profile.relationshipGoal}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}