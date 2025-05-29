
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Benefits from '../components/Benefits';
import Statistics from '../components/Statistics';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 w-full overflow-x-hidden">
      <Hero />
      <Features />
      <Benefits />
      <Statistics />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
