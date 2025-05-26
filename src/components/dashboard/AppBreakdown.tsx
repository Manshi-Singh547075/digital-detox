
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Smartphone, Laptop, Tablet, Chrome, MessageCircle, Music, Play, Camera } from 'lucide-react';

const AppBreakdown = () => {
  const apps = [
    { 
      name: 'Instagram', 
      time: '2h 15m', 
      percentage: 35, 
      category: 'Social', 
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      icon: Camera,
      textColor: 'text-purple-600'
    },
    { 
      name: 'Chrome', 
      time: '1h 45m', 
      percentage: 27, 
      category: 'Productivity', 
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      icon: Chrome,
      textColor: 'text-blue-600'
    },
    { 
      name: 'Netflix', 
      time: '1h 30m', 
      percentage: 23, 
      category: 'Entertainment', 
      color: 'bg-gradient-to-r from-red-500 to-red-600',
      icon: Play,
      textColor: 'text-red-600'
    },
    { 
      name: 'WhatsApp', 
      time: '45m', 
      percentage: 12, 
      category: 'Communication', 
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      icon: MessageCircle,
      textColor: 'text-green-600'
    },
    { 
      name: 'Spotify', 
      time: '30m', 
      percentage: 8, 
      category: 'Music', 
      color: 'bg-gradient-to-r from-green-400 to-green-500',
      icon: Music,
      textColor: 'text-green-500'
    }
  ];

  const devices = [
    { name: 'iPhone', time: '4h 20m', percentage: 65, icon: Smartphone, color: 'text-blue-600' },
    { name: 'MacBook', time: '2h 10m', percentage: 32, icon: Laptop, color: 'text-gray-600' },
    { name: 'iPad', time: '20m', percentage: 3, icon: Tablet, color: 'text-purple-600' }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Smartphone className="w-5 h-5 text-blue-600" />
            </div>
            Top Applications
          </CardTitle>
          <CardDescription className="text-gray-600">Your most used apps today</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {apps.map((app, index) => (
            <div key={index} className="group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${app.color} shadow-md`}>
                    <app.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">{app.name}</span>
                    <span className={`text-xs ml-2 px-2 py-1 rounded-full bg-gray-100 ${app.textColor}`}>
                      {app.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-800">{app.time}</span>
                  <p className="text-xs text-gray-500">{app.percentage}% of total</p>
                </div>
              </div>
              <Progress value={app.percentage} className="h-3 bg-gray-200">
                <div 
                  className={`h-full ${app.color} rounded-full transition-all duration-500`}
                  style={{ width: `${app.percentage}%` }}
                />
              </Progress>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Laptop className="w-5 h-5 text-purple-600" />
            </div>
            Device Usage
          </CardTitle>
          <CardDescription className="text-gray-600">Screen time across your devices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {devices.map((device, index) => (
            <div key={index} className="group hover:bg-gray-50 p-4 rounded-lg transition-all duration-200 border border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                    <device.icon className={`w-5 h-5 ${device.color}`} />
                  </div>
                  <span className="font-semibold text-gray-800">{device.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-800">{device.time}</span>
                </div>
              </div>
              <Progress value={device.percentage} className="h-3 bg-gray-200" />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-600">{device.percentage}% of total time</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">Active</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppBreakdown;
