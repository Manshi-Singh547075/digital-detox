
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, Target, AlertTriangle, CheckCircle, Lightbulb, Calendar } from 'lucide-react';

interface Profile {
  current_screen_time?: number | null;
  daily_screen_time_goal?: number | null;
  primary_goal?: string | null;
  role?: string | null;
  age?: number | null;
  device_usage?: string | null;
  app_preferences?: string | null;
  has_children?: boolean | null;
  full_name?: string | null;
  username?: string | null;
}

interface AIInsightsProps {
  profile: Profile | null;
}

const AIInsights = ({ profile }: AIInsightsProps) => {
  // Generate personalized insights based on user profile
  const generateInsights = () => {
    if (!profile) {
      return {
        patterns: ["Complete your profile setup to get personalized insights"],
        predictions: ["AI analysis will be available once you provide your information"],
        recommendations: ["Set up your profile to receive tailored recommendations"]
      };
    }

    const currentUsage = profile.current_screen_time || 0;
    const goal = profile.daily_screen_time_goal || 0;
    const role = profile.role || 'user';
    const primaryGoal = profile.primary_goal || 'general';
    const age = profile.age || 25;

    const patterns = [];
    const predictions = [];
    const recommendations = [];

    // Usage patterns based on current vs goal
    if (currentUsage > goal && goal > 0) {
      patterns.push(`You're currently using ${currentUsage - goal} hours more than your goal each day`);
      patterns.push(`Your usage is ${Math.round(((currentUsage - goal) / goal) * 100)}% above your target`);
    } else if (goal > 0) {
      patterns.push(`You're ${goal - currentUsage} hours under your daily goal - great discipline!`);
    } else {
      patterns.push(`Current usage: ${currentUsage} hours daily`);
    }

    // Role-specific patterns
    if (role === 'student') {
      patterns.push("Students your age typically use devices 6-8 hours daily");
      patterns.push("Your usage pattern suggests focus on educational and social apps");
    } else if (role === 'professional') {
      patterns.push("Professionals typically have higher usage during weekdays");
      patterns.push("Work-related apps dominate your screen time during business hours");
    } else if (role === 'parent') {
      patterns.push("Parents often have fragmented usage patterns throughout the day");
      if (profile.has_children) {
        patterns.push("Family time goals are important for maintaining work-life balance");
      }
    }

    // Predictions based on goals
    if (primaryGoal === 'reduce-usage') {
      predictions.push("With consistent effort, you could reduce usage by 25% in 2 weeks");
      predictions.push("Setting app timers could save you 1-2 hours daily");
    } else if (primaryGoal === 'better-balance') {
      predictions.push("Improved scheduling could increase productivity by 30%");
      predictions.push("Work-life separation will improve significantly with boundaries");
    } else if (primaryGoal === 'sleep-better') {
      predictions.push("Reducing evening screen time by 1 hour improves sleep quality by 40%");
      predictions.push("Blue light reduction after 8 PM shows measurable results in 1 week");
    } else if (primaryGoal === 'productivity') {
      predictions.push("Focus modes during work hours could boost efficiency by 35%");
      predictions.push("Minimizing notifications increases deep work time by 2 hours daily");
    }

    // Age-specific recommendations
    if (age < 25) {
      recommendations.push("Young adults benefit from structured social media breaks");
      recommendations.push("Consider the 20-20-20 rule: every 20 minutes, look 20 feet away for 20 seconds");
    } else if (age > 35) {
      recommendations.push("Establish clear work-home digital boundaries");
      recommendations.push("Model healthy digital habits for family members");
    }

    // Goal-specific recommendations
    if (primaryGoal === 'family-time') {
      recommendations.push("Create device-free zones during meals and family activities");
      recommendations.push("Use shared screen time for educational or bonding activities");
    } else if (primaryGoal === 'mindfulness') {
      recommendations.push("Practice digital mindfulness with regular tech breaks");
      recommendations.push("Use meditation apps to replace mindless scrolling");
    }

    // Device-specific recommendations
    if (profile.device_usage === 'smartphone') {
      recommendations.push("Enable grayscale mode to reduce visual stimulation");
      recommendations.push("Move social apps off your home screen");
    } else if (profile.device_usage === 'laptop') {
      recommendations.push("Use website blockers during focused work sessions");
      recommendations.push("Set up separate user accounts for work and personal use");
    }

    return { patterns, predictions, recommendations };
  };

  const { patterns, predictions, recommendations } = generateInsights();

  const getGoalProgress = () => {
    if (!profile?.current_screen_time || !profile?.daily_screen_time_goal) return 0;
    return Math.min((profile.daily_screen_time_goal / profile.current_screen_time) * 100, 100);
  };

  const progress = getGoalProgress();

  const insights = [
    {
      title: "Usage Patterns",
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
      items: patterns,
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "AI Predictions",
      icon: <Brain className="w-5 h-5 text-purple-600" />,
      items: predictions,
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Smart Recommendations",
      icon: <Lightbulb className="w-5 h-5 text-orange-600" />,
      items: recommendations,
      color: "bg-orange-50 border-orange-200"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Goal Progress for {profile?.role || 'User'}
          </CardTitle>
          <CardDescription>
            Your journey towards {profile?.primary_goal?.replace('-', ' ') || 'better digital habits'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{Math.round(progress)}%</div>
              <p className="text-sm text-gray-600">Goal Achievement</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{profile?.current_screen_time || 0}h</div>
              <p className="text-sm text-gray-600">Current Usage</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{profile?.daily_screen_time_goal || 0}h</div>
              <p className="text-sm text-gray-600">Target Goal</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                {insight.icon}
                {insight.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {insight.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex} 
                    className={`p-3 rounded-lg border ${insight.color}`}
                  >
                    <p className="text-sm text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Personalized Action Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            Your Personalized Action Plan
          </CardTitle>
          <CardDescription>
            Tailored steps for {profile?.username || 'your'} {profile?.primary_goal?.replace('-', ' ') || 'digital wellness'} journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Week 1: Foundation</p>
                <p className="text-sm text-green-700">
                  {profile?.primary_goal === 'reduce-usage' 
                    ? 'Start with 30-minute daily reduction in entertainment apps'
                    : profile?.primary_goal === 'productivity'
                    ? 'Implement 25-minute focused work blocks with 5-minute breaks'
                    : 'Establish baseline tracking and identify usage triggers'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Target className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-800">Week 2-3: Optimization</p>
                <p className="text-sm text-blue-700">
                  {profile?.role === 'student'
                    ? 'Balance study apps with entertainment, set evening cut-off times'
                    : profile?.role === 'professional'
                    ? 'Separate work and personal device usage with clear boundaries'
                    : 'Refine your digital habits based on week 1 insights'
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <AlertTriangle className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-purple-800">Week 4+: Mastery</p>
                <p className="text-sm text-purple-700">
                  Maintain new habits, adjust goals based on progress, and explore advanced wellness features
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button size="sm">
              Start Action Plan
            </Button>
            <Button size="sm" variant="outline">
              Customize Plan
            </Button>
            <Badge variant="secondary" className="px-3 py-1">
              {profile?.role || 'User'} optimized
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsights;
