
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UsageChart from '../components/dashboard/UsageChart';
import AIInsights from '../components/dashboard/AIInsights';
import AppBreakdown from '../components/dashboard/AppBreakdown';
import FamilyMonitoring from '../components/dashboard/FamilyMonitoring';
import WellnessScore from '../components/dashboard/WellnessScore';
import { Users, Activity, Brain, Shield } from 'lucide-react';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Wellness Dashboard</h1>
          <p className="text-gray-600">Track your digital habits and build healthier relationships with technology</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full lg:w-auto grid-cols-4 lg:grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="family" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Family
            </TabsTrigger>
            <TabsTrigger value="protection" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Protection
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <WellnessScore />
              </div>
              <div className="lg:col-span-3">
                <UsageChart period={selectedPeriod} onPeriodChange={setSelectedPeriod} />
              </div>
            </div>
            <AppBreakdown />
          </TabsContent>

          <TabsContent value="insights">
            <AIInsights />
          </TabsContent>

          <TabsContent value="family">
            <FamilyMonitoring />
          </TabsContent>

          <TabsContent value="protection">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Protection Status
                </CardTitle>
                <CardDescription>
                  Your cyberbullying protection and content filtering settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <h3 className="font-semibold text-green-800">Cyberbullying Detection</h3>
                      <p className="text-sm text-green-600">Active - 0 threats detected today</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <h3 className="font-semibold text-blue-800">Content Filtering</h3>
                      <p className="text-sm text-blue-600">Moderate filtering enabled</p>
                    </div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
