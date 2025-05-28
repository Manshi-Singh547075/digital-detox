
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, TrendingUp, TrendingDown, Clock, Shield, Target, Zap, Moon, Sun, Coffee } from 'lucide-react';

interface Profile {
  current_screen_time?: number | null;
  daily_screen_time_goal?: number | null;
  primary_goal?: string | null;
  role?: string | null;
  age?: number | null;
  device_usage?: string | null;
  app_preferences?: string | null;
}

interface DigitalWellnessInsightsProps {
  profile: Profile | null;
}

const DigitalWellnessInsights = ({ profile }: DigitalWellnessInsightsProps) => {
  // Calculate dynamic wellness score
  const calculateWellnessScore = () => {
    if (!profile?.current_screen_time || !profile?.daily_screen_time_goal) {
      return 75;
    }
    
    const goalRatio = profile.daily_screen_time_goal / profile.current_screen_time;
    let score = Math.min(goalRatio * 80, 100);
    
    // Age-based adjustments
    if (profile.age && profile.age < 25) {
      score += 5; // Younger users often adapt better
    } else if (profile.age && profile.age > 50) {
      score += 10; // Recognition for effort at older age
    }
    
    return Math.min(Math.round(score), 100);
  };

  const wellnessScore = calculateWellnessScore();

  // Dynamic insights based on profile
  const getPersonalizedInsights = () => {
    const currentUsage = profile?.current_screen_time || 7;
    const goalUsage = profile?.daily_screen_time_goal || 5;
    const progressRatio = goalUsage / currentUsage;

    const baseInsights = [
      {
        title: "Screen Time Balance",
        score: Math.min(progressRatio * 100, 100),
        trend: progressRatio > 0.8 ? "up" : "down",
        change: progressRatio > 0.8 ? "+12%" : "-5%",
        description: progressRatio > 0.8 
          ? "Excellent! You're meeting your screen time goals" 
          : "Consider reducing evening screen time",
        icon: Clock,
        color: progressRatio > 0.8 ? "from-green-500 to-green-600" : "from-orange-500 to-orange-600"
      }
    ];

    // Add role-specific insights
    if (profile?.role === 'parent') {
      baseInsights.push({
        title: "Family Time Balance",
        score: profile.primary_goal === 'family-time' ? 85 : 70,
        trend: "up",
        change: "+8%",
        description: "Great progress on family screen time balance",
        icon: Target,
        color: "from-purple-500 to-purple-600"
      });
    } else if (profile?.role === 'professional') {
      baseInsights.push({
        title: "Work-Life Balance",
        score: profile.primary_goal === 'better-balance' ? 80 : 65,
        trend: profile.primary_goal === 'better-balance' ? "up" : "down",
        change: profile.primary_goal === 'better-balance' ? "+15%" : "-3%",
        description: "Managing professional screen demands well",
        icon: Target,
        color: "from-blue-500 to-blue-600"
      });
    } else if (profile?.role === 'student') {
      baseInsights.push({
        title: "Study Focus",
        score: profile.primary_goal === 'productivity' ? 88 : 72,
        trend: "up",
        change: "+10%",
        description: "Improving focus during study sessions",
        icon: Zap,
        color: "from-indigo-500 to-indigo-600"
      });
    }

    // Sleep quality insight
    baseInsights.push({
      title: "Sleep Quality",
      score: profile?.primary_goal === 'sleep-better' ? 95 : 85,
      trend: "up",
      change: profile?.primary_goal === 'sleep-better' ? "+15%" : "+8%",
      description: profile?.primary_goal === 'sleep-better' 
        ? "Excellent! Night mode and bedtime routine helping" 
        : "Good progress with evening screen limits",
      icon: Moon,
      color: "from-purple-500 to-purple-600"
    });

    // Device-specific insight
    if (profile?.device_usage === 'smartphone') {
      baseInsights.push({
        title: "Mobile Mindfulness",
        score: 78,
        trend: "up",
        change: "+12%",
        description: "Great improvement in mindful phone usage",
        icon: Zap,
        color: "from-green-500 to-green-600"
      });
    } else if (profile?.device_usage === 'laptop') {
      baseInsights.push({
        title: "Desktop Focus",
        score: 82,
        trend: "up",
        change: "+10%",
        description: "Excellent focus during computer work",
        icon: Zap,
        color: "from-blue-500 to-blue-600"
      });
    }

    return baseInsights.slice(0, 4); // Return top 4 insights
  };

  const insights = getPersonalizedInsights();

  // Dynamic daily goals based on profile
  const getPersonalizedGoals = () => {
    const currentUsage = profile?.current_screen_time || 7;
    const goalUsage = profile?.daily_screen_time_goal || 5;

    const baseGoals = [
      { 
        label: "Screen Time Goal", 
        current: currentUsage, 
        target: goalUsage, 
        unit: "hours", 
        progress: Math.min((goalUsage / currentUsage) * 100, 100) 
      }
    ];

    // Add role-specific goals
    if (profile?.role === 'parent') {
      baseGoals.push(
        { label: "Family Time", current: 2.5, target: 3, unit: "hours", progress: 83 },
        { label: "Outdoor Activity", current: 45, target: 60, unit: "minutes", progress: 75 }
      );
    } else if (profile?.role === 'professional') {
      baseGoals.push(
        { label: "Work Break Frequency", current: 6, target: 8, unit: "breaks", progress: 75 },
        { label: "Exercise Time", current: 30, target: 45, unit: "minutes", progress: 67 }
      );
    } else if (profile?.role === 'student') {
      baseGoals.push(
        { label: "Study Focus Sessions", current: 4, target: 5, unit: "sessions", progress: 80 },
        { label: "Reading Time", current: 35, target: 45, unit: "minutes", progress: 78 }
      );
    } else {
      baseGoals.push(
        { label: "Mindful Breaks", current: 8, target: 10, unit: "breaks", progress: 80 },
        { label: "Reading Time", current: 25, target: 30, unit: "minutes", progress: 83 }
      );
    }

    // Add goal-specific targets
    if (profile?.primary_goal === 'sleep-better') {
      baseGoals.push({ label: "Sleep Quality Score", current: 85, target: 90, unit: "points", progress: 94 });
    } else if (profile?.primary_goal === 'productivity') {
      baseGoals.push({ label: "Focus Score", current: 78, target: 85, unit: "points", progress: 92 });
    }

    return baseGoals.slice(0, 4); // Return top 4 goals
  };

  const dailyGoals = getPersonalizedGoals();

  return (
    <div className="space-y-8">
      {/* Digital Wellness Score */}
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-emerald-50 to-teal-50 animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            Personal Digital Wellness Score
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Your personalized digital health rating based on your {profile?.role || 'personal'} goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-8">
            <div className="text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2 animate-bounce-slow">
                {wellnessScore}
              </div>
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">
                  +{Math.round(wellnessScore * 0.06)} from yesterday
                </span>
              </div>
            </div>
            <div className="flex-1 ml-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {wellnessScore >= 80 ? 'Excellent' : wellnessScore >= 60 ? 'Good' : 'Improving'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {wellnessScore >= 80 ? '80-100' : wellnessScore >= 60 ? '60-79' : '40-59'}
                  </span>
                </div>
                <Progress value={wellnessScore} className="h-4" />
                <p className="text-sm text-gray-600">
                  {profile?.primary_goal === 'reduce-usage' && "Great job working towards your screen time reduction goal!"}
                  {profile?.primary_goal === 'better-balance' && "Excellent progress on work-life balance!"}
                  {profile?.primary_goal === 'family-time' && "Wonderful improvement in family time quality!"}
                  {profile?.primary_goal === 'productivity' && "Outstanding focus and productivity gains!"}
                  {profile?.primary_goal === 'sleep-better' && "Amazing progress on sleep quality!"}
                  {profile?.primary_goal === 'mindfulness' && "Beautiful development of mindful habits!"}
                  {!profile?.primary_goal && "Keep up the balanced digital habits!"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Wellness Insights Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <Card key={index} className="shadow-xl border-0 bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-in-right" style={{ animationDelay: `${index * 150}ms` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${insight.color} rounded-xl shadow-lg`}>
                  <insight.icon className="w-6 h-6 text-white" />
                </div>
                <Badge variant={insight.trend === 'up' ? 'default' : 'secondary'} className="animate-pulse">
                  {insight.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {insight.change}
                </Badge>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{insight.title}</h3>
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-2xl font-bold text-gray-900">{Math.round(insight.score)}</span>
                  <span className="text-sm text-gray-500">/ 100</span>
                </div>
                <Progress value={insight.score} className="h-2" />
              </div>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Personalized Daily Goals */}
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-indigo-50 to-purple-50 animate-fade-in" style={{ animationDelay: '600ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg animate-float">
              <Target className="w-6 h-6 text-white" />
            </div>
            Your Personal Goals Progress
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Tailored objectives for your {profile?.role || 'digital wellness'} journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {dailyGoals.map((goal, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 animate-slide-in-right" style={{ animationDelay: `${(index + 4) * 100}ms` }}>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-900">{goal.label}</h4>
                  <span className="text-sm text-gray-500">{Math.round(goal.progress)}%</span>
                </div>
                <div className="mb-3">
                  <Progress value={goal.progress} className="h-3" />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                  <Badge variant="outline" className="animate-pulse">
                    {goal.target - goal.current} {goal.unit} to go
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalWellnessInsights;
