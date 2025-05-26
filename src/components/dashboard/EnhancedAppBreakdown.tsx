
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Smartphone, Laptop, Tablet, Chrome, MessageCircle, Music, Play, Camera, Instagram } from 'lucide-react';

const EnhancedAppBreakdown = () => {
  const apps = [
    { 
      name: 'Instagram', 
      time: '2h 15m', 
      percentage: 35, 
      category: 'Social', 
      color: 'from-pink-500 to-purple-600',
      bgColor: 'bg-gradient-to-r from-pink-500 to-purple-600',
      icon: Instagram,
      iconBg: 'bg-gradient-to-br from-pink-500 to-purple-600'
    },
    { 
      name: 'Chrome', 
      time: '1h 45m', 
      percentage: 27, 
      category: 'Productivity', 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
      icon: Chrome,
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    { 
      name: 'Netflix', 
      time: '1h 30m', 
      percentage: 23, 
      category: 'Entertainment', 
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-gradient-to-r from-red-500 to-red-600',
      icon: Play,
      iconBg: 'bg-gradient-to-br from-red-500 to-red-600'
    },
    { 
      name: 'WhatsApp', 
      time: '45m', 
      percentage: 12, 
      category: 'Communication', 
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-gradient-to-r from-green-500 to-green-600',
      icon: MessageCircle,
      iconBg: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    { 
      name: 'Spotify', 
      time: '30m', 
      percentage: 8, 
      category: 'Music', 
      color: 'from-green-400 to-green-500',
      bgColor: 'bg-gradient-to-r from-green-400 to-green-500',
      icon: Music,
      iconBg: 'bg-gradient-to-br from-green-400 to-green-500'
    }
  ];

  const devices = [
    { 
      name: 'iPhone', 
      time: '4h 10m', 
      percentage: 65, 
      icon: Smartphone, 
      color: 'text-purple-600',
      bgGradient: 'from-purple-500 to-purple-600'
    },
    { 
      name: 'Active', 
      time: '20m', 
      percentage: 3, 
      icon: Tablet, 
      color: 'text-purple-600',
      bgGradient: 'from-purple-400 to-purple-500'
    }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Top Applications Card */}
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white overflow-hidden relative animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse-slow"></div>
        <CardHeader className="pb-4 relative z-10">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            Top Applications
          </CardTitle>
          <CardDescription className="text-gray-300 text-base">Your most used apps today</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 relative z-10">
          {apps.map((app, index) => (
            <div key={index} className="group hover:bg-white/10 p-4 rounded-xl transition-all duration-300 animate-slide-in-right border border-white/10 backdrop-blur-sm" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${app.iconBg} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <app.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="font-bold text-white text-lg">{app.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm px-3 py-1 rounded-full bg-white/20 text-gray-200">
                        {app.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">{app.time}</span>
                  <p className="text-sm text-gray-300">{app.percentage}% of total</p>
                </div>
              </div>
              <div className="relative">
                <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${app.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${app.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Device Usage Card */}
      <div className="space-y-6">
        {devices.map((device, index) => (
          <Card key={index} className="shadow-xl border-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white overflow-hidden relative animate-fade-in" style={{ animationDelay: `${(index + 1) * 200}ms` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse-slow"></div>
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 bg-gradient-to-br ${device.bgGradient} rounded-2xl shadow-lg animate-float`}>
                    <device.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{device.name}</h3>
                    <p className="text-gray-300">Device usage</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-white">{device.time}</span>
                  <p className="text-sm text-gray-300">{device.percentage}% of total time</p>
                </div>
              </div>
              <div className="relative">
                <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${device.bgGradient} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${device.percentage}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EnhancedAppBreakdown;
