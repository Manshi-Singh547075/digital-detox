import React from 'react';
import { Shield, Monitor, Heart, ArrowRight, Smartphone, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
const Hero = () => {
  const navigate = useNavigate();
  const handleStartJourney = () => {
    navigate('/auth');
  };
  return <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white min-h-screen">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 animate-pulse-slow"></div>
      
      {/* Floating elements - Responsive positioning */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full animate-float"></div>
      <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-8 h-8 sm:w-12 sm:h-12 bg-green-300/20 rounded-full animate-bounce-slow"></div>
      <div className="absolute bottom-20 sm:bottom-40 left-10 sm:left-20 w-12 h-12 sm:w-20 sm:h-20 bg-blue-300/10 rounded-full animate-float" style={{
      animationDelay: '1s'
    }}></div>
      
      <Navbar />
      
      <div className="relative container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-32 mt-16 sm:mt-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in order-2 lg:order-1">
            <div className="flex items-center space-x-2 text-blue-200">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse-slow" />
              <span className="text-xs sm:text-sm font-medium tracking-wide uppercase">Digital Wellness Platform</span>
            </div>
            
            <h1 className="text-3xl lg:text-6xl font-bold leading-tight sm:text-5xl">
              Reclaim Your
              <span className="bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent animate-pulse-slow">
                {" "}Digital Life
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-lg">
              Monitor screen time, detect cyberbullying, build healthy online habits, and protect your digital footprint with our comprehensive wellness platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={handleStartJourney} className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50 font-semibold px-6 sm:px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Start Your Journey
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm text-blue-200">
              <div className="flex items-center space-x-2 animate-fade-in" style={{
              animationDelay: '0.2s'
            }}>
                <Monitor className="w-4 h-4 animate-bounce-slow flex-shrink-0" />
                <span>Screen Time Tracking</span>
              </div>
              <div className="flex items-center space-x-2 animate-fade-in" style={{
              animationDelay: '0.4s'
            }}>
                <Shield className="w-4 h-4 animate-bounce-slow flex-shrink-0" />
                <span>Cyberbully Protection</span>
              </div>
              <div className="flex items-center space-x-2 animate-fade-in" style={{
              animationDelay: '0.6s'
            }}>
                <Heart className="w-4 h-4 animate-bounce-slow flex-shrink-0" />
                <span>Wellness Tools</span>
              </div>
            </div>
          </div>
          
          <div className="relative lg:scale-110 animate-slide-in-right order-1 lg:order-2">
            {/* Main dashboard mockup - Responsive sizing */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="space-y-4 sm:space-y-6">
                {/* Header with user avatar - Responsive */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center animate-pulse-slow">
                      <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=40&h=40&fit=crop&crop=face" alt="User" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-white">Sarah Johnson</p>
                      <p className="text-xs text-blue-200">Premium User</p>
                    </div>
                  </div>
                  <div className="animate-float">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                  </div>
                </div>

                {/* Main screen time card - Responsive */}
                <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className="relative">
                      <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=80&fit=crop" alt="Device" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-cover rounded-lg opacity-80 animate-float" />
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-lg font-semibold text-white mb-2">Daily Screen Time</h3>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white animate-pulse-slow">4h 23m</p>
                  <p className="text-xs sm:text-sm text-white/80">↓ 2h less than yesterday</p>
                </div>
                
                {/* Stats grid - Responsive */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center transform hover:scale-105 transition-all duration-300 hover:bg-white/25">
                    <div className="relative mb-2">
                      <Shield className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-green-300 animate-pulse-slow" />
                      <div className="absolute -top-1 -right-2 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-bounce-slow"></div>
                    </div>
                    <p className="text-xs sm:text-sm font-medium">Protected</p>
                    <p className="text-xs text-blue-200">No threats detected</p>
                  </div>
                  <div className="bg-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center transform hover:scale-105 transition-all duration-300 hover:bg-white/25">
                    <div className="relative mb-2">
                      <Heart className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-red-300 animate-pulse-slow" />
                      <Users className="absolute -top-1 -right-2 w-3 h-3 sm:w-4 sm:h-4 text-blue-300 animate-float" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium">Wellness Score</p>
                    <p className="text-xs text-blue-200">85/100</p>
                  </div>
                </div>

                {/* App usage preview - Responsive */}
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
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                          <div className={`w-2 h-2 rounded-full ${app.color} animate-pulse-slow flex-shrink-0`}></div>
                          <span className="text-xs text-white truncate">{app.name}</span>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <div className={`h-1 ${app.width} ${app.color} rounded-full hidden sm:block`}></div>
                          <span className="text-xs text-blue-200 w-10 sm:w-12 text-right">{app.time}</span>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements around the dashboard - Responsive */}
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-green-300/20 to-blue-300/20 rounded-full animate-float"></div>
            <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full animate-bounce-slow"></div>
          </div>
        </div>

        {/* Bottom floating indicators - Responsive */}
        <div className="flex flex-wrap justify-center mt-12 sm:mt-16 gap-4 sm:gap-8 animate-fade-in" style={{
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
        }].map((item, index) => <div key={index} className="flex flex-col items-center space-y-1 sm:space-y-2 text-blue-200 animate-fade-in" style={{
          animationDelay: item.delay
        }}>
              <item.icon className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce-slow" />
              <span className="text-xs sm:text-sm font-medium text-center">{item.label}</span>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Hero;