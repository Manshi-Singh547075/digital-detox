
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Shield, User, Target, Clock, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const ProfileSetup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    age: '',
    role: '',
    primaryGoal: '',
    dailyScreenTimeGoal: '',
    concerns: '',
    hasChildren: false,
    childrenAges: ''
  });
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Update the user's profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          username: formData.username,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (profileError) {
        throw profileError;
      }

      // Store additional profile data (you might want to create a separate table for this)
      const profileData = {
        user_id: user?.id,
        age: parseInt(formData.age),
        role: formData.role,
        primary_goal: formData.primaryGoal,
        daily_screen_time_goal: parseInt(formData.dailyScreenTimeGoal),
        concerns: formData.concerns,
        has_children: formData.hasChildren,
        children_ages: formData.childrenAges,
        onboarding_completed: true,
        created_at: new Date().toISOString()
      };

      console.log('Profile setup data:', profileData);

      toast({
        title: "Profile setup complete!",
        description: "Welcome to DigitalDetox! Your personalized dashboard is ready.",
      });

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Profile setup error:', error);
      toast({
        title: "Setup failed",
        description: error.message || "Failed to complete profile setup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-green-500 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-3">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">DigitalDetox</h1>
              <p className="text-blue-200">Let's personalize your experience</p>
            </div>
          </div>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-center flex items-center justify-center gap-2">
              <User className="w-5 h-5" />
              Complete Your Profile
            </CardTitle>
            <CardDescription className="text-blue-200 text-center">
              Help us create a personalized digital wellness journey for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/70"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="johndoe"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      required
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/70"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-white">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      min="13"
                      max="100"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      required
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/70"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-white">I am a...</Label>
                    <Select onValueChange={(value) => handleInputChange('role', value)} required>
                      <SelectTrigger className="bg-white/10 border-white/30 text-white">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="professional">Working Professional</SelectItem>
                        <SelectItem value="educator">Educator</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Goals and Preferences */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Your Goals
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="primaryGoal" className="text-white">Primary Goal</Label>
                  <Select onValueChange={(value) => handleInputChange('primaryGoal', value)} required>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="What's your main goal?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reduce-usage">Reduce overall screen time</SelectItem>
                      <SelectItem value="better-balance">Better work-life balance</SelectItem>
                      <SelectItem value="family-time">More quality family time</SelectItem>
                      <SelectItem value="productivity">Increase productivity</SelectItem>
                      <SelectItem value="sleep-better">Improve sleep quality</SelectItem>
                      <SelectItem value="mindfulness">Be more mindful of usage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dailyGoal" className="text-white">Daily Screen Time Goal (hours)</Label>
                  <Input
                    id="dailyGoal"
                    type="number"
                    placeholder="4"
                    min="1"
                    max="16"
                    value={formData.dailyScreenTimeGoal}
                    onChange={(e) => handleInputChange('dailyScreenTimeGoal', e.target.value)}
                    required
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/70"
                  />
                </div>
              </div>

              {/* Family Information */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Family Information
                </h3>
                <div className="space-y-2">
                  <Label className="text-white">Do you have children?</Label>
                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant={formData.hasChildren ? "default" : "outline"}
                      onClick={() => handleInputChange('hasChildren', true)}
                      className={formData.hasChildren ? "bg-white text-blue-700" : "bg-white/10 text-white border-white/30"}
                    >
                      Yes
                    </Button>
                    <Button
                      type="button"
                      variant={!formData.hasChildren ? "default" : "outline"}
                      onClick={() => handleInputChange('hasChildren', false)}
                      className={!formData.hasChildren ? "bg-white text-blue-700" : "bg-white/10 text-white border-white/30"}
                    >
                      No
                    </Button>
                  </div>
                </div>
                {formData.hasChildren && (
                  <div className="space-y-2">
                    <Label htmlFor="childrenAges" className="text-white">Children's Ages</Label>
                    <Input
                      id="childrenAges"
                      type="text"
                      placeholder="e.g., 8, 12, 15"
                      value={formData.childrenAges}
                      onChange={(e) => handleInputChange('childrenAges', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/70"
                    />
                  </div>
                )}
              </div>

              {/* Concerns */}
              <div className="space-y-2">
                <Label htmlFor="concerns" className="text-white">Any specific concerns or challenges? (Optional)</Label>
                <Textarea
                  id="concerns"
                  placeholder="Tell us about your digital wellness challenges..."
                  value={formData.concerns}
                  onChange={(e) => handleInputChange('concerns', e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/70 min-h-[80px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-blue-700 hover:bg-blue-50 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? 'Setting up your profile...' : 'Complete Setup & Continue'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;
