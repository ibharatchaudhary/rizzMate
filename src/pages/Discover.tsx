import { useState } from "react"
import { Heart, X, MapPin, Briefcase, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/Header"

// Mock data for potential matches
const mockProfiles = [
  {
    id: 1,
    name: "Emma",
    age: 26,
    location: "San Francisco, CA",
    bio: "Art lover, yoga enthusiast, always up for new adventures!",
    occupation: "Graphic Designer",
    education: "Art Institute",
    interests: ["Art", "Yoga", "Travel"],
    photos: ["/placeholder.svg"]
  },
  {
    id: 2,
    name: "Marcus",
    age: 30,
    location: "Oakland, CA",
    bio: "Foodie chef who loves hiking and trying new restaurants.",
    occupation: "Chef",
    education: "Culinary Institute",
    interests: ["Cooking", "Hiking", "Food"],
    photos: ["/placeholder.svg"]
  },
  {
    id: 3,
    name: "Sophie",
    age: 24,
    location: "Berkeley, CA",
    bio: "PhD student, book lover, coffee addict ☕️",
    occupation: "Graduate Student",
    education: "UC Berkeley",
    interests: ["Reading", "Research", "Coffee"],
    photos: ["/placeholder.svg"]
  },
  {
    id: 4,
    name: "Jordan",
    age: 27,
    location: "San Jose, CA",
    bio: "Musician by night, developer by day. Let's make beautiful music together!",
    occupation: "Software Developer",
    education: "Stanford University",
    interests: ["Music", "Coding", "Guitar"],
    photos: ["/placeholder.svg"]
  },
  {
    id: 5,
    name: "Riley",
    age: 25,
    location: "San Francisco, CA",
    bio: "Adventure photographer capturing life's beautiful moments.",
    occupation: "Photographer",
    education: "SFSU",
    interests: ["Photography", "Travel", "Nature"],
    photos: ["/placeholder.svg"]
  }
]

export default function Discover() {
  const [profiles, setProfiles] = useState(mockProfiles)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleAction = (action: 'like' | 'pass') => {
    if (isAnimating) return
    
    setIsAnimating(true)
    
    // Remove current profile and move to next
    setTimeout(() => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        // Reset to beginning or show "no more profiles" message
        setCurrentIndex(0)
      }
      setIsAnimating(false)
    }, 300)
  }

  const currentProfile = profiles[currentIndex]

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-md">
          <div className="text-center py-20">
            <Heart className="h-16 w-16 mx-auto text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-2">No more profiles!</h2>
            <p className="text-muted-foreground">Check back later for new matches.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Discover
            </h1>
            <p className="text-muted-foreground">Find your perfect match</p>
          </div>

          {/* Profile Card */}
          <Card className={`relative bg-card/90 backdrop-blur-sm border-border/40 shadow-romantic overflow-hidden transition-all duration-300 ${
            isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
          }`}>
            <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
              <img 
                src={currentProfile.photos[0]} 
                alt={currentProfile.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Profile Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h2 className="text-2xl font-bold mb-1">
                  {currentProfile.name}, {currentProfile.age}
                </h2>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{currentProfile.location}</span>
                </div>
              </div>
            </div>

            <CardContent className="p-4 space-y-4">
              <p className="text-muted-foreground leading-relaxed">{currentProfile.bio}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <span>{currentProfile.occupation}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span>{currentProfile.education}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary/10 text-primary text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleAction('pass')}
              disabled={isAnimating}
              className="w-16 h-16 rounded-full border-2 border-destructive/20 hover:border-destructive hover:bg-destructive/10 transition-all duration-200"
            >
              <X className="h-6 w-6 text-destructive" />
            </Button>
            
            <Button
              size="lg"
              onClick={() => handleAction('like')}
              disabled={isAnimating}
              className="w-16 h-16 rounded-full bg-gradient-primary hover:opacity-90 transition-all duration-200 shadow-glow"
            >
              <Heart className="h-6 w-6 text-white fill-white" />
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center">
            <div className="flex gap-1">
              {profiles.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index <= currentIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}