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
import RealTimeAnalysis from '../components/dashboard/RealTimeAnalysis';
import SmartCharts from '../components/dashboard/SmartCharts';
import { Users, Activity, Brain, Shield, User, LogOut, Settings, Bell, Sparkles, Star, Zap, Moon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import SettingsModal from '../components/dashboard/SettingsModal';

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
  const [settingsOpen, setSettingsOpen] = useState(false);
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

  const handleSettingsClick = () => {
    setSettingsOpen(true);
  };

  const handleProfileUpdate = () => {
    fetchProfile(); // Refresh profile data after update
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

  // Determine which tabs to show based on user profile
  const getAvailableTabs = () => {
    const tabs = [
      { value: "overview", label: "Overview", icon: Activity },
      { value: "wellness", label: "Wellness", icon: Sparkles },
      { value: "insights", label: "AI Insights", icon: Brain }
    ];

    // Only show family tab if user has children or is a parent
    if (profile?.has_children || profile?.role === 'parent') {
      tabs.push({ value: "family", label: "Family", icon: Users });
    } else {
      // Show community tab for users without children
      tabs.push({ value: "community", label: "Community", icon: Users });
    }

    return tabs;
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Modern animated background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-black"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="text-center relative z-10">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 mx-auto mb-6 relative">
              <div className="absolute inset-2 bg-slate-900 rounded-full"></div>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-xl animate-pulse"></div>
          </div>
          <p className="text-white text-xl font-medium mb-2">Loading your personalized dashboard...</p>
          <p className="text-purple-300 text-sm">Preparing your digital wellness insights</p>
        </div>
      </div>
    );
  }

  const availableTabs = getAvailableTabs();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Modern Dark Theme Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-600/15 to-cyan-600/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400/60 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400/60 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-pink-400/60 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-60 left-2/3 w-1 h-1 bg-cyan-400/60 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Enhanced Modern Header */}
      <div className="bg-black/20 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-50 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-blue-600/10"></div>
        <div className="max-w-7xl mx-auto px-6 py-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 animate-slide-in-right">
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 rounded-2xl p-4 shadow-2xl relative animate-float">
                  <Shield className="w-10 h-10 text-white relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/50 to-blue-600/50 rounded-2xl blur-xl"></div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  DigitalDetox
                </h1>
                <p className="text-base text-gray-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                  AI-Powered Digital Wellness Platform
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 animate-slide-in-right" style={{ animationDelay: '200ms' }}>
              <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                onClick={handleSettingsClick}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="bg-white/5 border-white/20 text-white hover:bg-red-500/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Enhanced Welcome Section */}
        <div className="mb-10 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="animate-slide-in-right">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-3">
                {getGreeting()}, {profile?.full_name || user?.email?.split('@')[0]}! 👋
              </h1>
              <p className="text-gray-300 text-xl mb-4">{getPersonalizedMessage()}</p>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-400/30 backdrop-blur-sm">
                  <span className="text-green-300 font-medium flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    {getProgressMessage()}
                  </span>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-400/30 backdrop-blur-sm">
                  <span className="text-purple-300 font-medium flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    {profile?.role || 'Digital Wellness'} journey!
                  </span>
                </div>
              </div>
            </div>
            {profile && (
              <Card className="p-6 bg-black/30 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 animate-slide-in-right relative overflow-hidden" style={{ animationDelay: '300ms' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10"></div>
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-purple-500 via-blue-600 to-pink-600 rounded-2xl p-4 shadow-lg animate-float">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{profile.full_name}</p>
                    <p className="text-base text-gray-300">@{profile.username}</p>
                    <p className="text-sm text-purple-300 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {profile.role} • Age {profile.age}
                      {profile.has_children && " • Parent"}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Enhanced Modern Tabs */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full lg:w-auto grid-cols-2 lg:grid-cols-5 bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl p-2 animate-slide-in-right shadow-2xl" style={{ animationDelay: '400ms' }}>
            {availableTabs.map((tab) => (
              <TabsTrigger 
                key={tab.value}
                value={tab.value} 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white text-gray-300 hover:text-white transition-all duration-300 rounded-xl data-[state=active]:shadow-lg"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </TabsTrigger>
            ))}
            <TabsTrigger 
              value="analysis" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white text-gray-300 hover:text-white transition-all duration-300 rounded-xl data-[state=active]:shadow-lg"
            >
              <Brain className="w-4 h-4" />
              AI Analysis
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

          <TabsContent value="analysis">
            <div className="space-y-8">
              <RealTimeAnalysis profile={profile} />
              <SmartCharts profile={profile} />
            </div>
          </TabsContent>

          {profile?.has_children || profile?.role === 'parent' ? (
            <TabsContent value="family">
              <FamilyMonitoring />
            </TabsContent>
          ) : (
            <TabsContent value="community">
              <Card className="bg-black/30 backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Users className="w-5 h-5 text-purple-400" />
                    Community & Support
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Connect with others on their digital wellness journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-center py-12">
                    <div className="relative mb-6">
                      <Users className="w-16 h-16 text-purple-400 mx-auto animate-float" />
                      <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-xl"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Join the Digital Wellness Community
                    </h3>
                    <p className="text-gray-300 mb-6 max-w-md mx-auto">
                      Connect with like-minded individuals working towards healthier digital habits. 
                      Share experiences, get support, and celebrate milestones together.
                    </p>
                    <div className="space-y-3">
                      <Button className="w-full max-w-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                        <Users className="w-4 h-4 mr-2" />
                        Explore Community Features
                      </Button>
                      <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
                        <Moon className="w-4 h-4" />
                        Coming soon: Forums, challenges, and peer support groups
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>

      {/* Settings Modal */}
      <SettingsModal 
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        profile={profile}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
};

export default Dashboard;
