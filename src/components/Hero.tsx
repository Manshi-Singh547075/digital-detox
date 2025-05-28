import React from 'react';
import { Shield, Monitor, Heart, ArrowRight, Smartphone, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from './Navbar';
const Hero = () => {
  return <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white min-h-screen">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 animate-pulse-slow"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-green-300/20 rounded-full animate-bounce-slow"></div>
      <div className="absolute bottom-40 left-20 w-20 h-20 bg-blue-300/10 rounded-full animate-float" style={{
      animationDelay: '1s'
    }}></div>
      
      <Navbar />
      
      <div className="relative container mx-auto px-6 py-20 lg:py-32 mt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center space-x-2 text-blue-200">
              <Shield className="w-6 h-6 animate-pulse-slow" />
              <span className="text-sm font-medium tracking-wide uppercase">Digital Wellness Platform</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Reclaim Your
              <span className="bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent animate-pulse-slow">
                {" "}Digital Life
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
              Monitor screen time, detect cyberbullying, build healthy online habits, and protect your digital footprint with our comprehensive wellness platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-blue-200">
              <div className="flex items-center space-x-2 animate-fade-in" style={{
              animationDelay: '0.2s'
            }}>
                <Monitor className="w-4 h-4 animate-bounce-slow" />
                <span>Screen Time Tracking</span>
              </div>
              <div className="flex items-center space-x-2 animate-fade-in" style={{
              animationDelay: '0.4s'
            }}>
                <Shield className="w-4 h-4 animate-bounce-slow" />
                <span>Cyberbully Protection</span>
              </div>
              <div className="flex items-center space-x-2 animate-fade-in" style={{
              animationDelay: '0.6s'
            }}>
                <Heart className="w-4 h-4 animate-bounce-slow" />
                <span>Wellness Tools</span>
              </div>
            </div>
          </div>
          
          <div className="relative lg:scale-110 animate-slide-in-right">
            {/* Main dashboard mockup */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="space-y-6">
                {/* Header with user avatar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center animate-pulse-slow">
                      <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=40&h=40&fit=crop&crop=face" alt="User" className="w-8 h-8 rounded-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Sarah Johnson</p>
                      <p className="text-xs text-blue-200">Premium User</p>
                    </div>
                  </div>
                  <div className="animate-float">
                    <Clock className="w-5 h-5 text-green-300" />
                  </div>
                </div>

                {/* Main screen time card */}
                <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=80&fit=crop" alt="Device" className="w-12 h-12 object-cover rounded-lg opacity-80 animate-float" />
                      
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Daily Screen Time</h3>
                  <p className="text-3xl font-bold text-white animate-pulse-slow">4h 23m</p>
                  <p className="text-sm text-white/80">↓ 2h less than yesterday</p>
                </div>
                
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300 hover:bg-white/25">
                    <div className="relative mb-2">
                      <Shield className="w-8 h-8 mx-auto text-green-300 animate-pulse-slow" />
                      <div className="absolute -top-1 -right-2 w-3 h-3 bg-green-400 rounded-full animate-bounce-slow"></div>
                    </div>
                    <p className="text-sm font-medium">Protected</p>
                    <p className="text-xs text-blue-200">No threats detected</p>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300 hover:bg-white/25">
                    <div className="relative mb-2">
                      <Heart className="w-8 h-8 mx-auto text-red-300 animate-pulse-slow" />
                      <Users className="absolute -top-1 -right-2 w-4 h-4 text-blue-300 animate-float" />
                    </div>
                    <p className="text-sm font-medium">Wellness Score</p>
                    <p className="text-xs text-blue-200">85/100</p>
                  </div>
                </div>

                {/* App usage preview */}
                <div className="space-y-2">
                  <p className="text-xs text-blue-200 font-medium">Top Apps Today</p>
                  <div className="space-y-2">
                    {[{
                    name: 'Social Media',
                    time: '1h 45m',
                    color: 'bg-red-400',
                    width: 'w-3/4'
                  }, {
                    name: 'Work Apps',
                    time: '2h 12m',
                    color: 'bg-blue-400',
                    width: 'w-4/5'
                  }, {
                    name: 'Entertainment',
                    time: '26m',
                    color: 'bg-green-400',
                    width: 'w-1/3'
                  }].map((app, index) => <div key={app.name} className="flex items-center justify-between animate-fade-in" style={{
                    animationDelay: `${0.8 + index * 0.2}s`
                  }}>
                        <div className="flex items-center space-x-2 flex-1">
                          <div className={`w-2 h-2 rounded-full ${app.color} animate-pulse-slow`}></div>
                          <span className="text-xs text-white">{app.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`h-1 ${app.width} ${app.color} rounded-full`}></div>
                          <span className="text-xs text-blue-200 w-12 text-right">{app.time}</span>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements around the dashboard */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-green-300/20 to-blue-300/20 rounded-full animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full animate-bounce-slow"></div>
          </div>
        </div>

        {/* Bottom floating indicators */}
        <div className="flex justify-center mt-16 space-x-8 animate-fade-in" style={{
        animationDelay: '1s'
      }}>
          {[{
          icon: Monitor,
          label: '50k+ Users',
          delay: '0s'
        }, {
          icon: Shield,
          label: '99.9% Uptime',
          delay: '0.2s'
        }, {
          icon: Heart,
          label: '4.9/5 Rating',
          delay: '0.4s'
        }].map((item, index) => <div key={index} className="flex flex-col items-center space-y-2 text-blue-200 animate-fade-in" style={{
          animationDelay: item.delay
        }}>
              <item.icon className="w-6 h-6 animate-bounce-slow" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Hero;