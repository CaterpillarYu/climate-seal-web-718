import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Solutions from './components/Solutions';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProductTrial1 from './components/ProductTrial1';
import ProductTrial2 from './components/ProductTrial2';
import Pricing from './components/Pricing';

function App() {
  const [showTrial1, setShowTrial1] = useState(false);
  const [showTrial2, setShowTrial2] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  return (
    <LanguageProvider>
      <AppContent 
        showTrial1={showTrial1} 
        setShowTrial1={setShowTrial1}
        showTrial2={showTrial2}
        setShowTrial2={setShowTrial2}
        showPricing={showPricing}
        setShowPricing={setShowPricing}
      />
    </LanguageProvider>
  );
}

function AppContent({ showTrial1, setShowTrial1, showTrial2, setShowTrial2, showPricing, setShowPricing }: {
  showTrial1: boolean;
  setShowTrial1: (show: boolean) => void;
  showTrial2: boolean;
  setShowTrial2: (show: boolean) => void;
  showPricing: boolean;
  setShowPricing: (show: boolean) => void;
}) {
  const goHome = () => {
    setShowTrial1(false);
    setShowTrial2(false);
    setShowPricing(false);
  };

  if (showTrial1) {
    return <ProductTrial1 onBack={goHome} />;
  }

  if (showTrial2) {
    return <ProductTrial2 onBack={goHome} />;
  }

  if (showPricing) {
    return (
      <div className="min-h-screen">
        <Header isHomePage={false} onGoHome={goHome} />
        <div className="pt-20">
          <Pricing />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header onViewPricing={() => setShowPricing(true)} onGoHome={goHome} />
      <Hero onStartCalculator={() => setShowTrial2(true)} onViewPricing={() => setShowPricing(true)} />
      <Solutions />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;