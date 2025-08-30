import { Link } from "react-router-dom"
import { Heart, Sparkles, Shield, Users, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/Header"
import heroImage from "@/assets/hero-image.jpg"

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-secondary/20" />
        
        <div className="container mx-auto max-w-7xl relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-primary/10 border border-primary/20">
                  <Sparkles className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm font-medium text-primary">Find Your Perfect Match</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                  Where Love
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> Begins</span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Join millions of people discovering meaningful connections on RizzMate. 
                  Our advanced matching algorithm helps you find someone who truly gets you.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-primary/20 hover:border-primary/40">
                    Sign In
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2M+</div>
                  <div className="text-sm text-muted-foreground">Happy Couples</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">15M+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">4.9 Rating</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-romantic">
                <img 
                  src={heroImage} 
                  alt="Romantic couple finding love on RizzMate" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 p-3 bg-gradient-primary rounded-full shadow-glow animate-bounce">
                <Heart className="h-6 w-6 text-white fill-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 p-2 bg-secondary/90 backdrop-blur-sm rounded-full shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">RizzMate?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience dating like never before with our innovative features designed for modern romance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-primary/10 shadow-card bg-gradient-card hover:shadow-romantic transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="p-4 bg-gradient-primary rounded-xl shadow-glow w-fit mx-auto">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Smart Matching</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI-powered algorithm analyzes compatibility across 32 dimensions to find your perfect match
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/10 shadow-card bg-gradient-card hover:shadow-romantic transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="p-4 bg-secondary rounded-xl shadow-glow w-fit mx-auto">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Safe & Secure</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Advanced verification and privacy controls ensure your safety while you search for love
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/10 shadow-card bg-gradient-card hover:shadow-romantic transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="p-4 bg-gradient-primary rounded-xl shadow-glow w-fit mx-auto">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Real Connections</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Meet genuine people looking for meaningful relationships, not just casual encounters
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-primary rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative">
              <h2 className="text-4xl font-bold mb-4">Ready to Find Love?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join RizzMate today and start your journey to finding someone special. 
                Your perfect match is just a swipe away!
              </p>
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6 hover:bg-white/90">
                  Get Started Now
                  <Heart className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4 bg-muted/20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <Heart className="h-5 w-5 text-white fill-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  RizzMate
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Where meaningful connections begin. Find your perfect match today.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Product</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Features</div>
                <div>Pricing</div>
                <div>Success Stories</div>
                <div>Safety</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Company</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>About Us</div>
                <div>Careers</div>
                <div>Press</div>
                <div>Contact</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Legal</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>Cookie Policy</div>
                <div>Guidelines</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/40 mt-8 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 RizzMate. All rights reserved. Made with ❤️ for people in love.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}