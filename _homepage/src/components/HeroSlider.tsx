import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Download,
  Layers,
  Search,
  Trash2,
  Play,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  NotebookPen,
  X,
  Check,
} from 'lucide-react';
import { HERO_SLIDES, DEMO_TABS, CHROME_STORE_URL, SHORTCUTS } from '../data/cairnData';
import { TILE_CLASS, WORKSPACE_PALETTE, tileStyle } from './panelStyle';

interface HeroSliderProps {
  onExploreDemo?: () => void;
  onOpenVideo?: () => void;
}

/** The first slide's little loop: save, close, continue — the same order as in Cairn. */
type LoopPhase = 'unsaved' | 'saved' | 'closed' | 'back';

const HERO_TABS = DEMO_TABS.slice(0, 8);
const HERO_GROUPS = new Set(HERO_TABS.map((t) => t.group)).size;
const WORKSPACE_NAME = 'Client Website Launch';

const LOOP_TIPS: Record<LoopPhase, string> = {
  unsaved: 'Try it: save the tabs, close them, then bring them back with Continue.',
  saved: 'Saved. The tabs are still open — saving never closes anything.',
  closed: `All ${HERO_TABS.length} closed. The workspace still has every one.`,
  back: 'Every tab is back, in its group. Close them again, or start over.',
};

