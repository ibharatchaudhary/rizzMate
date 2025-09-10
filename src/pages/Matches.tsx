import { Heart, MessageCircle, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/Header"
import { Link } from "react-router-dom"

// Mock matches data
const mockMatches = [
  {
    id: 1,
    name: "Emma",
    age: 26,
    location: "San Francisco, CA",
    bio: "Art lover, yoga enthusiast, always up for new adventures!",
    photo: "/placeholder.svg",
    matchedAt: "2024-01-15",
    hasNewMessage: true,
    lastMessage: "Hey! Thanks for the like 😊"
  },
  {
    id: 2,
    name: "Marcus",
    age: 30,
    location: "Oakland, CA", 
    bio: "Foodie chef who loves hiking and trying new restaurants.",
    photo: "/placeholder.svg",
    matchedAt: "2024-01-14",
    hasNewMessage: false,
    lastMessage: "That restaurant looks amazing!"
  },
  {
    id: 3,
    name: "Sophie",
    age: 24,
    location: "Berkeley, CA",
    bio: "PhD student, book lover, coffee addict ☕️",
    photo: "/placeholder.svg",
    matchedAt: "2024-01-13",
    hasNewMessage: true,
    lastMessage: "What's your favorite book?"
  },
  {
    id: 4,
    name: "Jordan",
    age: 27,
    location: "San Jose, CA",
    bio: "Musician by night, developer by day.",
    photo: "/placeholder.svg",
    matchedAt: "2024-01-12",
    hasNewMessage: false,
    lastMessage: "Love your music taste!"
  },
  {
    id: 5,
    name: "Riley",
    age: 25,
    location: "San Francisco, CA",
    bio: "Adventure photographer capturing life's beautiful moments.",
    photo: "/placeholder.svg",
    matchedAt: "2024-01-11",
    hasNewMessage: true,
    lastMessage: "Your photos are incredible!"
  }
]

export default function Matches() {
  const formatMatchDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return "Today"
    if (diffDays === 2) return "Yesterday"
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              Your Matches
            </h1>
            <p className="text-white opacity-80">
              {mockMatches.length} mutual {mockMatches.length === 1 ? 'match' : 'matches'}
            </p>
          </div>

          {mockMatches.length === 0 ? (
            <Card className="bg-card/80 backdrop-blur-sm border-border/40 shadow-romantic">
              <CardContent className="text-center py-12">
                <Heart className="h-16 w-16 mx-auto text-primary/50 mb-4" />
                <h2 className="text-xl font-semibold mb-2">No matches yet</h2>
                <p className="text-muted-foreground mb-4">
                  Start swiping to find your perfect match!
                </p>
                <Link to="/discover">
                  <Button className="bg-gradient-primary hover:opacity-90">
                    Start Discovering
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {mockMatches.map((match) => (
                <Card
                  key={match.id}
                  className="bg-card/80 backdrop-blur-sm border-border/40 shadow-romantic hover:shadow-glow transition-all duration-300 hover:scale-[1.02]"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Profile Picture */}
                      <div className="relative">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={match.photo} />
                          <AvatarFallback className="bg-gradient-primary text-white">
                            {match.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        {match.hasNewMessage && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background animate-pulse" />
                        )}
                      </div>

                      {/* Match Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {match.name}, {match.age}
                            </h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span className="truncate">{match.location}</span>
                            </div>
                          </div>
                          
                          {match.hasNewMessage && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                              New
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {match.bio}
                        </p>

                        {/* Last Message Preview */}
                        <div className="bg-muted/30 rounded-lg p-2 mb-3">
                          <p className="text-sm text-muted-foreground italic">
                            "{match.lastMessage}"
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>Matched {formatMatchDate(match.matchedAt)}</span>
                          </div>

                          <Link to={`/chat/${match.id}`}>
                            <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Chat
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex justify-center gap-4">
            <Link to="/discover">
              <Button variant="outline" className="bg-background/50 backdrop-blur-sm">
                <Heart className="h-4 w-4 mr-2" />
                Keep Swiping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}