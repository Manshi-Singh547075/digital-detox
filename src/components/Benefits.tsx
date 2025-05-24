
import React from 'react';
import { CheckCircle, TrendingUp, Users, Clock } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Improved Focus",
      description: "Users report 40% better concentration after implementing our digital wellness strategies."
    },
    {
      icon: Users,
      title: "Better Relationships",
      description: "Strengthen real-world connections by creating healthy boundaries with technology."
    },
    {
      icon: Clock,
      title: "More Free Time",
      description: "Reclaim an average of 2 hours daily by optimizing your digital consumption habits."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              Transform Your Digital Life
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of users who have successfully improved their digital wellness 
              and created healthier relationships with technology.
            </p>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-full p-2 flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Weekly Progress</h3>
                  <span className="text-sm text-green-600 font-medium">↑ 15% improvement</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Screen Time Goal</span>
                      <span className="text-gray-900 font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Mindful Breaks</span>
                      <span className="text-gray-900 font-medium">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Digital Detox</span>
                      <span className="text-gray-900 font-medium">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">7</p>
                    <p className="text-sm text-gray-600">Days Streak</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">2.5h</p>
                    <p className="text-sm text-gray-600">Time Saved</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">95</p>
                    <p className="text-sm text-gray-600">Wellness Score</p>
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

export default Benefits;
