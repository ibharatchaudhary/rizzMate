import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { UserProfile } from "@/contexts/AuthContext"

interface ProfileEditorProps {
  profile: UserProfile
  onSave: (updatedProfile: Partial<UserProfile>) => void
  onCancel: () => void
}

export default function ProfileEditor({ profile, onSave, onCancel }: ProfileEditorProps) {
  const [formData, setFormData] = useState<UserProfile>(profile)
  const [newInterest, setNewInterest] = useState("")

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }))
      setNewInterest("")
    }
  }

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input 
              value={formData.name} 
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Age</label>
            <Input 
              value={formData.age} 
              onChange={(e) => handleInputChange('age', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Bio</label>
          <Textarea 
            value={formData.bio} 
            onChange={(e) => handleInputChange('bio', e.target.value)}
            className="min-h-[100px]"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Gender</label>
            <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Non-binary">Non-binary</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
                <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Sexual Orientation</label>
            <Select value={formData.orientation} onValueChange={(value) => handleInputChange('orientation', value)}>
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

        <div>
          <label className="text-sm font-medium">Location</label>
          <Input 
            value={formData.location} 
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="City, State"
          />
        </div>
      </div>

      {/* Professional Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Professional & Education</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Occupation</label>
            <Input 
              value={formData.occupation} 
              onChange={(e) => handleInputChange('occupation', e.target.value)}
              placeholder="Your job title"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Education</label>
            <Input 
              value={formData.education} 
              onChange={(e) => handleInputChange('education', e.target.value)}
              placeholder="Your education"
            />
          </div>
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interests</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {formData.interests.map((interest, index) => (
            <Badge key={index} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              {interest}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-2"
                onClick={() => removeInterest(interest)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="Add an interest"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
          />
          <Button type="button" onClick={addInterest} variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Lifestyle */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Lifestyle</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Height</label>
            <Input 
              value={formData.height} 
              onChange={(e) => handleInputChange('height', e.target.value)}
              placeholder='5&apos;6"'
            />
          </div>
          <div>
            <label className="text-sm font-medium">Fitness Level</label>
            <Select value={formData.fitness} onValueChange={(value) => handleInputChange('fitness', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Very active">Very active</SelectItem>
                <SelectItem value="Regularly active">Regularly active</SelectItem>
                <SelectItem value="Occasionally active">Occasionally active</SelectItem>
                <SelectItem value="Not very active">Not very active</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Pets</label>
            <Select value={formData.pets} onValueChange={(value) => handleInputChange('pets', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dog lover">Dog lover</SelectItem>
                <SelectItem value="Cat lover">Cat lover</SelectItem>
                <SelectItem value="Pet owner">Pet owner</SelectItem>
                <SelectItem value="No pets">No pets</SelectItem>
                <SelectItem value="Want pets">Want pets</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Match Preferences */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Match Preferences</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Age Range</label>
            <Input 
              value={formData.ageRange} 
              onChange={(e) => handleInputChange('ageRange', e.target.value)}
              placeholder="25-35"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Looking For</label>
            <Select value={formData.genderPreference} onValueChange={(value) => handleInputChange('genderPreference', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Men">Men</SelectItem>
                <SelectItem value="Women">Women</SelectItem>
                <SelectItem value="Non-binary">Non-binary</SelectItem>
                <SelectItem value="Any">Any</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Relationship Goal</label>
          <Select value={formData.relationshipGoal} onValueChange={(value) => handleInputChange('relationshipGoal', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Long-term relationship">Long-term relationship</SelectItem>
              <SelectItem value="Short-term dating">Short-term dating</SelectItem>
              <SelectItem value="Casual dating">Casual dating</SelectItem>
              <SelectItem value="Friendship">Friendship</SelectItem>
              <SelectItem value="Marriage">Marriage</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <Button type="submit" className="flex-1 bg-gradient-primary hover:opacity-90">
          Save Changes
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  )
}