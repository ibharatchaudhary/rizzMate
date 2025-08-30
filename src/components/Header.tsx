import { Heart } from "lucide-react"
import { Link } from "react-router-dom"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="p-2 bg-gradient-primary rounded-xl shadow-glow">
            <Heart className="h-6 w-6 text-white fill-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            RizzMate
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/discover" className="text-foreground/80 hover:text-primary transition-colors">
            Discover
          </Link>
          <Link to="/matches" className="text-foreground/80 hover:text-primary transition-colors">
            Matches
          </Link>
          <Link to="/profile" className="text-foreground/80 hover:text-primary transition-colors">
            Profile
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link to="/settings" className="hidden sm:inline-flex">
            <Button variant="ghost" size="sm">
              Settings
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="hidden sm:inline-flex">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
              Join Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}