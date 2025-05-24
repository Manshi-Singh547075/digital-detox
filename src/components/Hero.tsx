
import React from 'react';
import { Shield, Monitor, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative container mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center space-x-2 text-blue-200">
              <Shield className="w-6 h-6" />
              <span className="text-sm font-medium tracking-wide uppercase">Digital Wellness Platform</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Reclaim Your
              <span className="bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
                {" "}Digital Life
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
              Monitor screen time, detect cyberbullying, build healthy online habits, and protect your digital footprint with our comprehensive wellness platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                  View Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-700 font-semibold px-8 py-3 rounded-full transition-all duration-300">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-blue-200">
              <div className="flex items-center space-x-2">
                <Monitor className="w-4 h-4" />
                <span>Screen Time Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Cyberbully Protection</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Wellness Tools</span>
              </div>
            </div>
          </div>
          
          <div className="relative lg:scale-110">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 animate-scale-in">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl p-6 text-center">
                  <Monitor className="w-12 h-12 mx-auto mb-4 text-white" />
                  <h3 className="text-lg font-semibold text-white mb-2">Daily Screen Time</h3>
                  <p className="text-3xl font-bold text-white">4h 23m</p>
                  <p className="text-sm text-white/80">↓ 2h less than yesterday</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-green-300" />
                    <p className="text-sm font-medium">Protected</p>
                    <p className="text-xs text-blue-200">No threats detected</p>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <Heart className="w-8 h-8 mx-auto mb-2 text-red-300" />
                    <p className="text-sm font-medium">Wellness Score</p>
                    <p className="text-xs text-blue-200">85/100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
