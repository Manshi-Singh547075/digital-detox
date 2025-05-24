
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, Shield, AlertTriangle, CheckCircle, Settings } from 'lucide-react';

const FamilyMonitoring = () => {
  const familyMembers = [
    {
      id: 1,
      name: 'Emma (Age 12)',
      avatar: '👧',
      screenTime: '3h 45m',
      status: 'within_limits',
      todayLimit: '4h',
      apps: ['YouTube Kids', 'Minecraft', 'Khan Academy'],
      alerts: 0,
      wellnessScore: 85
    },
    {
      id: 2,
      name: 'Jake (Age 15)',
      avatar: '👦',
      screenTime: '6h 20m',
      status: 'approaching_limit',
      todayLimit: '6h 30m',
      apps: ['Instagram', 'Discord', 'Duolingo'],
      alerts: 1,
      wellnessScore: 72
    },
    {
      id: 3,
      name: 'Sarah (Partner)',
      avatar: '👩',
      screenTime: '5h 10m',
      status: 'healthy',
      todayLimit: 'No limit',
      apps: ['Work apps', 'News', 'Meditation'],
      alerts: 0,
      wellnessScore: 90
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'within_limits':
        return <Badge className="bg-green-100 text-green-800">Within Limits</Badge>;
      case 'approaching_limit':
        return <Badge className="bg-orange-100 text-orange-800">Near Limit</Badge>;
      case 'healthy':
        return <Badge className="bg-blue-100 text-blue-800">Healthy</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'within_limits':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'approaching_limit':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Family Digital Wellness
              </CardTitle>
              <CardDescription>
                Monitor and manage your family's digital habits and screen time
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Family Settings
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {familyMembers.map((member) => (
              <div key={member.id} className="p-6 border rounded-lg bg-white shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{member.avatar}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusIcon(member.status)}
                        {getStatusBadge(member.status)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{member.screenTime}</p>
                    <p className="text-sm text-gray-500">Today's usage</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">Daily Limit</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-700">{member.todayLimit}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">Wellness Score</span>
                    </div>
                    <p className="text-lg font-semibold text-green-600">{member.wellnessScore}/100</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">Alerts Today</span>
                    </div>
                    <p className="text-lg font-semibold text-red-600">{member.alerts}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Top Apps Today:</p>
                  <div className="flex flex-wrap gap-2">
                    {member.apps.map((app, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {app}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Adjust Limits
                  </Button>
                  {member.alerts > 0 && (
                    <Button size="sm" variant="outline" className="text-orange-600">
                      Review Alerts
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Family Goals</CardTitle>
            <CardDescription>Shared digital wellness objectives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Device-free dinner time</span>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Weekend outdoor activity</span>
                <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Bedtime device cutoff</span>
                <Badge className="bg-green-100 text-green-800">Achieved</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Safety Alerts</CardTitle>
            <CardDescription>Recent protection notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded border border-orange-200">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">Jake exceeded screen time</p>
                  <p className="text-xs text-gray-600">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded border border-green-200">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium">All family members protected</p>
                  <p className="text-xs text-gray-600">No threats detected today</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FamilyMonitoring;
