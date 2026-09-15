import React, { useState, useEffect } from 'react';
import { Download, Film } from 'lucide-react';
import { CHROME_STORE_URL, PAGES } from '../data/cairnData';

interface NavbarProps {
  onOpenVideo?: () => void;
}

const NAV_LINKS = [
  { href: '#demo', label: 'Demo', dot: true },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#crash-recovery', label: 'Crash recovery' },
  { href: '#privacy', label: 'Privacy' },
  { href: PAGES.guide, label: 'Guide' },
];

const MOBILE_ONLY_LINKS = [
  { href: PAGES.changelog, label: 'What’s new' },
  { href: PAGES.support, label: 'Support' },
];

const SECTION_IDS = NAV_LINKS.filter((link) => link.href.startsWith('#')).map((link) => link.href.slice(1));

/**
 * The section under the upper third of the screen, if the menu has a link for it.
 * Between those sections (the hero, the comparison, the video) nothing is highlighted.
 */
function useActiveSection(): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      const hit = SECTION_IDS.find((id) => {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        return !!rect && rect.top <= line && rect.bottom > line;
      });
      setActive(hit ?? null);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return active;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenVideo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const isActive = (href: string) => activeSection !== null && href === `#${activeSection}`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8E2D8] py-3 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c26b3c] rounded-xl"
            aria-label="Cairn home"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#f2e6d2] to-[#e4d4bc] p-1.5 shadow-xs border border-[#e0d6c4] group-hover:scale-105 transition-transform duration-200">
              <img src="images/icon128.png" alt="" className="w-full h-full object-contain rounded-lg" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-tight text-[#221F1B]">Cairn</span>
              <span className="text-[11px] text-[#7A7467] -mt-1 hidden sm:inline-block font-normal">
                find your way back
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#F5F0E6]/80 backdrop-blur-md border border-[#E8E1D3] px-3 py-1.5 rounded-full shadow-2xs">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'true' : undefined}
                className={`px-3.5 py-1 text-sm font-medium whitespace-nowrap rounded-full transition-colors flex items-center gap-1 ${
                  isActive(link.href)
                    ? 'bg-white text-[#221F1B] shadow-2xs'
                    : 'text-[#5F594D] hover:text-[#221F1B] hover:bg-white/70'
                }`}
              >
                <span>{link.label}</span>
                {link.dot && <span className="w-1.5 h-1.5 rounded-full bg-[#c26b3c]" />}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            {onOpenVideo && (
              <button
                onClick={onOpenVideo}
                className="hidden sm:inline-flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-semibold text-[#5F594D] bg-[#EFE9DC] hover:bg-[#E6DECF] border border-[#DDD3C0] transition-colors"
                title="Watch the 52-second story"
              >
                <Film className="w-3.5 h-3.5 text-[#c26b3c]" />
                <span>Watch (0:52)</span>
              </button>
            )}

            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-semibold text-sm bg-[#c26b3c] hover:bg-[#a55b33] text-white shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              id="nav-add-to-chrome-btn"
            >
              <Download className="w-4 h-4" />
              <span>Add to Chrome</span>
              <span className="hidden xl:inline text-xs font-normal opacity-90 border-l border-white/30 pl-2">Free</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-[#5F594D] hover:bg-[#EFE9DC]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 p-4 bg-[#FAF7F2] border border-[#E8E1D3] rounded-2xl shadow-xl space-y-2">
            {[...NAV_LINKS, ...MOBILE_ONLY_LINKS].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive(link.href) ? 'true' : undefined}
                className={`block px-3 py-2 text-sm font-medium text-[#221F1B] rounded-lg ${
                  isActive(link.href) ? 'bg-[#EFE8DC]' : 'hover:bg-[#F2ECE1]'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-[#E8E1D3]">
              <a
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-[#c26b3c] text-white"
              >
                <Download className="w-4 h-4" />
                Add to Chrome — Free
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
