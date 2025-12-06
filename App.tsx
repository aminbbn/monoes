
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { SocialProof } from './components/SocialProof';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { BackgroundLogo } from './components/BackgroundLogo';

function App() {
  return (
    <div className="min-h-screen bg-navy-900 text-white font-sans selection:bg-primary-purple selection:text-white relative overflow-x-hidden">
      <Navbar />
      <BackgroundLogo />
      <main className="relative">
        <Hero />
        <ProblemSection />
        <Features />
        <HowItWorks />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
