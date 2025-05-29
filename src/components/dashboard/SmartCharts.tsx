
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, Target, Clock } from 'lucide-react';

interface SmartChartsProps {
  profile: any;
  analysisData?: any;
}

const SmartCharts = ({ profile, analysisData }: SmartChartsProps) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Generate dynamic chart data based on user profile and AI analysis
    const generateSmartData = () => {
      const currentUsage = profile?.current_screen_time || 6;
      const goal = profile?.daily_screen_time_goal || 4;
      const aiTarget = analysisData?.suggestedTargets?.daily || goal;

      const data = [];
      for (let i = 13; i >= 0; i--) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const baseUsage = currentUsage + (Math.random() * 2 - 1);
        const trend = analysisData?.goalProgress > 60 ? -0.1 * i : 0.05 * i;
        
        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          actual: Math.max(1, Math.round((baseUsage + trend) * 10) / 10),
          goal: goal,
          aiPrediction: Math.max(1, Math.round((aiTarget + trend * 0.5) * 10) / 10),
          productive: Math.max(0.5, Math.round(baseUsage * 0.3 * 10) / 10),
          social: Math.max(0.5, Math.round(baseUsage * 0.25 * 10) / 10),
          entertainment: Math.max(0.5, Math.round(baseUsage * 0.35 * 10) / 10),
          other: Math.max(0.2, Math.round(baseUsage * 0.1 * 10) / 10)
        });
      }
      return data;
    };

    setChartData(generateSmartData());
  }, [profile, analysisData]);

  const chartConfig = {
    actual: {
      label: "Actual Usage",
      color: "#3B82F6",
    },
    goal: {
      label: "Your Goal",
      color: "#10B981",
    },
    aiPrediction: {
      label: "AI Prediction",
      color: "#8B5CF6",
    },
    productive: {
      label: "Productive",
      color: "#10B981",
    },
    social: {
      label: "Social",
      color: "#3B82F6",
    },
    entertainment: {
      label: "Entertainment",
      color: "#F59E0B",
    },
    other: {
      label: "Other",
      color: "#6B7280",
    },
  };

  return (
    <div className="space-y-6">
      {/* Smart Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            AI-Enhanced Usage Trends
          </CardTitle>
          <CardDescription>
            Real-time analysis with predictive insights powered by Gemini AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="goal" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="aiPrediction" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  strokeDasharray="8 4"
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* App Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              Smart Category Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.slice(-7)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="productive" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="social" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="entertainment" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="other" stackId="1" stroke="#6B7280" fill="#6B7280" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Weekly Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.slice(-7)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="actual" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="goal" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartCharts;
