
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Shield, User, Target, Clock, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const ProfileSetup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    age: '',
    role: '',
    primaryGoal: '',
    dailyScreenTimeGoal: '',
    concerns: '',
    hasChildren: false,
    childrenAges: '',
    currentScreenTime: '',
    deviceUsage: '',
    appPreferences: ''
  });
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Pre-populate data if available from signup or existing profile
    const loadExistingProfile = async () => {
      if (user) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .maybeSingle();

          if (profile) {
            setFormData(prev => ({
              ...prev,
              fullName: profile.full_name || user.user_metadata?.full_name || '',
              username: profile.username || user.user_metadata?.username || '',
              age: profile.age?.toString() || '',
              role: profile.role || '',
              primaryGoal: profile.primary_goal || '',
              dailyScreenTimeGoal: profile.daily_screen_time_goal?.toString() || '',
              concerns: profile.concerns || '',
              hasChildren: profile.has_children || false,
              childrenAges: profile.children_ages || '',
              currentScreenTime: profile.current_screen_time?.toString() || '',
              deviceUsage: profile.device_usage || '',
              appPreferences: profile.app_preferences || ''
            }));
          } else if (user?.user_metadata) {
            setFormData(prev => ({
              ...prev,
              fullName: user.user_metadata.full_name || '',
              username: user.user_metadata.username || ''
            }));
          }
        } catch (error) {
          console.error('Error loading profile:', error);
        }
      }
    };

    loadExistingProfile();
  }, [user]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.username && formData.age && formData.role;
      case 2:
        return formData.primaryGoal && formData.dailyScreenTimeGoal;
      case 3:
        return formData.currentScreenTime && formData.deviceUsage;
      case 4:
        return true; // Optional step
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Starting comprehensive profile setup for user:', user?.id);
      
      // Save comprehensive profile data
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          full_name: formData.fullName,
          username: formData.username,
          age: parseInt(formData.age),
          role: formData.role,
          primary_goal: formData.primaryGoal,
          daily_screen_time_goal: parseInt(formData.dailyScreenTimeGoal),
          concerns: formData.concerns,
          has_children: formData.hasChildren,
          children_ages: formData.childrenAges,
          current_screen_time: parseInt(formData.currentScreenTime),
          device_usage: formData.deviceUsage,
          app_preferences: formData.appPreferences,
          onboarding_completed: true,
          updated_at: new Date().toISOString()
        });

      if (profileError) {
        console.error('Profile update error:', profileError);
        throw profileError;
      }

      console.log('Comprehensive profile saved successfully');

      toast({
        title: "🎉 Welcome to DigitalDetox!",
        description: "Your personalized wellness dashboard is ready. Let's start your digital wellness journey!",
      });

      // Force a small delay to ensure the database update is processed
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1000);

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

  const steps = [
    { number: 1, title: "Basic Info", icon: User },
    { number: 2, title: "Your Goals", icon: Target },
    { number: 3, title: "Digital Habits", icon: Clock },
    { number: 4, title: "Preferences", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-green-500 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-3">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">DigitalDetox</h1>
              <p className="text-blue-200">AI-Powered Digital Wellness Platform</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                  currentStep >= step.number 
                    ? 'bg-white text-blue-600 border-white' 
                    : 'bg-white/20 text-white border-white/40'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <span className={`ml-2 font-medium ${
                  currentStep >= step.number ? 'text-white' : 'text-white/70'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-white/50 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl">
              Step {currentStep} of 4: {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription className="text-blue-200 text-center text-lg">
              {currentStep === 1 && "Let's start with some basic information about you"}
              {currentStep === 2 && "What are your digital wellness goals?"}
              {currentStep === 3 && "Tell us about your current digital habits"}
              {currentStep === 4 && "Final preferences and family information"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-white text-lg">Full Name *</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/70 h-12 text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-white text-lg">Username *</Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="johndoe"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        required
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/70 h-12 text-lg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-white text-lg">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="25"
                        min="13"
                        max="100"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        required
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/70 h-12 text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-white text-lg">I am a... *</Label>
                      <Select onValueChange={(value) => handleInputChange('role', value)} value={formData.role} required>
                        <SelectTrigger className="bg-white/10 border-white/30 text-white h-12 text-lg">
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
              )}

              {/* Step 2: Goals */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label htmlFor="primaryGoal" className="text-white text-lg">Primary Digital Wellness Goal *</Label>
                    <Select onValueChange={(value) => handleInputChange('primaryGoal', value)} value={formData.primaryGoal} required>
                      <SelectTrigger className="bg-white/10 border-white/30 text-white h-12 text-lg">
                        <SelectValue placeholder="What's your main goal?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reduce-usage">🎯 Reduce overall screen time</SelectItem>
                        <SelectItem value="better-balance">⚖️ Better work-life balance</SelectItem>
                        <SelectItem value="family-time">👨‍👩‍👧‍👦 More quality family time</SelectItem>
                        <SelectItem value="productivity">🚀 Increase productivity</SelectItem>
                        <SelectItem value="sleep-better">😴 Improve sleep quality</SelectItem>
                        <SelectItem value="mindfulness">🧘 Be more mindful of usage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="dailyGoal" className="text-white text-lg">Daily Screen Time Goal (hours) *</Label>
                    <Input
                      id="dailyGoal"
                      type="number"
                      placeholder="4"
                      min="1"
                      max="16"
                      value={formData.dailyScreenTimeGoal}
                      onChange={(e) => handleInputChange('dailyScreenTimeGoal', e.target.value)}
                      required
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/70 h-12 text-lg"
                    />
                    <p className="text-blue-200 text-sm">The average person spends 7+ hours on screens daily</p>
                  </div>
                </div>
              )}

              {/* Step 3: Digital Habits */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label htmlFor="currentScreenTime" className="text-white text-lg">Current Daily Screen Time (hours) *</Label>
                    <Input
                      id="currentScreenTime"
                      type="number"
                      placeholder="8"
                      min="1"
                      max="24"
                      value={formData.currentScreenTime}
                      onChange={(e) => handleInputChange('currentScreenTime', e.target.value)}
                      required
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/70 h-12 text-lg"
                    />
                    <p className="text-blue-200 text-sm">Be honest - this helps us create better recommendations</p>
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="deviceUsage" className="text-white text-lg">Primary Device Usage *</Label>
                    <Select onValueChange={(value) => handleInputChange('deviceUsage', value)} value={formData.deviceUsage} required>
                      <SelectTrigger className="bg-white/10 border-white/30 text-white h-12 text-lg">
                        <SelectValue placeholder="Select your primary device" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="smartphone">📱 Smartphone (Mobile-first)</SelectItem>
                        <SelectItem value="laptop">💻 Laptop/Computer</SelectItem>
                        <SelectItem value="tablet">📱 Tablet</SelectItem>
                        <SelectItem value="multiple">🔄 Multiple devices equally</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="appPreferences" className="text-white text-lg">Most Used App Categories</Label>
                    <Textarea
                      id="appPreferences"
                      placeholder="e.g., Social media, streaming, productivity, games..."
                      value={formData.appPreferences}
                      onChange={(e) => handleInputChange('appPreferences', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/70 min-h-[80px] text-lg"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Preferences & Family */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-white text-lg">Do you have children?</Label>
                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant={formData.hasChildren ? "default" : "outline"}
                        onClick={() => handleInputChange('hasChildren', true)}
                        className={`h-12 px-8 text-lg ${formData.hasChildren ? "bg-white text-blue-700" : "bg-white/10 text-white border-white/30 hover:bg-white/20"}`}
                      >
                        Yes
                      </Button>
                      <Button
                        type="button"
                        variant={!formData.hasChildren ? "default" : "outline"}
                        onClick={() => handleInputChange('hasChildren', false)}
                        className={`h-12 px-8 text-lg ${!formData.hasChildren ? "bg-white text-blue-700" : "bg-white/10 text-white border-white/30 hover:bg-white/20"}`}
                      >
                        No
                      </Button>
                    </div>
                  </div>
                  {formData.hasChildren && (
                    <div className="space-y-2">
                      <Label htmlFor="childrenAges" className="text-white text-lg">Children's Ages</Label>
                      <Input
                        id="childrenAges"
                        type="text"
                        placeholder="e.g., 8, 12, 15"
                        value={formData.childrenAges}
                        onChange={(e) => handleInputChange('childrenAges', e.target.value)}
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/70 h-12 text-lg"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="concerns" className="text-white text-lg">Any specific concerns or challenges? (Optional)</Label>
                    <Textarea
                      id="concerns"
                      placeholder="Tell us about your digital wellness challenges..."
                      value={formData.concerns}
                      onChange={(e) => handleInputChange('concerns', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/70 min-h-[100px] text-lg"
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20 h-12 px-8 text-lg"
                  >
                    Back
                  </Button>
                )}
                
                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!validateStep()}
                    className="bg-white text-blue-700 hover:bg-blue-50 font-semibold h-12 px-8 text-lg ml-auto"
                  >
                    Next Step
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 font-semibold h-12 px-8 text-lg ml-auto"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Your Dashboard...' : '🚀 Launch My Dashboard'}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;
