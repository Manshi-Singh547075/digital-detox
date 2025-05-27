import React from 'react';
import { Monitor, Shield, Target, BookOpen, Smartphone, Brain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
const Features = () => {
  const features = [{
    icon: Monitor,
    title: "Screen Time Monitoring",
    description: "Track and analyze your digital usage patterns across all devices with detailed insights and personalized recommendations.",
    color: "from-blue-500 to-blue-600"
  }, {
    icon: Shield,
    title: "Cyberbullying Detection",
    description: "AI-powered protection that identifies and prevents cyberbullying incidents across social platforms and messaging apps.",
    color: "from-red-500 to-pink-600"
  }, {
    icon: Target,
    title: "Healthy Habit Builder",
    description: "Set digital wellness goals, create healthy boundaries, and build sustainable online habits with guided programs.",
    color: "from-green-500 to-emerald-600"
  }, {
    icon: BookOpen,
    title: "Digital Footprint Education",
    description: "Learn about online privacy, data protection, and how to manage your digital identity responsibly.",
    color: "from-purple-500 to-violet-600"
  }, {
    icon: Smartphone,
    title: "App Usage Analytics",
    description: "Detailed breakdown of application usage with smart categorization and productivity insights.",
    color: "from-orange-500 to-amber-600"
  }, {
    icon: Brain,
    title: "Mindful Technology",
    description: "Meditation prompts, break reminders, and mindfulness exercises designed for the digital age.",
    color: "from-teal-500 to-cyan-600"
  }];
  return <section className="py-20 bg-green-200">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Digital Wellness
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to build a healthier relationship with technology, 
            protect yourself online, and maintain digital well-being.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Features;