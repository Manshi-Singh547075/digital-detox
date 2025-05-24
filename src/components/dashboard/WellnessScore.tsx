
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Heart, TrendingUp, Award } from 'lucide-react';

const WellnessScore = () => {
  const score = 82;
  const trend = '+5';
  
  const factors = [
    { name: 'Screen Time Balance', score: 85, color: 'bg-green-500' },
    { name: 'App Diversity', score: 78, color: 'bg-blue-500' },
    { name: 'Sleep Schedule', score: 90, color: 'bg-green-500' },
    { name: 'Break Frequency', score: 75, color: 'bg-orange-500' },
  ];

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          Wellness Score
        </CardTitle>
        <CardDescription>
          Your overall digital health rating
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
                  {factor.score}%
                </span>
              </div>
              <Progress value={factor.score} className="h-2" />
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">This Week's Achievement</span>
          </div>
          <p className="text-sm text-blue-700">
            Reduced late-night screen time by 30 minutes on average
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WellnessScore;
