
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { SocialProof } from './components/SocialProof';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FeaturesPage } from './components/FeaturesPage';
import { HowItWorksPage } from './components/HowItWorksPage';

export type PageView = 'home' | 'features' | 'how-it-works';

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-navy-900 text-white font-sans selection:bg-primary-purple selection:text-white relative">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className="relative">
        {currentPage === 'home' && (
          <>
            <Hero />
            <ProblemSection />
            <Features />
            <HowItWorks />
            <SocialProof />
            <FinalCTA />
          </>
        )}
        
        {currentPage === 'features' && (
          <FeaturesPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'how-it-works' && (
          <HowItWorksPage onNavigate={handleNavigate} />
        )}
      </main>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
