import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Send, Smile, ArrowLeft, MoreVertical, Heart, Phone, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Header } from "@/components/Header"

// Mock matches for sidebar
const mockMatches = [
  { id: 1, name: "Emma", photo: "/placeholder.svg", lastMessage: "Hey! Thanks for the like 😊", timestamp: "2m", hasNewMessage: true },
  { id: 2, name: "Marcus", photo: "/placeholder.svg", lastMessage: "That restaurant looks amazing!", timestamp: "1h", hasNewMessage: false },
  { id: 3, name: "Sophie", photo: "/placeholder.svg", lastMessage: "What's your favorite book?", timestamp: "3h", hasNewMessage: true },
  { id: 4, name: "Jordan", photo: "/placeholder.svg", lastMessage: "Love your music taste!", timestamp: "1d", hasNewMessage: false },
  { id: 5, name: "Riley", photo: "/placeholder.svg", lastMessage: "Your photos are incredible!", timestamp: "2d", hasNewMessage: true },
]

// Mock messages for selected match
const mockMessages = {
  1: [
    { id: 1, text: "Hey! Thanks for the like 😊", sender: "them", timestamp: "10:30 AM" },
    { id: 2, text: "You're welcome! I love your photos", sender: "me", timestamp: "10:32 AM" },
    { id: 3, text: "Thank you! I'm really into art and photography", sender: "them", timestamp: "10:35 AM" },
    { id: 4, text: "That's awesome! What kind of art do you create?", sender: "me", timestamp: "10:37 AM" },
    { id: 5, text: "Mostly digital illustrations and some watercolor paintings", sender: "them", timestamp: "10:40 AM" },
    { id: 6, text: "I'd love to see some of your work sometime!", sender: "me", timestamp: "10:42 AM" },
  ],
  2: [
    { id: 1, text: "That restaurant looks amazing!", sender: "them", timestamp: "9:15 AM" },
    { id: 2, text: "Right? Want to check it out together?", sender: "me", timestamp: "9:20 AM" },
  ]
}

export default function Chat() {
  const { matchId } = useParams()
  const [newMessage, setNewMessage] = useState("")
  const [selectedMatch, setSelectedMatch] = useState(matchId ? parseInt(matchId) : mockMatches[0].id)
  const [isTyping, setIsTyping] = useState(false)
  
  const currentMatch = mockMatches.find(match => match.id === selectedMatch)
  const messages = mockMessages[selectedMatch as keyof typeof mockMessages] || []

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    // Here you would send the message to your backend
    console.log("Sending message:", newMessage)
    setNewMessage("")
    
    // Simulate typing indicator
    setIsTyping(true)
    setTimeout(() => setIsTyping(false), 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Matches Sidebar */}
          <Card className="lg:col-span-1 bg-card/80 backdrop-blur-sm border-border/40 shadow-romantic">
            <CardHeader className="pb-3">
              <h2 className="font-semibold">Your Matches</h2>
            </CardHeader>
            <ScrollArea className="h-full">
              <div className="space-y-2 p-4 pt-0">
                {mockMatches.map((match) => (
                  <div
                    key={match.id}
                    onClick={() => setSelectedMatch(match.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedMatch === match.id
                        ? 'bg-primary/10 border border-primary/20'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={match.photo} />
                        <AvatarFallback>{match.name[0]}</AvatarFallback>
                      </Avatar>
                      {match.hasNewMessage && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">{match.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {match.lastMessage}
                      </p>
                    </div>
                    
                    <span className="text-xs text-muted-foreground">{match.timestamp}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-3 bg-card/80 backdrop-blur-sm border-border/40 shadow-romantic flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b border-border/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Link to="/matches" className="lg:hidden">
                    <Button size="sm" variant="ghost">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </Link>
                  
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={currentMatch?.photo} />
                    <AvatarFallback>{currentMatch?.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h2 className="font-semibold">{currentMatch?.name}</h2>
                    <p className="text-xs text-muted-foreground">Active now</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                        message.sender === 'me'
                          ? 'bg-gradient-primary text-white rounded-br-sm'
                          : 'bg-muted text-foreground rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'me' ? 'text-white/70' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border/40">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="shrink-0">
                  <Smile className="h-4 w-4" />
                </Button>
                
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="sm"
                  className="bg-gradient-primary hover:opacity-90 shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}