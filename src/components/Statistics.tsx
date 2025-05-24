
import React from 'react';
import { Users, Shield, Clock, Award } from 'lucide-react';

const Statistics = () => {
  const stats = [
    {
      icon: Users,
      number: "50K+",
      label: "Active Users",
      description: "Building healthier digital habits"
    },
    {
      icon: Shield,
      number: "99.9%",
      label: "Protection Rate",
      description: "Cyberbullying incidents prevented"
    },
    {
      icon: Clock,
      number: "2.3M",
      label: "Hours Reclaimed",
      description: "Time saved from mindless scrolling"
    },
    {
      icon: Award,
      number: "4.8/5",
      label: "User Rating",
      description: "Based on 10,000+ reviews"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Trusted by Thousands Worldwide
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Join a growing community committed to digital wellness and online safety
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="bg-gradient-to-r from-blue-400 to-green-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">
                  {stat.number}
                </h3>
                <p className="text-xl font-semibold text-white mb-2">{stat.label}</p>
                <p className="text-blue-200 text-sm">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
