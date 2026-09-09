import React, { useState } from 'react';
import { BootSequence } from './components/BootSequence';
import { ScanlineOverlay } from './components/ScanlineOverlay';
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { LiveStats } from './components/LiveStats';
import { Rewards } from './components/Rewards';
import { Tokenomics } from './components/Tokenomics';
import { Roadmap } from './components/Roadmap';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {/* SVG noise filter */}
      <svg className="noise-filter" aria-hidden="true">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="overlay" />
        </filter>
      </svg>

      {/* CRT Scanlines */}
      <ScanlineOverlay />

      {/* Boot sequence overlay */}
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      {/* Main content */}
      <div style={{ opacity: booted ? 1 : 0, transition: 'opacity 0.4s ease', minHeight: '100vh' }}>
        <NavBar />
        <main>
          <Hero />
          <About />
          <LiveStats />
          <Rewards />
          <Tokenomics />
          <Roadmap />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