export const HeroSlider: React.FC<HeroSliderProps> = ({ onExploreDemo, onOpenVideo }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [phase, setPhase] = useState<LoopPhase>('unsaved');
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentSlide = HERO_SLIDES[currentSlideIndex];
  const tabsOpen = phase !== 'closed';

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    autoPlayTimerRef.current = setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8500);

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [currentSlideIndex, isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentSlideIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handleSelectSlide = (idx: number) => {
    setIsAutoPlaying(false);
    setCurrentSlideIndex(idx);
  };

  // Arrow keys change slides, except while someone is typing in one of the demos.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target;
      if (target instanceof Element && target.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const advanceLoop = () => {
    setPhase((p) => (p === 'unsaved' ? 'saved' : p === 'closed' ? 'back' : 'closed'));
  };

  const loopButton =
    phase === 'unsaved'
      ? { label: 'Save as workspace', Icon: Layers, className: 'bg-[#c26b3c] text-white hover:bg-[#a8592d]' }
      : phase === 'closed'
        ? { label: 'Continue', Icon: RotateCcw, className: 'bg-[#6E7C4E] text-white hover:bg-[#5b673f]' }
        : { label: 'Close all tabs', Icon: X, className: 'bg-white/15 text-[#EFE9DC] hover:bg-white/25 border border-white/15' };

  return (
    <section
      id="slider-showcase"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden border-b border-[#E8E2D8]"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Dynamic Ambient Background Glow shifting with slide accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 -z-10 pointer-events-none opacity-40 blur-3xl transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle, ${currentSlide.accentColor}33 0%, rgba(250, 247, 242, 0) 70%)`,
        }}
      />

      {/* Decorative Stone cairn silhouettes in background */}
      <div className="absolute -left-12 top-48 w-40 h-40 bg-[#EFE9DC]/60 rounded-full blur-2xl -z-10 pointer-events-none" />
      <div className="absolute right-0 top-32 w-72 h-72 bg-[#E9E1D1]/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Eyebrow Ribbon */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex flex-wrap justify-center items-center gap-x-2.5 gap-y-1 px-4 py-1.5 rounded-full bg-[#EFE8DC] border border-[#DDD4C3] text-xs font-semibold text-[#665F52] shadow-2xs"
          >
            <span className="line-through text-[#9E9789] decoration-[#c26b3c]/60">
              Bookmarks are for pages you’ll want someday.
            </span>
            <span className="text-[#c26b3c] font-bold">Cairn is for right now.</span>
          </motion.div>
        </div>

        {/* Main Split Grid: Bold Editorial Typography on Left / Creative Interactive Stage on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bold Typography & Slide Description */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="space-y-4"
              >
                {/* Slide Category Badge */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: currentSlide.accentColor }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentSlide.badge}</span>
                </div>

                {/* Bold Display Headline with Editorial Italic Accent */}
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#1D1A16] leading-[1.08]">
                  {currentSlide.title}{' '}
                  <span
                    className="font-editorial italic font-normal underline decoration-[#c26b3c]/40 underline-offset-4"
                    style={{ color: currentSlide.accentColor }}
                  >
                    {currentSlide.highlight}
                  </span>
                </h1>

                {/* Subtitle description */}
                <p className="text-base sm:text-lg text-[#5E584C] max-w-xl font-normal leading-relaxed">
                  {currentSlide.subtitle}
                </p>

                {/* Slide Tagline */}
                <div className="flex items-center gap-2 text-xs font-semibold text-[#7A7467]">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentSlide.accentColor }} />
                  <span>{currentSlide.tagline}</span>
                </div>

                {/* Micro Stats Row */}
                <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-[#E8E1D3]">
                  {currentSlide.stats.map((st, i) => (
                    <div key={i} className="bg-white/70 border border-[#E8E1D3] rounded-xl p-2.5 shadow-2xs">
                      <div className="text-[11px] font-medium text-[#7C7567] uppercase tracking-wider truncate">
                        {st.label}
                      </div>
                      <div className="text-sm sm:text-lg font-bold font-display text-[#1D1A16] leading-tight">
                        {st.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Primary Actions */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <a
                    href={CHROME_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#c26b3c] hover:bg-[#a8592d] text-white shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                    id="hero-add-chrome-cta"
                  >
                    <Download className="w-4 h-4" />
                    <span>Add to Chrome</span>
                    <span className="bg-black/15 px-2 py-0.5 rounded text-xs">Free</span>
                  </a>

                  {onExploreDemo && (
                    <button
                      onClick={onExploreDemo}
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-white hover:bg-[#FAF7F2] text-[#221F1B] border border-[#D9D1C2] hover:border-[#C4B9A4] shadow-2xs transition-all"
                    >
                      <Layers className="w-4 h-4 text-[#c26b3c]" />
                      <span>Try the demo</span>
                    </button>
                  )}

                  {onOpenVideo && (
                    <button
                      onClick={onOpenVideo}
                      className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-medium text-xs text-[#5F594D] hover:text-[#1D1A16] hover:bg-[#F2ECE1] transition-colors"
                      title="Watch the 52-second story"
                    >
                      <Play className="w-3.5 h-3.5 text-[#c26b3c]" />
                      <span>Watch (0:52)</span>
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation Dots & Thumbnails */}
            <div className="pt-8 flex items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => handleSelectSlide(idx)}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      currentSlideIndex === idx
                        ? 'bg-[#221F1B] text-white shadow-xs'
                        : 'bg-[#EDE7DA] text-[#6E685B] hover:bg-[#E3DCCF]'
                    }`}
                    aria-label={`Go to slide ${idx + 1}: ${slide.badge}`}
                    aria-current={currentSlideIndex === idx}
                  >
                    <span
                      className={`w-2 h-2 rounded-full transition-transform ${
                        currentSlideIndex === idx ? 'scale-125' : 'group-hover:scale-110'
                      }`}
                      style={{ backgroundColor: slide.accentColor }}
                    />
                    <span className="hidden sm:inline">{slide.badge}</span>
                    <span className="sm:hidden">{idx + 1}</span>
                  </button>
                ))}
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full bg-white border border-[#D9D1C2] hover:bg-[#F2ECE1] text-[#221F1B] flex items-center justify-center shadow-2xs transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full bg-white border border-[#D9D1C2] hover:bg-[#F2ECE1] text-[#221F1B] flex items-center justify-center shadow-2xs transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Creative Visual Canvas & Interactive Live Widget */}
          <div className="lg:col-span-6 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -15 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative"
              >
                {/* Visual Frame styled like a stone altar / browser window */}
                <div className="relative rounded-2xl bg-[#1C1A17] p-2.5 sm:p-3 shadow-2xl border border-[#3E3A33]/70 overflow-hidden">
                  {/* Browser Window Header Chrome */}
                  <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-white/10 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20" />
                      <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20" />
                      <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20" />
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[11px] text-[#A69E8F] font-mono">
                      <ShieldCheck className="w-3 h-3 text-[#6E7C4E]" />
                      <span>Cairn · side panel</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#A69E8F]">
                      <span className="w-2 h-2 rounded-full bg-[#6E7C4E]" />
                      <span className="text-[10px] uppercase font-semibold">On this device</span>
                    </div>
                  </div>

                  {/* Slide-specific Creative Display */}
                  {currentSlide.id === 'save-close' && (
                    <div className="relative bg-[#25221D] rounded-xl p-3 sm:p-4 overflow-hidden min-h-[380px] flex flex-col justify-between">
                      {/* Top bar with simulated tab strip */}
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-[#DDD4C3] whitespace-nowrap">Open tabs</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#c26b3c]/20 text-[#E87334] font-bold whitespace-nowrap">
                              {tabsOpen ? `${HERO_TABS.length} tabs open` : '0 tabs open'}
                            </span>
                          </div>

                          <button
                            onClick={advanceLoop}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shadow-sm ${loopButton.className}`}
                          >
                            <loopButton.Icon className="w-3.5 h-3.5" />
                            <span>{loopButton.label}</span>
                          </button>
                        </div>

                        {/* Interactive Tab Strip Simulation */}
                        <div className="relative min-h-[140px] bg-[#171512] rounded-lg p-2 border border-white/5 flex flex-wrap gap-1.5 items-start">
                          <AnimatePresence>
                            {tabsOpen ? (
                              HERO_TABS.map((tab, idx) => (
                                <motion.div
                                  key={tab.id}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{
                                    opacity: 0,
                                    scale: 0.2,
                                    y: 80,
                                    transition: { duration: 0.3, delay: idx * 0.03 },
                                  }}
                                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[#2B2822] text-[#E8E2D8] border border-white/10 text-xs font-medium max-w-[150px] truncate shadow-2xs hover:border-[#c26b3c]/50 transition-colors"
                                >
                                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: tab.color }} />
                                  <span className="truncate">{tab.title.split('—')[0]}</span>
                                </motion.div>
                              ))
                            ) : (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full h-full min-h-[120px] flex flex-col items-center justify-center text-center p-4 text-[#8C8474]"
                              >
                                <div className="w-10 h-10 rounded-xl bg-[#c26b3c]/15 text-[#c26b3c] flex items-center justify-center mb-2">
                                  <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-semibold text-[#DDD4C3]">Nothing lost</span>
                                <span className="text-xs text-[#9E9584]">
                                  All {HERO_TABS.length} tabs are saved in “{WORKSPACE_NAME}”
                                </span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Saved Workspace preview banner below */}
                      {phase === 'unsaved' ? (
                        <div className="mt-3 p-3 rounded-xl border border-dashed border-[#484236] text-center">
                          <div className="text-xs font-bold text-[#DDD4C3]">Nothing saved yet</div>
                          <div className="text-[11px] text-[#A69E8F]">
                            These {HERO_TABS.length} tabs only exist in this window.
                          </div>
                        </div>
                      ) : (
                        <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-[#201D19] to-[#2B2720] border border-[#484236] flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <span className={`${TILE_CLASS} text-base`} style={tileStyle(WORKSPACE_PALETTE[0], 40, true)}>
                              C
                            </span>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-white flex flex-wrap items-center gap-1.5">
                                <span>{WORKSPACE_NAME}</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/15 text-[#DDD4C3]">
                                  {phase === 'saved' ? 'Saved just now' : phase === 'closed' ? 'Saved' : 'Opened just now'}
                                </span>
                              </div>
                              <div className="text-[11px] text-[#A69E8F]">
                                {HERO_TABS.length} tabs · {HERO_GROUPS} groups · pinned tabs kept
                              </div>
                            </div>
                          </div>

                          {phase === 'closed' ? (
                            <button
                              onClick={advanceLoop}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#c26b3c] hover:bg-[#a8592d] text-white transition-colors shrink-0"
                            >
                              Continue
                            </button>
                          ) : phase === 'back' ? (
                            <button
                              onClick={() => setPhase('unsaved')}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-[#DDD4C3] border border-white/15 transition-colors shrink-0"
                            >
                              Start over
                            </button>
                          ) : null}
                        </div>
                      )}

                      {/* Micro badge indicator */}
                      <div className="mt-2 text-center" aria-live="polite">
                        <span className="text-[11px] text-[#7A7365] italic">{LOOP_TIPS[phase]}</span>
                      </div>
                    </div>
                  )}

                  {currentSlide.id === 'context-notes' && (
                    <div className="relative rounded-xl overflow-hidden bg-[#221F1B] p-2">
                      <img
                        src="images/panel-notes.webp"
                        alt="A Cairn workspace with its tabs and notes"
                        className="w-full h-auto rounded-lg object-cover shadow-inner"
                      />
                      <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#1C1A17]/90 backdrop-blur-md border border-white/15 flex items-center justify-between gap-2 text-xs text-[#E8E2D8]">
                        <div className="flex items-center gap-2">
                          <NotebookPen className="w-4 h-4 text-[#6E7C4E] shrink-0" />
                          <span>Each workspace keeps its own notes, right beside its tabs.</span>
                        </div>
                        <span className="text-[11px] font-bold text-[#6E7C4E] shrink-0">Pin · edit · search</span>
                      </div>
                    </div>
                  )}

                  {currentSlide.id === 'cleanup' && (
                    <div className="relative rounded-xl overflow-hidden bg-[#221F1B] p-2">
                      <img
                        src="images/panel-cleanup.webp"
                        alt="Cairn Cleanup listing duplicate and old tabs"
                        className="w-full h-auto rounded-lg object-cover shadow-inner"
                      />
                      <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#1C1A17]/90 backdrop-blur-md border border-white/15 flex items-center justify-between gap-2 text-xs text-[#E8E2D8]">
                        <div className="flex items-center gap-2">
                          <Trash2 className="w-4 h-4 text-[#B45309] shrink-0" />
                          <span>Nothing closes until you confirm it.</span>
                        </div>
                        <span className="text-[11px] font-bold text-[#B45309] shrink-0">You decide</span>
                      </div>
                    </div>
                  )}

                  {currentSlide.id === 'search' && (
                    <div className="relative rounded-xl overflow-hidden bg-[#221F1B] p-2">
                      <img
                        src="images/panel-search.webp"
                        alt="Cairn search results grouped by source"
                        className="w-full h-auto rounded-lg object-cover shadow-inner"
                      />
                      <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#1C1A17]/90 backdrop-blur-md border border-white/15 flex items-center justify-between gap-2 text-xs text-[#E8E2D8]">
                        <div className="flex items-center gap-2">
                          <Search className="w-4 h-4 text-[#3B82F6] shrink-0" />
                          <span>Open tabs, workspaces, notes, bookmarks and history.</span>
                        </div>
                        <span className="text-[11px] font-mono text-[#3B82F6] font-bold shrink-0">{SHORTCUTS.open}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Creative Floating Parallax Pill Badges */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-[#D9D1C2] shadow-lg text-xs font-bold text-[#221F1B]"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#6E7C4E]/15 text-[#6E7C4E] flex items-center justify-center">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span>Stored on your device</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#c26b3c] text-white shadow-lg text-xs font-bold"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>No account needed</span>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
