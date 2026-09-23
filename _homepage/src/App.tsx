import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource-variable/outfit';
import '@fontsource-variable/plus-jakarta-sans';
import React, { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { ParallaxTabStream } from './components/ParallaxTabStream';
import { InteractiveStageDemo } from './components/InteractiveStageDemo';
import { WorkflowSection } from './components/WorkflowSection';
import { FeatureShowcase } from './components/FeatureShowcase';
import { NewInTwo } from './components/NewInTwo';
import { CrashRecovery } from './components/CrashRecovery';
import { PrivacyVault } from './components/PrivacyVault';
import { ComparisonSection } from './components/ComparisonSection';
import { VideoSection } from './components/VideoSection';
import { FooterCTA } from './components/FooterCTA';
import { VideoModal } from './components/VideoModal';

export default function App() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // "user" turns the animations down for anyone who asked their system for less motion.
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1D1A16] selection:bg-[#c26b3c]/20 selection:text-[#c26b3c]">
        <Navbar onOpenVideo={() => setVideoModalOpen(true)} />

        <main className="flex-1">
          {/* 1. Hero slider: save and close, notes, cleanup, search */}
          <HeroSlider onExploreDemo={scrollToDemo} onOpenVideo={() => setVideoModalOpen(true)} />

          {/* 2. The problem */}
          <ParallaxTabStream />

          {/* 3. Save, close, continue in a simulated browser */}
          <InteractiveStageDemo />

          {/* 4. The three steps */}
          <WorkflowSection />

          {/* 5. Features */}
          <FeatureShowcase />

          {/* 5b. What the latest version added */}
          <NewInTwo />

          {/* 6. Crash recovery, the one to try for yourself */}
          <CrashRecovery />

          {/* 7. Privacy */}
          <PrivacyVault />

          {/* 8. Compared with what the browser already does */}
          <ComparisonSection />

          {/* 9. The 52-second story */}
          <VideoSection onOpenVideo={() => setVideoModalOpen(true)} />
        </main>

        <FooterCTA />

        <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />
      </div>
    </MotionConfig>
  );
}
