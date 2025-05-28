
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Heart, TrendingUp, Award } from 'lucide-react';

interface Profile {
  current_screen_time?: number | null;
  daily_screen_time_goal?: number | null;
  primary_goal?: string | null;
  role?: string | null;
  age?: number | null;
}

interface WellnessScoreProps {
  profile: Profile | null;
}

const WellnessScore = ({ profile }: WellnessScoreProps) => {
  // Calculate dynamic score based on user's goals and current usage
  const calculateScore = () => {
    if (!profile?.current_screen_time || !profile?.daily_screen_time_goal) {
      return 75; // Default score
    }
    
    const goalRatio = profile.daily_screen_time_goal / profile.current_screen_time;
    let baseScore = Math.min(goalRatio * 80, 100);
    
    // Bonus points based on primary goal alignment
    if (profile.primary_goal === 'reduce-usage' && goalRatio > 0.8) {
      baseScore += 10;
    } else if (profile.primary_goal === 'sleep-better') {
      baseScore += 5; // Assume some sleep improvement
    }
    
    return Math.min(Math.round(baseScore), 100);
  };

  const score = calculateScore();
  
  // Dynamic trend calculation
  const getTrend = () => {
    if (!profile?.current_screen_time || !profile?.daily_screen_time_goal) {
      return '+3';
    }
    
    const progress = (profile.daily_screen_time_goal / profile.current_screen_time) * 10;
    return `+${Math.round(progress)}`;
  };
  
  const trend = getTrend();
  
  // Dynamic factors based on user profile
  const getFactors = () => {
    const baseFactors = [
      { 
        name: 'Screen Time Balance', 
        score: profile?.current_screen_time && profile?.daily_screen_time_goal 
          ? Math.min((profile.daily_screen_time_goal / profile.current_screen_time) * 100, 100)
          : 75, 
        color: 'bg-blue-500' 
      },
      { 
        name: 'Sleep Schedule', 
        score: profile?.primary_goal === 'sleep-better' ? 92 : 80, 
        color: 'bg-green-500' 
      },
    ];

    // Add role-specific factors
    if (profile?.role === 'parent') {
      baseFactors.push({ 
        name: 'Family Balance', 
        score: profile?.primary_goal === 'family-time' ? 90 : 75, 
        color: 'bg-purple-500' 
      });
    } else if (profile?.role === 'professional') {
      baseFactors.push({ 
        name: 'Work-Life Balance', 
        score: profile?.primary_goal === 'better-balance' ? 85 : 70, 
        color: 'bg-orange-500' 
      });
    } else if (profile?.role === 'student') {
      baseFactors.push({ 
        name: 'Study Focus', 
        score: profile?.primary_goal === 'productivity' ? 88 : 72, 
        color: 'bg-indigo-500' 
      });
    } else {
      baseFactors.push({ 
        name: 'Digital Mindfulness', 
        score: profile?.primary_goal === 'mindfulness' ? 85 : 75, 
        color: 'bg-green-500' 
      });
    }

    baseFactors.push({ 
      name: 'Goal Progress', 
      score: score > 80 ? 90 : score > 60 ? 75 : 60, 
      color: 'bg-blue-500' 
    });

    return baseFactors;
  };

  const factors = getFactors();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const getAchievementMessage = () => {
    if (!profile) return "Building your digital wellness foundation";
    
    if (profile.primary_goal === 'reduce-usage') {
      return "Making progress on reducing screen time";
    } else if (profile.primary_goal === 'better-balance') {
      return "Improving work-life digital balance";
    } else if (profile.primary_goal === 'family-time') {
      return "Creating more quality family moments";
    } else if (profile.primary_goal === 'productivity') {
      return "Enhancing focus and productivity";
    } else if (profile.primary_goal === 'sleep-better') {
      return "Working towards better sleep habits";
    } else if (profile.primary_goal === 'mindfulness') {
      return "Developing mindful digital habits";
    }
    
    return "Building healthier digital habits";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          Wellness Score
        </CardTitle>
        <CardDescription>
          Your personalized digital health rating
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className={`text-6xl font-bold mb-2 bg-gradient-to-r ${getScoreBackground(score)} bg-clip-text text-transparent`}>
            {score}
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">{trend} this week</span>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 mb-3">Contributing Factors</h4>
          {factors.map((factor, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{factor.name}</span>
                <span className={`text-sm font-semibold ${getScoreColor(factor.score)}`}>
                  {Math.round(factor.score)}%
                </span>
              </div>
              <Progress value={factor.score} className="h-2" />
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Personal Goal</span>
          </div>
          <p className="text-sm text-blue-700">
            {getAchievementMessage()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WellnessScore;
