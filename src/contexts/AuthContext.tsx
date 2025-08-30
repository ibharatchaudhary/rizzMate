import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

export interface UserProfile {
  id: string
  name: string
  email: string
  age: string
  gender: string
  orientation: string
  location: string
  bio: string
  occupation: string
  education: string
  interests: string[]
  height: string
  fitness: string
  pets: string
  relationshipGoal: string
  ageRange: string
  genderPreference: string
  avatar?: string
}

interface AuthContextType {
  user: UserProfile | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (profile: Partial<UserProfile>) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // Check for existing auth on app load
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('rizzmate_user')
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
        } catch (error) {
          console.error('Error parsing stored user:', error)
          localStorage.removeItem('rizzmate_user')
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Create a default user profile
    const newUser: UserProfile = {
      id: Date.now().toString(),
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email,
      age: '25',
      gender: 'Prefer not to say',
      orientation: 'Straight',
      location: 'San Francisco, CA',
      bio: 'Hello! I\'m new to RizzMate and looking forward to meeting new people.',
      occupation: 'Professional',
      education: 'College Graduate',
      interests: ['Music', 'Travel', 'Food'],
      height: '5\'6"',
      fitness: 'Occasionally active',
      pets: 'No pets',
      relationshipGoal: 'Long-term relationship',
      ageRange: '22-30',
      genderPreference: 'Any'
    }

    setUser(newUser)
    localStorage.setItem('rizzmate_user', JSON.stringify(newUser))
    navigate('/discover')
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('rizzmate_user')
    navigate('/')
  }

  const updateProfile = (profileUpdates: Partial<UserProfile>) => {
    if (!user) return
    
    const updatedUser = { ...user, ...profileUpdates }
    setUser(updatedUser)
    localStorage.setItem('rizzmate_user', JSON.stringify(updatedUser))
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    updateProfile,
    isLoading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}