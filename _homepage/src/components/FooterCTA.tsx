import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Download, ArrowUp, Mail, Shield } from 'lucide-react';
import { CHROME_STORE_URL, CONTACT_EMAIL, PAGES, SHORTCUTS, YOUTUBE_URL, MAKER_URL, MAKER_NAME } from '../data/cairnData';

export const FooterCTA: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setShowScrollTop(currentScroll > 400);
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1A16] text-[#E8E2D8] relative overflow-hidden">
      {/* Dynamic Warm Radial Glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-[#c26b3c]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Closing Call to Action Band */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-6"
        >
          {/* Logo Stone Emblem */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f2e6d2] to-[#dfceb3] p-2.5 mx-auto shadow-xl border border-white/20">
            <img src="images/icon128.png" alt="" className="w-full h-full object-contain rounded-xl" />
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-[1.08]">
            Find your way back to what you were doing.
          </h2>

          <p className="text-base sm:text-xl text-[#A69E8F] max-w-xl mx-auto font-normal">
            Free to install, right now. No account to create.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#c26b3c] hover:bg-[#a8592d] text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              id="footer-add-chrome-cta"
            >
              <Download className="w-5 h-5" />
              <span>Add to Chrome — It’s Free</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-3 text-xs text-[#8C8474]">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#6E7C4E]" /> Stored on your device
            </span>
            <span>·</span>
            <span>No telemetry</span>
            <span>·</span>
            <span>No account</span>
          </div>

          {/* Keyboard Shortcut Cheat Sheet */}
          <div className="mt-8 pt-8 border-t border-white/10 max-w-lg mx-auto">
            <div className="flex flex-wrap items-center justify-around gap-4 text-xs text-[#8C8474]">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white/10 border border-white/15 rounded-md font-mono text-white text-[11px]">
                  {SHORTCUTS.open}
                </kbd>
                <span>Open Cairn</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white/10 border border-white/15 rounded-md font-mono text-white text-[11px]">
                  {SHORTCUTS.palette}
                </kbd>
                <span>Command palette</span>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-[#6F685B]">On a Mac, use ⌘ instead of Ctrl.</p>
          </div>
        </motion.div>
      </div>

      {/* Subfooter */}
      <div className="border-t border-white/10 py-8 bg-[#14120F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#807767]">
          <span>
            © 2026 Cairn · Made by{' '}
            <a
              href={MAKER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9A907E] hover:text-white underline underline-offset-2 transition-colors"
            >
              {MAKER_NAME}
            </a>
          </span>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <a href={PAGES.guide} className="hover:text-white transition-colors">
              Guide
            </a>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Video
            </a>
            <a href={PAGES.changelog} className="hover:text-white transition-colors">
              What’s New
            </a>
            <a href={PAGES.privacy} className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href={PAGES.support} className="hover:text-white transition-colors">
              Support
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button with Scroll Progress Ring */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 z-40 w-12 h-12 rounded-full bg-[#c26b3c] hover:bg-[#a8592d] text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Scroll back to top"
        >
          {/* Circular progress SVG */}
          <svg className="w-12 h-12 absolute -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="20" className="text-white/20" strokeWidth="3" stroke="currentColor" fill="transparent" />
            <circle
              cx="24"
              cy="24"
              r="20"
              className="text-white"
              strokeWidth="3"
              strokeDasharray={125.6}
              strokeDashoffset={125.6 - (125.6 * scrollProgress) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>
          <ArrowUp className="w-5 h-5 relative z-10" />
        </button>
      )}
    </footer>
  );
};
