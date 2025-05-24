
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Smartphone, Laptop, Tablet } from 'lucide-react';

const AppBreakdown = () => {
  const apps = [
    { name: 'Instagram', time: '2h 15m', percentage: 35, category: 'Social', color: 'bg-pink-500' },
    { name: 'Chrome', time: '1h 45m', percentage: 27, category: 'Productivity', color: 'bg-blue-500' },
    { name: 'Netflix', time: '1h 30m', percentage: 23, category: 'Entertainment', color: 'bg-red-500' },
    { name: 'WhatsApp', time: '45m', percentage: 12, category: 'Communication', color: 'bg-green-500' },
    { name: 'Spotify', time: '30m', percentage: 8, category: 'Music', color: 'bg-green-400' }
  ];

  const devices = [
    { name: 'iPhone', time: '4h 20m', percentage: 65, icon: Smartphone },
    { name: 'MacBook', time: '2h 10m', percentage: 32, icon: Laptop },
    { name: 'iPad', time: '20m', percentage: 3, icon: Tablet }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Top Applications</CardTitle>
          <CardDescription>Your most used apps today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apps.map((app, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${app.color}`}></div>
                    <span className="font-medium">{app.name}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {app.category}
                    </span>
                  </div>
                  <span className="text-sm font-semibold">{app.time}</span>
                </div>
                <Progress value={app.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Device Usage</CardTitle>
          <CardDescription>Screen time across your devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {devices.map((device, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <device.icon className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">{device.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{device.time}</span>
                </div>
                <Progress value={device.percentage} className="h-2" />
                <p className="text-xs text-gray-500">{device.percentage}% of total time</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppBreakdown;
