import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Download, EyeOff, Hand, History, LifeBuoy, RotateCcw, Zap } from 'lucide-react';
import { CHROME_STORE_URL, CRASH_DEMO_TABS } from '../data/cairnData';
import { PANEL_FONT, TILE_CLASS, WORKSPACE_PALETTE, tileStyle } from './panelStyle';

/**
 * Crash recovery is the hardest feature to explain and the easiest to feel, so
 * the page lets you do the losing. The delays are the story, not decoration:
 * the captions change over two seconds and that pacing explains the feature.
 */
type Phase = 'open' | 'crashing' | 'restarted' | 'offered' | 'saved' | 'restored' | 'dismissed';

// Chrome brings back a couple of tabs on its own; Cairn offers the rest.
const SURVIVORS = 2;
const LOST = CRASH_DEMO_TABS.length - SURVIVORS;
const OPEN_CAPTION = 'Eleven tabs. Not one of them saved anywhere.';

// Numbers from the extension: a snapshot every minute, the last 5 kept, none older than a week.
const FACTS = [
  { Icon: Clock, value: 'Every minute', label: 'A snapshot of open tabs', text: 'Taken quietly in the background and kept on your device.', color: '#c26b3c' },
  { Icon: History, value: 'Last 5', label: 'Snapshots kept', text: 'Anything older than a week is thrown away.', color: '#6E7C4E' },
  { Icon: EyeOff, value: 'Never', label: 'Incognito tabs recorded', text: 'Private windows are left out of every snapshot.', color: '#b45309' },
  { Icon: Hand, value: 'Your call', label: 'What comes back', text: 'Nothing reopens by itself. Tabs you close while you work are never offered back.', color: '#0284c7' },
];

