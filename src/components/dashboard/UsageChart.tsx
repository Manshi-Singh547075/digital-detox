
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, TrendingUp, Clock, Smartphone } from 'lucide-react';

interface Profile {
  current_screen_time?: number | null;
  daily_screen_time_goal?: number | null;
  primary_goal?: string | null;
  role?: string | null;
  age?: number | null;
  device_usage?: string | null;
  app_preferences?: string | null;
  full_name?: string | null;
  username?: string | null;
}

interface UsageChartProps {
  period: string;
  onPeriodChange: (period: string) => void;
  profile: Profile | null;
}

const UsageChart = ({ period, onPeriodChange, profile }: UsageChartProps) => {
  // Generate dynamic data based on user profile
  const generateChartData = () => {
    const currentUsage = profile?.current_screen_time || 6;
    const goal = profile?.daily_screen_time_goal || 4;
    
    // Create realistic data around user's actual usage
    const baseData = [];
    for (let i = 6; i >= 0; i--) {
      const variance = Math.random() * 2 - 1; // -1 to +1 hours variance
      const usage = Math.max(1, currentUsage + variance);
      
      baseData.push({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        usage: Math.round(usage * 10) / 10,
        goal: goal,
        productive: profile?.primary_goal === 'productivity' ? Math.max(1, usage * 0.4) : Math.max(1, usage * 0.2),
        social: profile?.app_preferences === 'social' ? usage * 0.4 : usage * 0.2,
        entertainment: profile?.app_preferences === 'games' ? usage * 0.5 : usage * 0.3,
        work: profile?.role === 'professional' ? usage * 0.4 : usage * 0.1
      });
    }
    return baseData;
  };

  const data = generateChartData();
  const currentUsage = profile?.current_screen_time || 0;
  const goal = profile?.daily_screen_time_goal || 0;
  const progressPercentage = goal > 0 ? Math.min((goal / currentUsage) * 100, 100) : 0;

  const getStatusColor = () => {
    if (progressPercentage >= 80) return 'text-green-600';
    if (progressPercentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getStatusMessage = () => {
    if (progressPercentage >= 80) return 'Excellent progress!';
    if (progressPercentage >= 60) return 'Good progress';
    return 'Needs improvement';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Screen Time Overview
            </CardTitle>
            <CardDescription>
              Your digital usage patterns and goals
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {['week', 'month', 'year'].map((p) => (
              <Button
                key={p}
                variant={period === p ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPeriodChange(p)}
                className="capitalize"
              >
                {p}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Current Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{currentUsage}h</div>
            <p className="text-sm text-gray-600">Current Daily Average</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{goal}h</div>
            <p className="text-sm text-gray-600">Daily Goal</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className={`text-2xl font-bold ${getStatusColor()}`}>{Math.round(progressPercentage)}%</div>
            <p className="text-sm text-gray-600">{getStatusMessage()}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="usage" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Actual Usage"
              />
              <Line 
                type="monotone" 
                dataKey="goal" 
                stroke="#10B981" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Goal"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* App Categories */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Usage by Category</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.slice(-3)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="productive" fill="#10B981" name="Productive" />
                <Bar dataKey="social" fill="#3B82F6" name="Social" />
                <Bar dataKey="entertainment" fill="#F59E0B" name="Entertainment" />
                <Bar dataKey="work" fill="#8B5CF6" name="Work" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-4">
          <Badge variant={progressPercentage >= 80 ? "default" : "secondary"}>
            Goal {progressPercentage >= 80 ? "Achieved" : "In Progress"}
          </Badge>
          <Badge variant="outline">
            {profile?.role || "User"} • {profile?.primary_goal || "General"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageChart;
