import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, Shield, AlertTriangle, CheckCircle, Settings } from 'lucide-react';

interface Profile {
  has_children?: boolean | null;
  children_ages?: string | null;
  role?: string | null;
  full_name?: string | null;
}

interface FamilyMonitoringProps {
  profile?: Profile | null;
}

const FamilyMonitoring = ({ profile }: FamilyMonitoringProps) => {
  // Generate dynamic family data based on profile
  const generateFamilyMembers = () => {
    if (!profile?.has_children) {
      return [];
    }

    // Parse children ages if available
    const childrenAges = profile.children_ages ? profile.children_ages.split(',').map(age => parseInt(age.trim())) : [12, 8];
    
    return childrenAges.map((age, index) => {
      const isTeenager = age >= 13;
      const childName = `Child ${index + 1} (Age ${age})`;
      const avatar = age < 8 ? '👶' : age < 13 ? '🧒' : age < 18 ? '👦' : '👨';
      
      return {
        id: index + 1,
        name: childName,
        avatar,
        screenTime: isTeenager ? `${4 + Math.floor(Math.random() * 3)}h ${Math.floor(Math.random() * 60)}m` : `${2 + Math.floor(Math.random() * 2)}h ${Math.floor(Math.random() * 60)}m`,
        status: Math.random() > 0.7 ? 'approaching_limit' : 'within_limits',
        todayLimit: isTeenager ? '6h' : '3h',
        apps: isTeenager 
          ? ['Instagram', 'TikTok', 'YouTube', 'Games']
          : ['YouTube Kids', 'Educational Games', 'Drawing Apps'],
        alerts: Math.random() > 0.8 ? 1 : 0,
        wellnessScore: 70 + Math.floor(Math.random() * 25)
      };
    });
  };

  const familyMembers = generateFamilyMembers();

  // If user has no children, show setup message
  if (!profile?.has_children || familyMembers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Family Digital Wellness
          </CardTitle>
          <CardDescription>
            Set up family monitoring and digital wellness for your household
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Family Monitoring Setup
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {profile?.role === 'parent' 
                ? "Add your children's profiles to monitor their digital wellness and set healthy boundaries."
                : "Family monitoring features will be available when you add family members to your account."
              }
            </p>
            <div className="space-y-3">
              <Button className="w-full max-w-sm">
                {profile?.role === 'parent' ? 'Add Children Profiles' : 'Set Up Family Account'}
              </Button>
              <p className="text-sm text-gray-500">
                Monitor screen time, set limits, and create healthy digital habits together
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

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

      {/* Family Goals and Safety Alerts sections remain the same */}
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
              {familyMembers.some(member => member.alerts > 0) ? (
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded border border-orange-200">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium">Screen time limit approached</p>
                    <p className="text-xs text-gray-600">2 hours ago</p>
                  </div>
                </div>
              ) : null}
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