export const CrashRecovery: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('open');
  const [caption, setCaption] = useState(OPEN_CAPTION);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // The real card names the workspace after the day the tabs were last seen.
  const recoveredName = `Recovered ${new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;

  const later = (ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  };
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const crash = () => {
    setPhase('crashing');
    setCaption('Chrome closed unexpectedly.');
    later(700, () => {
      setPhase('restarted');
      setCaption(`Chrome restored two of them. The other ${LOST === 9 ? 'nine' : LOST} are gone.`);
    });
    later(1900, () => {
      setPhase('offered');
      setCaption('Cairn had been keeping track the whole time.');
    });
  };

  const reopenAll = () => {
    setPhase('restored');
    setCaption('All eleven back, exactly as they were. You never saved a thing.');
  };

  const saveAsWorkspace = () => {
    setPhase('saved');
    setCaption(`Saved as “${recoveredName}”. Continue brings all nine back whenever you want them.`);
  };

  const dismiss = () => {
    setPhase('dismissed');
    setCaption('Dismissed. Cairn won’t offer these tabs again.');
  };

  const reset = () => {
    clearTimers();
    setPhase('open');
    setCaption(OPEN_CAPTION);
  };

  const busy = phase === 'crashing' || phase === 'restarted';
  const tabGone = (i: number) => i >= SURVIVORS && (phase === 'restarted' || phase === 'offered' || phase === 'saved' || phase === 'dismissed');

  return (
    <section id="crash-recovery" className="py-24 lg:py-32 bg-[#F3EFE7] border-b border-[#E3DBCB] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-12 border border-[#DDD3C0] shadow-xl relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#c26b3c]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 relative">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F2] border border-[#DDD3C0] text-[#554E41] text-xs font-bold uppercase tracking-wider mb-3">
              <LifeBuoy className="w-3.5 h-3.5 text-[#c26b3c]" />
              <span>Crash recovery</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#1C1A17] tracking-tight">
              The tabs you never got round to saving
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#665F51]">Try losing them. Go on — nothing here is real.</p>
          </div>

          {/* Simulator */}
          <div className="mb-12 bg-[#FAF7F2] p-4 sm:p-8 rounded-2xl border border-[#E8E1D3] relative">
            <div className="relative rounded-xl bg-[#1D1B17] border border-[#3E3A33] overflow-hidden shadow-lg">
              {/* Tab strip */}
              <div className="bg-[#14120F] px-3 pt-2.5 pb-1.5 flex items-start gap-2 border-b border-white/10">
                <div className="flex items-center gap-1.5 pr-1 pt-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex flex-wrap gap-1 min-h-[30px]">
                  <AnimatePresence>
                    {CRASH_DEMO_TABS.map((tab, i) =>
                      tabGone(i) ? null : (
                        <motion.span
                          key={tab.title}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1, transition: { delay: phase === 'restored' ? (i - SURVIVORS) * 0.06 : 0 } }}
                          exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.2 } }}
                          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-t-md bg-[#2B2720] text-[#DDD4C3] text-[11px] font-medium"
                        >
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: tab.color }} />
                          <span>{tab.title}</span>
                        </motion.span>
                      ),
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Page */}
              <div className="relative min-h-[210px] p-5 sm:p-6 bg-[#161411]">
                <div className="space-y-2.5 max-w-sm" aria-hidden="true">
                  <div className="h-2.5 rounded-full bg-white/10 w-3/4" />
                  <div className="h-2.5 rounded-full bg-white/10 w-full" />
                  <div className="h-2.5 rounded-full bg-white/10 w-2/3" />
                </div>

                <AnimatePresence mode="wait">
                  {phase === 'offered' && (
                    <motion.div
                      key="offer"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      style={{ fontFamily: PANEL_FONT }}
                      className="mt-5 sm:absolute sm:right-6 sm:bottom-6 sm:mt-0 sm:w-[360px] p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] shadow-xl text-[#1C1A17]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-[13px]">{LOST} tabs didn’t come back</h4>
                          <p className="text-[11px] text-[#6E675A] mt-0.5">Open before the browser restarted · 40 seconds ago</p>
                        </div>
                        <button
                          onClick={dismiss}
                          aria-label="Dismiss recovery"
                          className="w-6 h-6 -mt-1 -mr-1 rounded-md text-[#453F34] hover:bg-[#EFE8DC] transition-colors shrink-0"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        <button
                          onClick={reopenAll}
                          className="px-2.5 py-1 rounded-lg text-[11.5px] font-semibold bg-[#c26b3c] hover:bg-[#a8592d] text-white transition-colors"
                        >
                          Reopen all
                        </button>
                        <button
                          onClick={saveAsWorkspace}
                          className="px-2.5 py-1 rounded-lg text-[11.5px] font-semibold bg-[#EFE8DC] hover:bg-[#E5DCCC] text-[#453F34] transition-colors"
                        >
                          Save as workspace
                        </button>
                        <button
                          onClick={() => setCaption('Review lets you tick just the ones you want, then reopen or save those.')}
                          className="px-2.5 py-1 rounded-lg text-[11.5px] font-semibold text-[#1C1A17] hover:bg-[#EFE8DC] transition-colors"
                        >
                          Review
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {phase === 'saved' && (
                    <motion.div
                      key="saved"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      style={{ fontFamily: PANEL_FONT }}
                      className="mt-5 sm:absolute sm:right-6 sm:bottom-6 sm:mt-0 sm:w-[360px] p-3 rounded-xl bg-white border border-[#E6DDCD] shadow-xl flex items-center justify-between gap-3 text-[#1C1A17]"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={TILE_CLASS} style={tileStyle(WORKSPACE_PALETTE[3], 34)}>
                          R
                        </span>
                        <div className="min-w-0">
                          <div className="text-[13px] font-semibold truncate">{recoveredName}</div>
                          <div className="text-[11px] text-[#6E675A]">{LOST} tabs · saved just now</div>
                        </div>
                      </div>
                      <button
                        onClick={reopenAll}
                        className="px-2.5 py-1 rounded-lg text-[11.5px] font-semibold bg-[#c26b3c] hover:bg-[#a8592d] text-white transition-colors shrink-0"
                      >
                        Continue
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* The crash itself */}
                <AnimatePresence>
                  {phase === 'crashing' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[#0B0A08]/90 flex items-center justify-center text-xs font-semibold text-[#8C8474]"
                    >
                      Chrome closed unexpectedly
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-sm font-semibold text-[#3D372E] text-center sm:text-left" aria-live="polite">
                {caption}
              </p>
              <button
                onClick={phase === 'open' ? crash : reset}
                disabled={busy}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors shrink-0 disabled:opacity-60 ${
                  phase === 'open' ? 'bg-[#1C1A17] hover:bg-[#332F2A] text-white' : 'bg-[#EFE8DC] hover:bg-[#E3DAC9] text-[#453F34]'
                }`}
              >
                {phase === 'open' ? <Zap className="w-4 h-4" /> : <RotateCcw className="w-4 h-4" />}
                <span>{phase === 'open' ? 'Crash it' : busy ? 'Crashing…' : 'Reset'}</span>
              </button>
            </div>
          </div>

          {/* What it keeps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {FACTS.map(({ Icon, value, label, text, color }) => (
              <div key={label} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D3] shadow-2xs">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${color}26`, color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-display font-black text-2xl text-[#1C1A17]">{value}</div>
                <div className="text-xs font-bold text-[#3A352B] mt-1">{label}</div>
                <p className="text-[11px] text-[#7A7365] mt-1 leading-snug">{text}</p>
              </div>
            ))}
          </div>

          {/* Quick CTA banner */}
          <div className="pt-6 border-t border-[#E8E1D3] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f2e6d2] to-[#e4d4bc] border border-[#e0d6c4] p-1.5 shrink-0">
                <img src="images/icon128.png" alt="" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-[#1C1A17]">It stays on your device, and it’s optional.</h3>
                <span className="text-xs text-[#7A7365]">Switch it off any time in Settings → Recover tabs after a crash.</span>
              </div>
            </div>

            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#c26b3c] hover:bg-[#a8592d] text-white text-xs font-bold shadow-sm transition-transform hover:-translate-y-0.5 shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Add to Chrome — Free</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
