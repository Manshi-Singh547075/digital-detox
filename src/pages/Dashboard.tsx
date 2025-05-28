
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import UsageChart from '../components/dashboard/UsageChart';
import AIInsights from '../components/dashboard/AIInsights';
import EnhancedAppBreakdown from '../components/dashboard/EnhancedAppBreakdown';
import DigitalWellnessInsights from '../components/dashboard/DigitalWellnessInsights';
import FamilyMonitoring from '../components/dashboard/FamilyMonitoring';
import WellnessScore from '../components/dashboard/WellnessScore';
import { Users, Activity, Brain, Shield, User, LogOut, Settings, Bell, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  age: number | null;
  role: string | null;
  primary_goal: string | null;
  daily_screen_time_goal: number | null;
  current_screen_time: number | null;
  device_usage: string | null;
  app_preferences: string | null;
  concerns: string | null;
  has_children: boolean | null;
  children_ages: string | null;
  created_at: string;
}

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setProfileLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
        console.log('Fetched profile data:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getPersonalizedMessage = () => {
    if (!profile) return "Ready to build healthier digital habits today?";
    
    if (profile.primary_goal === 'reduce-usage') {
      return "Let's work on reducing your screen time today!";
    } else if (profile.primary_goal === 'better-balance') {
      return "Time to create that perfect work-life balance!";
    } else if (profile.primary_goal === 'family-time') {
      return "Ready for more quality family moments?";
    } else if (profile.primary_goal === 'productivity') {
      return "Let's boost your productivity today!";
    } else if (profile.primary_goal === 'sleep-better') {
      return "Working towards better sleep quality!";
    } else if (profile.primary_goal === 'mindfulness') {
      return "Being mindful of your digital habits today!";
    }
    return "Ready to build healthier digital habits today?";
  };

  const getProgressMessage = () => {
    if (!profile?.current_screen_time || !profile?.daily_screen_time_goal) {
      return "Setting up your wellness journey";
    }
    
    const progress = (profile.daily_screen_time_goal / profile.current_screen_time) * 100;
    if (progress >= 80) {
      return "🎯 Excellent progress on your goals";
    } else if (progress >= 60) {
      return "🎯 Good progress on your goals";
    } else {
      return "🎯 Building towards your goals";
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">Loading your personalized dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 animate-fade-in">
      {/* Enhanced Animated Header */}
      <div className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 animate-slide-in-right">
              <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-4 shadow-2xl animate-float">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  DigitalDetox
                </h1>
                <p className="text-base text-gray-600 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
                  AI-Powered Digital Wellness Platform
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 animate-slide-in-right" style={{ animationDelay: '200ms' }}>
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="hover:scale-105 transition-transform duration-200">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Personalized Welcome Section */}
        <div className="mb-10 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="animate-slide-in-right">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                {getGreeting()}, {profile?.full_name || user?.email?.split('@')[0]}! 👋
              </h1>
              <p className="text-gray-600 text-xl mb-4">{getPersonalizedMessage()}</p>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border border-green-200">
                  <span className="text-green-700 font-medium">{getProgressMessage()}</span>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200">
                  <span className="text-blue-700 font-medium">✨ {profile?.role || 'Digital Wellness'} journey!</span>
                </div>
              </div>
            </div>
            {profile && (
              <Card className="p-6 bg-gradient-to-br from-white via-blue-50 to-purple-50 border-2 border-gradient-to-r from-blue-200 to-purple-200 shadow-2xl hover:shadow-3xl transition-all duration-300 animate-slide-in-right" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-2xl p-4 shadow-lg animate-float">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{profile.full_name}</p>
                    <p className="text-base text-gray-600">@{profile.username}</p>
                    <p className="text-sm text-purple-600 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {profile.role} • Age {profile.age}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Enhanced Animated Tabs */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full lg:w-auto grid-cols-2 lg:grid-cols-4 bg-white/80 backdrop-blur-xl shadow-2xl border-2 border-gray-200/50 rounded-2xl p-2 animate-slide-in-right" style={{ animationDelay: '400ms' }}>
            <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 rounded-xl">
              <Activity className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="wellness" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white transition-all duration-300 rounded-xl">
              <Sparkles className="w-4 h-4" />
              Wellness
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all duration-300 rounded-xl">
              <Brain className="w-4 h-4" />
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="family" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white transition-all duration-300 rounded-xl">
              <Users className="w-4 h-4" />
              {profile?.has_children ? 'Family' : 'Community'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <WellnessScore profile={profile} />
              </div>
              <div className="lg:col-span-3">
                <UsageChart period={selectedPeriod} onPeriodChange={setSelectedPeriod} profile={profile} />
              </div>
            </div>
            <EnhancedAppBreakdown profile={profile} />
          </TabsContent>

          <TabsContent value="wellness">
            <DigitalWellnessInsights profile={profile} />
          </TabsContent>

          <TabsContent value="insights">
            <AIInsights profile={profile} />
          </TabsContent>

          <TabsContent value="family">
            <FamilyMonitoring profile={profile} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
