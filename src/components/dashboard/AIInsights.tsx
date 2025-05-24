
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, Clock, Heart, AlertTriangle, Lightbulb } from 'lucide-react';

const AIInsights = () => {
  const insights = [
    {
      id: 1,
      type: 'pattern',
      icon: TrendingUp,
      title: 'Social Media Stress Pattern Detected',
      description: 'You spend 40% more time on social media when stressed. Your usage spikes between 8-10 PM on weekdays.',
      impact: 'high',
      recommendation: 'Try our evening mindfulness exercises instead of scrolling during these hours.',
      color: 'red'
    },
    {
      id: 2,
      type: 'positive',
      icon: Heart,
      title: 'Improved Sleep Correlation',
      description: 'Your screen time has decreased by 30 minutes before bed, correlating with better sleep quality reports.',
      impact: 'positive',
      recommendation: 'Keep up the great work! Consider extending your evening digital detox by another 15 minutes.',
      color: 'green'
    },
    {
      id: 3,
      type: 'warning',
      icon: AlertTriangle,
      title: 'Weekend Binge Pattern',
      description: 'Your weekend screen time is 65% higher than weekdays, with 4+ hour entertainment sessions.',
      impact: 'medium',
      recommendation: 'Set weekend time limits and plan offline activities to break long usage sessions.',
      color: 'orange'
    },
    {
      id: 4,
      type: 'opportunity',
      icon: Lightbulb,
      title: 'Productivity Opportunity',
      description: 'You have 2.5 hours of fragmented app switching daily. Consolidating could boost focus.',
      impact: 'medium',
      recommendation: 'Try our focus mode during work hours to minimize app switching and increase productivity.',
      color: 'blue'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'border-red-200 bg-red-50',
      green: 'border-green-200 bg-green-50',
      orange: 'border-orange-200 bg-orange-50',
      blue: 'border-blue-200 bg-blue-50'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColor = (color: string) => {
    const colors = {
      red: 'text-red-600',
      green: 'text-green-600',
      orange: 'text-orange-600',
      blue: 'text-blue-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            AI-Powered Digital Wellness Insights
          </CardTitle>
          <CardDescription>
            Personalized analysis of your digital behavior patterns and recommendations for improvement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className={`p-6 rounded-lg border ${getColorClasses(insight.color)}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg bg-white ${getIconColor(insight.color)}`}>
                    <insight.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                    <p className="text-gray-700">{insight.description}</p>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="text-sm font-medium text-gray-600 mb-1">💡 Recommendation:</p>
                      <p className="text-sm text-gray-700">{insight.recommendation}</p>
                    </div>
                    <Button size="sm" variant="outline" className="mt-2">
                      Apply Suggestion
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Weekly Insights Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Patterns Identified</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Recommendations Applied</span>
                <span className="font-semibold text-green-600">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Wellness Score Improvement</span>
                <span className="font-semibold text-blue-600">+15%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stress Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">Late night scrolling increased</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm">App switching frequency up 25%</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Meditation app usage steady</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIInsights;
