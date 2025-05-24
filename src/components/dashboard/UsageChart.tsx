
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Clock, TrendingDown, TrendingUp } from 'lucide-react';

interface UsageChartProps {
  period: string;
  onPeriodChange: (period: string) => void;
}

const UsageChart: React.FC<UsageChartProps> = ({ period, onPeriodChange }) => {
  const weeklyData = [
    { day: 'Mon', hours: 6.2, social: 2.1, work: 3.1, entertainment: 1.0 },
    { day: 'Tue', hours: 5.8, social: 1.9, work: 2.8, entertainment: 1.1 },
    { day: 'Wed', hours: 7.1, social: 2.5, work: 3.5, entertainment: 1.1 },
    { day: 'Thu', hours: 4.9, social: 1.6, work: 2.4, entertainment: 0.9 },
    { day: 'Fri', hours: 6.8, social: 2.3, work: 3.2, entertainment: 1.3 },
    { day: 'Sat', hours: 8.2, social: 3.1, work: 1.8, entertainment: 3.3 },
    { day: 'Sun', hours: 7.5, social: 2.8, work: 1.2, entertainment: 3.5 },
  ];

  const dailyData = [
    { hour: '6AM', usage: 0.1 },
    { hour: '9AM', usage: 1.2 },
    { hour: '12PM', usage: 2.1 },
    { hour: '3PM', usage: 1.8 },
    { hour: '6PM', usage: 2.5 },
    { hour: '9PM', usage: 3.2 },
    { hour: '12AM', usage: 1.1 },
  ];

  const chartConfig = {
    hours: {
      label: "Screen Time (hours)",
      color: "hsl(var(--chart-1))",
    },
    social: {
      label: "Social Media",
      color: "#3b82f6",
    },
    work: {
      label: "Work/Productivity",
      color: "#10b981",
    },
    entertainment: {
      label: "Entertainment",
      color: "#f59e0b",
    },
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Screen Time Analysis
            </CardTitle>
            <CardDescription>
              Your digital usage patterns over time
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={period === 'day' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPeriodChange('day')}
            >
              Daily
            </Button>
            <Button
              variant={period === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPeriodChange('week')}
            >
              Weekly
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {period === 'week' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">6.4h</p>
                <p className="text-sm text-gray-600">Daily Average</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                  <TrendingDown className="w-4 h-4" />
                  -12%
                </p>
                <p className="text-sm text-gray-600">vs Last Week</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">45h</p>
                <p className="text-sm text-gray-600">Weekly Total</p>
              </div>
            </div>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="social" stackId="a" fill="var(--color-social)" />
                <Bar dataKey="work" stackId="a" fill="var(--color-work)" />
                <Bar dataKey="entertainment" stackId="a" fill="var(--color-entertainment)" />
              </BarChart>
            </ChartContainer>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">4.2h</p>
                <p className="text-sm text-gray-600">Today's Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600 flex items-center justify-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +8%
                </p>
                <p className="text-sm text-gray-600">vs Yesterday</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">2.1h</p>
                <p className="text-sm text-gray-600">Peak Hour</p>
              </div>
            </div>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <AreaChart data={dailyData}>
                <XAxis dataKey="hour" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="usage"
                  stroke="var(--color-hours)"
                  fill="var(--color-hours)"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UsageChart;
