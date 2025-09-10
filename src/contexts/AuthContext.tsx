import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import users from '@/data/users.json' // <-- Import mock users

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
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay

    // Find matching user in users.json
    const foundUser = users.find(u => u.email === email && u.password === password)

    if (!foundUser) {
      setIsLoading(false)
      throw new Error('Invalid email or password') // Let UI handle showing error
    }

    // Save user (without password)
    const { password: _, ...userWithoutPassword } = foundUser
    setUser(userWithoutPassword)
    localStorage.setItem('rizzmate_user', JSON.stringify(userWithoutPassword))
    setIsLoading(false)
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

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      updateProfile,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}
