
import React from 'react';
import { ArrowRight, Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();

  const handleDownloadApp = () => {
    // For now, navigate to auth page. In production, this could link to app stores
    navigate('/auth');
  };

  const handleWebVersion = () => {
    navigate('/auth');
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 bg-green-200"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 sm:mb-8">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent py-[5px]">
              Digital Wellness?
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            Join thousands of users who have already taken control of their digital lives. 
            Start your journey to healthier technology habits today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 px-4">
            <Button 
              size="lg" 
              onClick={handleDownloadApp}
              className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:scale-105 text-base sm:text-lg"
            >
              <Download className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Download Free App
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleWebVersion}
              className="w-full sm:w-auto border-white hover:bg-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 text-base sm:text-lg text-blue-700"
            >
              Start Web Version
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-blue-200 text-sm sm:text-base px-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-center sm:text-left">Available on iOS & Android</span>
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
