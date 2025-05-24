
import React from 'react';
import { ArrowRight, Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Digital Wellness?
            </span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users who have already taken control of their digital lives. 
            Start your journey to healthier technology habits today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 text-lg">
              <Download className="mr-2 w-5 h-5" />
              Download Free App
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-700 font-semibold px-8 py-4 rounded-full transition-all duration-300 text-lg">
              Start Web Version
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-blue-200">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5" />
              <span>Available on iOS & Android</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-blue-300"></div>
            <div className="flex items-center space-x-2">
              <span>✓ 30-day free trial</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-blue-300"></div>
            <div className="flex items-center space-x-2">
              <span>✓ Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
