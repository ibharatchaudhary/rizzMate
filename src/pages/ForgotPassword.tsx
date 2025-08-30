import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { Mail, Heart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { forgotPasswordSchema, ForgotPasswordFormData } from "@/lib/validations"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPassword() {
  const { toast } = useToast()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Reset link sent! 📧",
        description: "Check your email for password reset instructions",
      })
      
      console.log("Forgot password data:", data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset link. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/20 via-background to-secondary/10 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
              <Heart className="h-7 w-7 text-white fill-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              RizzMate
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">Forgot Password?</h1>
          <p className="text-muted-foreground">No worries! We'll send you reset instructions</p>
        </div>

        <Card className="shadow-card bg-gradient-card border-primary/10">
          <CardHeader className="space-y-1 text-center pb-4">
            <CardTitle className="text-xl text-foreground">Reset Password</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10 border-input focus:border-primary/50 focus:ring-primary/20"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending Link..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Sign in
                </Link>
              </p>
              
              <Link
                to="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}