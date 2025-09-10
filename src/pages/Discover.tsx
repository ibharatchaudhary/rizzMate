import { useState, useEffect } from "react"
import { Heart, X, MapPin, Briefcase, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/Header"
import profilesData from "@/data/profiles.json"

export default function Discover() {
  const [profiles, setProfiles] = useState(profilesData)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleAction = (action: "like" | "pass") => {
    if (isAnimating) return

    setIsAnimating(true)

    setTimeout(() => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        setCurrentIndex(0) // reset to start
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
            <h2 className="text-2xl font-bold mb-2">No profiles found</h2>
            <p className="text-muted-foreground">
              Please add some profiles to profiles.json
            </p>
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
            <h1 className="text-3xl font-bold text-white mb-2">
              Discover
            </h1>
            <p className="text-white opacity-80">Find your perfect match</p>
          </div>

          <Card
            className={`relative bg-card/90 backdrop-blur-sm border-border/40 shadow-romantic overflow-hidden transition-all duration-300 ${
              isAnimating ? "scale-95 opacity-50" : "scale-100 opacity-100"
            }`}
          >
            <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
              <img
                src={currentProfile.photos[0]}
                alt={currentProfile.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

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
              <p className="text-muted-foreground leading-relaxed">
                {currentProfile.bio}
              </p>

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
                  {currentProfile.interests.map(
                    (interest: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-primary/10 text-primary text-xs"
                      >
                        {interest}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleAction("pass")}
              disabled={isAnimating}
              className="w-16 h-16 rounded-full border-2 border-destructive/20 hover:border-destructive hover:bg-destructive/10 transition-all duration-200"
            >
              <X className="h-6 w-6 text-destructive" />
            </Button>

            <Button
              size="lg"
              onClick={() => handleAction("like")}
              disabled={isAnimating}
              className="w-16 h-16 rounded-full bg-gradient-primary hover:opacity-90 transition-all duration-200 shadow-glow"
            >
              <Heart className="h-6 w-6 text-white fill-white" />
            </Button>
          </div>

          <div className="flex justify-center">
            <div className="flex gap-1">
              {profiles.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index <= currentIndex ? "bg-primary" : "bg-muted"
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
