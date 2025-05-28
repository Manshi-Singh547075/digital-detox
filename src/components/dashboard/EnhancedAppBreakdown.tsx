
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Smartphone, Clock, TrendingUp, AlertTriangle, Settings } from 'lucide-react';

interface Profile {
  current_screen_time?: number | null;
  daily_screen_time_goal?: number | null;
  primary_goal?: string | null;
  role?: string | null;
  age?: number | null;
  device_usage?: string | null;
  app_preferences?: string | null;
}

interface EnhancedAppBreakdownProps {
  profile: Profile | null;
}

const EnhancedAppBreakdown = ({ profile }: EnhancedAppBreakdownProps) => {
  // Generate dynamic app data based on user profile
  const generateAppData = () => {
    const currentUsage = profile?.current_screen_time || 6;
    const preferences = profile?.app_preferences || 'general';
    const role = profile?.role || 'user';

    let apps = [];

    // Base apps for everyone
    if (preferences === 'social' || role === 'student') {
      apps.push(
        { name: 'Instagram', time: Math.round(currentUsage * 0.25 * 60), category: 'Social', color: 'bg-pink-500', trend: '+5' },
        { name: 'WhatsApp', time: Math.round(currentUsage * 0.15 * 60), category: 'Communication', color: 'bg-green-500', trend: '+2' },
        { name: 'TikTok', time: Math.round(currentUsage * 0.2 * 60), category: 'Entertainment', color: 'bg-purple-500', trend: '+8' }
      );
    }

    if (preferences === 'games') {
      apps.push(
        { name: 'Gaming Apps', time: Math.round(currentUsage * 0.4 * 60), category: 'Games', color: 'bg-red-500', trend: '+12' },
        { name: 'Steam', time: Math.round(currentUsage * 0.25 * 60), category: 'Games', color: 'bg-blue-600', trend: '+15' }
      );
    }

    if (role === 'professional') {
      apps.push(
        { name: 'Slack', time: Math.round(currentUsage * 0.2 * 60), category: 'Work', color: 'bg-purple-600', trend: '+3' },
        { name: 'Email', time: Math.round(currentUsage * 0.15 * 60), category: 'Work', color: 'bg-blue-500', trend: '+1' },
        { name: 'Microsoft Teams', time: Math.round(currentUsage * 0.1 * 60), category: 'Work', color: 'bg-indigo-500', trend: '+2' }
      );
    }

    if (role === 'student') {
      apps.push(
        { name: 'YouTube', time: Math.round(currentUsage * 0.3 * 60), category: 'Education', color: 'bg-red-600', trend: '+10' },
        { name: 'Khan Academy', time: Math.round(currentUsage * 0.1 * 60), category: 'Education', color: 'bg-green-600', trend: '+1' }
      );
    }

    if (role === 'parent') {
      apps.push(
        { name: 'Family Apps', time: Math.round(currentUsage * 0.2 * 60), category: 'Family', color: 'bg-orange-500', trend: '+4' },
        { name: 'Photo Gallery', time: Math.round(currentUsage * 0.15 * 60), category: 'Family', color: 'bg-yellow-500', trend: '+2' }
      );
    }

    // Always add some general apps
    apps.push(
      { name: 'Chrome Browser', time: Math.round(currentUsage * 0.15 * 60), category: 'Productivity', color: 'bg-gray-500', trend: '+3' },
      { name: 'Settings', time: Math.round(currentUsage * 0.05 * 60), category: 'System', color: 'bg-gray-400', trend: '0' }
    );

    return apps.slice(0, 6); // Limit to 6 apps
  };

  const apps = generateAppData();
  const totalTime = apps.reduce((sum, app) => sum + app.time, 0);

  const getRecommendation = () => {
    if (!profile) return "Complete your profile setup for personalized recommendations";
    
    const goal = profile.primary_goal;
    if (goal === 'reduce-usage') {
      return "Consider setting app timers for your most-used entertainment apps";
    } else if (goal === 'productivity') {
      return "Try using focus modes during work hours to minimize distractions";
    } else if (goal === 'better-balance') {
      return "Schedule specific times for social media to maintain work-life balance";
    } else if (goal === 'family-time') {
      return "Create device-free zones during family meals and activities";
    } else if (goal === 'sleep-better') {
      return "Enable night mode and reduce screen time 1 hour before bedtime";
    }
    return "Set daily limits for your most time-consuming apps";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-blue-600" />
          App Usage Breakdown
        </CardTitle>
        <CardDescription>
          Detailed breakdown of your {profile?.device_usage || 'device'} usage by application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Apps List */}
          <div className="space-y-4">
            {apps.map((app, index) => {
              const percentage = totalTime > 0 ? (app.time / totalTime) * 100 : 0;
              const hours = Math.floor(app.time / 60);
              const minutes = app.time % 60;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${app.color}`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{app.name}</p>
                        <p className="text-sm text-gray-500">{app.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {hours > 0 ? `${hours}h ` : ''}{minutes}m
                      </p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-green-600">{app.trend} min</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>

          {/* Category Summary */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Most Used Category</p>
              <p className="font-semibold text-gray-900">
                {apps[0]?.category || 'Entertainment'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Screen Time</p>
              <p className="font-semibold text-gray-900">
                {Math.floor(totalTime / 60)}h {totalTime % 60}m
              </p>
            </div>
          </div>

          {/* Personalized Recommendation */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800 mb-1">
                  Recommendation for {profile?.role || 'you'}
                </p>
                <p className="text-sm text-blue-700">
                  {getRecommendation()}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Set App Limits
            </Button>
            <Button size="sm" variant="outline">
              View Detailed Stats
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedAppBreakdown;
