
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, TrendingUp, TrendingDown, Clock, Shield, Target, Zap, Moon, Sun, Coffee } from 'lucide-react';

const DigitalWellnessInsights = () => {
  const insights = [
    {
      title: "Screen Time Balance",
      score: 75,
      trend: "up",
      change: "+12%",
      description: "Good progress on reducing evening screen time",
      icon: Clock,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "App Diversity",
      score: 68,
      trend: "down", 
      change: "-5%",
      description: "Consider exploring productivity apps",
      icon: Target,
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Sleep Quality",
      score: 92,
      trend: "up",
      change: "+8%",
      description: "Excellent! Night mode is helping",
      icon: Moon,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Focus Sessions",
      score: 85,
      trend: "up",
      change: "+15%",
      description: "Great improvement in focus time",
      icon: Zap,
      color: "from-green-500 to-green-600"
    }
  ];

  const dailyGoals = [
    { label: "Screen Time Goal", current: 4.2, target: 5, unit: "hours", progress: 84 },
    { label: "Break Frequency", current: 8, target: 10, unit: "breaks", progress: 80 },
    { label: "Exercise Time", current: 45, target: 60, unit: "minutes", progress: 75 },
    { label: "Reading Time", current: 25, target: 30, unit: "minutes", progress: 83 }
  ];

  return (
    <div className="space-y-8">
      {/* Digital Wellness Score */}
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-emerald-50 to-teal-50 animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            Digital Wellness Score
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Your overall digital health rating today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-8">
            <div className="text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2 animate-bounce-slow">
                82
              </div>
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">+5 from yesterday</span>
              </div>
            </div>
            <div className="flex-1 ml-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Excellent</span>
                  <span className="text-sm text-gray-500">80-100</span>
                </div>
                <Progress value={82} className="h-4" />
                <p className="text-sm text-gray-600">
                  You're doing great! Keep up the balanced digital habits.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wellness Insights Grid */}
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
                  <span className="text-2xl font-bold text-gray-900">{insight.score}</span>
                  <span className="text-sm text-gray-500">/ 100</span>
                </div>
                <Progress value={insight.score} className="h-2" />
              </div>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Daily Goals */}
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-indigo-50 to-purple-50 animate-fade-in" style={{ animationDelay: '600ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg animate-float">
              <Target className="w-6 h-6 text-white" />
            </div>
            Daily Goals Progress
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Track your wellness objectives for today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {dailyGoals.map((goal, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 animate-slide-in-right" style={{ animationDelay: `${(index + 4) * 100}ms` }}>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-900">{goal.label}</h4>
                  <span className="text-sm text-gray-500">{goal.progress}%</span>
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
