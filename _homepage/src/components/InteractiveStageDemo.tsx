import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, MousePointer, Check, Compass, FolderPlus, X, Moon, Settings, Search } from 'lucide-react';
import { DEMO_TABS, SHORTCUTS } from '../data/cairnData';
import { PANEL_FONT, TILE_CLASS, WORKSPACE_PALETTE, tileStyle } from './panelStyle';

const WORKSPACE_TABS = DEMO_TABS.slice(0, 10);
const TAB_COUNT = WORKSPACE_TABS.length;
const GROUP_COUNT = new Set(WORKSPACE_TABS.map((t) => t.group)).size;
const IDLE_CAPTION = 'Press “Play the tour”, or try it yourself below.';
const PANEL_TABS = ['Overview', 'Workspaces', 'Tabs', 'Cleanup'];
const CONTINUE_HELP = `Opens this workspace’s ${TAB_COUNT} tabs in this window, with their groups and pinned tabs. Tabs you already have open stay open and aren’t opened twice. Nothing is closed.`;

/** The panel's "?" beside an action. Here it puts its explanation in the caption. */
const HelpDot: React.FC<{ label: string; text: string; onExplain: (text: string) => void }> = ({ label, text, onExplain }) => (
  <button
    type="button"
    aria-label={label}
    title={text}
    onClick={() => onExplain(text)}
    className="w-[18px] h-[18px] shrink-0 rounded-full border border-[#E6DDCD] text-[#6E675A] text-[10px] font-bold leading-none flex items-center justify-center hover:text-[#1C1A17] hover:border-[#6E675A] transition-colors"
  >
    ?
  </button>
);

export const InteractiveStageDemo: React.FC = () => {
  const [isPlayingAutoTour, setIsPlayingAutoTour] = useState(false);
  const [tourStep, setTourStep] = useState(0); // 0 new workspace, 1 save, 2 close tabs, 3 continue, 4 done
  const [modalOpen, setModalOpen] = useState(false);
  const [saveMode, setSaveMode] = useState<'all' | 'pick'>('all');
  const [workspaceName, setWorkspaceName] = useState('Client Website Launch');
  const [isWorkspaceSaved, setIsWorkspaceSaved] = useState(false);
  const [wasReopened, setWasReopened] = useState(false);
  const [areTabsOpenInBrowser, setAreTabsOpenInBrowser] = useState(true);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false, clicking: false });
  const [tourCaption, setTourCaption] = useState(IDLE_CAPTION);
  const [progressPercent, setProgressPercent] = useState(0);

  const frameRef = useRef<HTMLDivElement>(null);
  const newWorkspaceRef = useRef<HTMLButtonElement>(null);
  const saveRef = useRef<HTMLButtonElement>(null);
  const closeTabsRef = useRef<HTMLButtonElement>(null);
  const continueRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const name = workspaceName.trim() || 'Untitled workspace';

  const later = (ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  };
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  // The tour cursor aims at the real buttons, so it lands correctly at any screen width.
  const moveCursorTo = (el: HTMLElement | null) => {
    const frame = frameRef.current;
    if (!frame || !el) return;
    const f = frame.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setCursor({ x: r.left - f.left + r.width / 2, y: r.top - f.top + r.height / 2, visible: true, clicking: false });
  };
  const press = () => setCursor((c) => ({ ...c, clicking: true }));

  const resetDemo = () => {
    clearTimers();
    setIsPlayingAutoTour(false);
    setTourStep(0);
    setModalOpen(false);
    setSaveMode('all');
    setIsWorkspaceSaved(false);
    setWasReopened(false);
    setAreTabsOpenInBrowser(true);
    setWorkspaceName('Client Website Launch');
    setCursor({ x: 0, y: 0, visible: false, clicking: false });
    setTourCaption(IDLE_CAPTION);
    setProgressPercent(0);
  };

  // Automated tour: save, close, continue — in the order it happens in Cairn.
  useEffect(() => {
    if (!isPlayingAutoTour) return;

    if (tourStep === 0) {
      setTourCaption(`1. ${TAB_COUNT} tabs open. Click “+ New Workspace” in Cairn.`);
      setProgressPercent(10);
      moveCursorTo(newWorkspaceRef.current);
      later(1200, () => {
        press();
        later(400, () => {
          setModalOpen(true);
          setTourStep(1);
        });
      });
    } else if (tourStep === 1) {
      setTourCaption('2. Name it and save — all tabs, or just the ones you pick.');
      setProgressPercent(35);
      moveCursorTo(saveRef.current);
      later(1400, () => {
        press();
        later(500, () => {
          setModalOpen(false);
          setIsWorkspaceSaved(true);
          setTourStep(2);
        });
      });
    } else if (tourStep === 2) {
      setTourCaption('3. Saved. Now close the tabs — or the whole browser.');
      setProgressPercent(60);
      moveCursorTo(closeTabsRef.current);
      later(1600, () => {
        press();
        later(400, () => {
          setAreTabsOpenInBrowser(false);
          setTourStep(3);
        });
      });
    } else if (tourStep === 3) {
      setTourCaption('4. Nothing lost. Click “Continue” when you want them back.');
      setProgressPercent(85);
      moveCursorTo(continueRef.current);
      later(1600, () => {
        press();
        later(400, () => {
          setAreTabsOpenInBrowser(true);
          setWasReopened(true);
          setTourStep(4);
        });
      });
    } else if (tourStep === 4) {
      setTourCaption('5. Every tab is back, in its group, with pinned tabs still pinned.');
      setProgressPercent(100);
      setCursor((c) => ({ ...c, visible: false, clicking: false }));
      later(3500, () => setIsPlayingAutoTour(false));
    }

    return clearTimers;
  }, [isPlayingAutoTour, tourStep]);

  // Manual handlers
  const openSaveModal = () => {
    setModalOpen(true);
    setTourCaption('Name the workspace and save it.');
  };

  const handleManualSave = () => {
    setModalOpen(false);
    setIsWorkspaceSaved(true);
    setTourCaption('Saved. The tabs are still open — close them whenever you like.');
  };

  const handleCloseTabs = () => {
    setAreTabsOpenInBrowser(false);
    setTourCaption('Tabs closed. Click “Continue” whenever you want them back.');
  };

  const handleContinue = () => {
    if (areTabsOpenInBrowser) {
      setTourCaption(`All ${TAB_COUNT} tabs are already open, so Cairn doesn’t open them twice.`);
      return;
    }
    setAreTabsOpenInBrowser(true);
    setWasReopened(true);
    setTourCaption('Every tab reopened, in its group, with pinned tabs still pinned.');
  };

  return (
    <section id="demo" className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-[#E8E1D3] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3EFE7] text-[#6E685B] text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-[#c26b3c]" />
            <span>See it work</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#1C1A17] tracking-tight">
            Save, close, continue
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#5F584C]">
            The whole loop, simulated. Nothing here touches your real browser.
          </p>
        </div>

        {/* Simulator Control Bar */}
        <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 p-3 bg-white border border-[#E3DCCE] rounded-2xl shadow-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (isPlayingAutoTour) {
                  clearTimers();
                  setIsPlayingAutoTour(false);
                  setCursor((c) => ({ ...c, visible: false }));
                } else {
                  resetDemo();
                  setIsPlayingAutoTour(true);
                }
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-all ${
                isPlayingAutoTour ? 'bg-[#1C1A17] text-white hover:bg-[#332F2A]' : 'bg-[#c26b3c] hover:bg-[#a8592d] text-white'
              }`}
            >
              {isPlayingAutoTour ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause the tour</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play the tour</span>
                </>
              )}
            </button>

            <button
              onClick={resetDemo}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#665F51] bg-[#F4EFE6] hover:bg-[#EBE3D3] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Current Step Caption Pill */}
          <div className="flex-1 min-w-[200px] text-center sm:text-right" aria-live="polite">
            <span className="inline-block text-xs font-semibold text-[#3D372E] px-3 py-1 bg-[#FAF7F2] rounded-lg border border-[#E8E1D3]">
              {tourCaption}
            </span>
          </div>
        </div>

        {/* Simulated Browser Frame */}
        <div
          ref={frameRef}
          className="max-w-5xl mx-auto rounded-2xl bg-[#1D1B17] border border-[#3E3A33] shadow-2xl overflow-hidden relative"
        >
          {/* Progress bar line */}
          <div className="w-full h-1 bg-white/10">
            <motion.div
              className="h-full bg-[#c26b3c]"
              style={{ width: `${progressPercent}%` }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
            />
          </div>

          {/* Chrome Top Tab Strip */}
          <div className="bg-[#14120F] px-3 pt-2.5 flex items-center gap-2 border-b border-white/10 overflow-x-auto select-none">
            {/* Window Controls */}
            <div className="flex items-center gap-1.5 pr-2 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>

            {/* Browser Tabs Row */}
            <div className="flex items-center gap-1 overflow-x-auto py-1">
              <AnimatePresence>
                {areTabsOpenInBrowser ? (
                  WORKSPACE_TABS.map((tab, idx) => (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.6, y: -20, transition: { duration: 0.25, delay: idx * 0.02 } }}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-t-lg text-[11px] font-medium transition-colors shrink-0 max-w-[140px] truncate ${
                        idx === 0
                          ? 'bg-[#2B2720] text-[#EFE9DC] border-t-2 border-[#c26b3c]'
                          : 'bg-[#1D1A16] text-[#A69E8F] hover:bg-[#25221D]'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: tab.color }} />
                      <span className="truncate">{tab.title.split('—')[0]}</span>
                    </motion.div>
                  ))
                ) : (
                  <div className="px-3 py-1.5 text-xs text-[#807768] italic">
                    {TAB_COUNT} tabs closed · saved in “{name}”
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* URL address bar row */}
          <div className="bg-[#1D1B17] px-4 py-2 border-b border-white/10 flex items-center justify-between gap-2 text-xs text-[#9E9687]">
            <div className="flex items-center gap-2 bg-[#2B2720] px-3 py-1 rounded-lg border border-white/10 w-full max-w-sm min-w-0">
              <span className="text-[#6E7C4E]">🔒</span>
              <span className="font-mono text-[11px] text-[#DDD4C3] truncate">https://client-website-project.com</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] shrink-0">
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono">
                {areTabsOpenInBrowser ? `${TAB_COUNT} tabs open` : '0 tabs open'}
              </span>
              <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-[#c26b3c]/20 text-[#E87334] font-semibold">
                <span>Cairn</span>
              </div>
            </div>
          </div>

          {/* Main Stage: Browser Page Body + Cairn Extension Side Panel */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px] bg-[#110F0D]">
            {/* Left Area: Simulated Active Webpage */}
            <div className="md:col-span-7 p-6 flex flex-col justify-center items-center text-center border-r border-white/10 bg-[#161411]">
              {!areTabsOpenInBrowser ? (
                <div className="space-y-4 max-w-md p-6 rounded-2xl bg-[#1C1A16] border border-[#6E7C4E]/30 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#6E7C4E]/20 text-[#6E7C4E] flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-white">Nothing lost</h4>
                    <p className="text-xs text-[#A69E8F] mt-1">
                      The tabs are closed, and the workspace remembers every one. Click “Continue” in the panel whenever
                      you’re ready.
                    </p>
                  </div>
                </div>
              ) : isWorkspaceSaved ? (
                <div className="space-y-3 max-w-md p-6 rounded-2xl bg-[#201D18] border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-[#6E7C4E]/20 text-[#6E7C4E] flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Saved as “{name}”</h4>
                  <p className="text-xs text-[#A69E8F] leading-relaxed">
                    Saving doesn’t close anything. Close these tabs, or the whole browser — the workspace has them all.
                  </p>
                  <button
                    ref={closeTabsRef}
                    onClick={handleCloseTabs}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 text-[#EFE9DC] text-xs font-bold hover:bg-white/20 border border-white/15 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Close all {TAB_COUNT} tabs</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-w-md p-6 rounded-2xl bg-[#201D18] border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-[#c26b3c]/20 text-[#c26b3c] flex items-center justify-center mx-auto text-xl font-bold">
                    🚀
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">{TAB_COUNT} tabs, one project</h4>
                  <p className="text-xs text-[#A69E8F] leading-relaxed">
                    You’re deep in work across a pile of tabs. Instead of bookmarking them one by one, save them as a
                    workspace before you close anything.
                  </p>
                  <button
                    onClick={openSaveModal}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#c26b3c] text-white text-xs font-bold hover:bg-[#a8592d] transition-colors shadow-xs"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                    <span>Save these tabs to Cairn</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right Area: the Cairn side panel, drawn to match the extension */}
            <div
              className="md:col-span-5 bg-[#FAF7F2] text-[#1C1A17] flex flex-col border-t md:border-t-0 border-[#E6DDCD] relative"
              style={{ fontFamily: PANEL_FONT }}
            >
              <div className="px-4 pt-3 pb-2.5 flex flex-col gap-2.5">
                {/* Header: brand, Local-first, light/dark, settings */}
                <div className="flex items-center justify-between pb-2.5 border-b border-[#ECE5D9]">
                  <div className="flex items-center gap-2">
                    <img src="images/icon128.png" alt="" className="w-5 h-5 rounded" />
                    <span className="font-bold text-[15px]">Cairn</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#453F34]">
                    <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-[#EFE8DC] text-[#6E675A]">
                      Local-first
                    </span>
                    <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                    <Settings className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                </div>

                {/* Search */}
                <div className="flex items-center gap-2 h-8 px-3 rounded-[10px] border border-[#E6DDCD] bg-white text-[12px] text-[#6E675A]">
                  <Search className="w-3 h-3" aria-hidden="true" />
                  <span>Search everything…</span>
                </div>

                {/* Sections; this demo stays on Workspaces */}
                <div className="flex gap-0.5 p-[3px] rounded-[10px] bg-[#EFE8DC]">
                  {PANEL_TABS.map((label) => (
                    <span
                      key={label}
                      className={`flex-1 min-w-0 text-center py-1.5 rounded-lg text-[11.5px] font-semibold truncate ${
                        label === 'Workspaces' ? 'bg-white text-[#1C1A17] shadow-[inset_0_0_0_1px_#E6DDCD]' : 'text-[#6E675A]'
                      }`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-1 px-4 pb-3">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold text-[#453F34] uppercase tracking-wider">Saved workspaces</span>
                  <button
                    ref={newWorkspaceRef}
                    onClick={openSaveModal}
                    className="px-2.5 py-1 rounded-lg bg-[#c26b3c] text-white text-[11.5px] font-semibold hover:bg-[#a8592d] transition-colors"
                  >
                    + New Workspace
                  </button>
                </div>

                <div className="space-y-2">
                  {isWorkspaceSaved ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl bg-white border border-[#E6DDCD]"
                    >
                      <div className="flex items-center gap-2">
                        <span className={TILE_CLASS} style={tileStyle(WORKSPACE_PALETTE[0], 34)}>
                          {name.charAt(0).toUpperCase()}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-[13px] truncate">{name}</div>
                          <div className="text-[11px] text-[#6E675A]">
                            {TAB_COUNT} tabs · {GROUP_COUNT} groups
                          </div>
                        </div>
                        <button
                          ref={continueRef}
                          onClick={handleContinue}
                          className="px-2.5 py-1 rounded-lg text-[11.5px] font-semibold bg-[#c26b3c] text-white hover:bg-[#a8592d] transition-colors shrink-0"
                        >
                          Continue
                        </button>
                        <HelpDot label="What does Continue do?" text={CONTINUE_HELP} onExplain={setTourCaption} />
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-[#ECE5D9] text-[11px] text-[#6E675A]">
                        {wasReopened ? 'Last opened: Just now' : 'Saved: Just now'}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="p-4 rounded-xl border border-dashed border-[#E6DDCD] text-center text-[12px] text-[#6E675A]">
                      No workspaces yet. “+ New Workspace” saves the tabs you have open.
                    </div>
                  )}

                  {/* A second workspace for realistic depth */}
                  <div className="p-3 rounded-xl bg-white border border-[#E6DDCD]">
                    <div className="flex items-center gap-2">
                      <span className={`${TILE_CLASS} text-base`} style={tileStyle(WORKSPACE_PALETTE[1], 34)}>
                        ✈️
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[13px] truncate">Weekend trip</div>
                        <div className="text-[11px] text-[#6E675A]">12 tabs · 2 groups · 3 notes</div>
                      </div>
                      <button
                        onClick={() =>
                          setTourCaption('That one would open its own 12 tabs. This demo sticks to the first workspace.')
                        }
                        className="px-2.5 py-1 rounded-lg text-[11.5px] font-semibold bg-[#EFE8DC] hover:bg-[#E5DCCC] text-[#453F34] transition-colors shrink-0"
                      >
                        Continue
                      </button>
                      <HelpDot
                        label="What does Continue do?"
                        text="Opens this workspace’s 12 tabs in this window, with their groups and pinned tabs. Tabs you already have open stay open and aren’t opened twice. Nothing is closed."
                        onExplain={setTourCaption}
                      />
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-[#ECE5D9] text-[11px] text-[#6E675A]">Last opened: Yesterday</div>
                  </div>
                </div>
              </div>

              {/* Pinned footer */}
              <div className="px-4 py-2 border-t border-[#ECE5D9] text-[11px] text-[#6E675A] flex items-center justify-between">
                <span>Saved on this device</span>
                <span className="font-mono text-[10.5px] font-bold text-[#c26b3c]">{SHORTCUTS.palette}</span>
              </div>

              {/* Save dialog, as in the extension */}
              <AnimatePresence>
                {modalOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-[#1C1A17]/35 flex items-center justify-center p-4 z-20"
                  >
                    <div
                      role="dialog"
                      aria-label="Save current browser"
                      className="bg-white rounded-xl shadow-xl border border-[#E6DDCD] w-full max-w-[290px] overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-[#ECE5D9] font-semibold text-[13px]">Save current browser</div>
                      <div className="p-4">
                        <label className="block text-[11.5px] font-medium text-[#1C1A17] mb-1" htmlFor="demo-workspace-name">
                          Workspace name
                        </label>
                        <input
                          id="demo-workspace-name"
                          type="text"
                          value={workspaceName}
                          onChange={(e) => setWorkspaceName(e.target.value)}
                          className="w-full text-[12px] px-2.5 py-1.5 rounded-lg border border-[#E6DDCD] focus:outline-none mb-3 text-[#1C1A17]"
                          placeholder="e.g. AWS Research"
                        />
                        <div className="text-[11.5px] font-medium text-[#1C1A17] mb-1">Which tabs?</div>
                        <div className="flex gap-3 mb-2 text-[11.5px]">
                          <label className="inline-flex items-center gap-1.5">
                            <input
                              type="radio"
                              name="demo-save-mode"
                              checked={saveMode === 'all'}
                              onChange={() => setSaveMode('all')}
                              className="accent-[#c26b3c]"
                            />
                            All tabs
                          </label>
                          <label className="inline-flex items-center gap-1.5">
                            <input
                              type="radio"
                              name="demo-save-mode"
                              checked={saveMode === 'pick'}
                              onChange={() => setSaveMode('pick')}
                              className="accent-[#c26b3c]"
                            />
                            Choose tabs
                          </label>
                        </div>
                        <p className="text-[11px] text-[#6E675A]">
                          {saveMode === 'all'
                            ? `${TAB_COUNT} tabs and ${GROUP_COUNT} groups will be saved.`
                            : 'In Cairn you tick the tabs you want. This demo saves all ten.'}
                        </p>
                      </div>
                      <div className="px-4 py-3 border-t border-[#ECE5D9] flex justify-end gap-2">
                        <button
                          onClick={() => setModalOpen(false)}
                          className="px-3 py-1.5 rounded-lg bg-[#EFE8DC] text-[#453F34] text-[12px] font-semibold hover:bg-[#E5DCCC]"
                        >
                          Cancel
                        </button>
                        <button
                          ref={saveRef}
                          onClick={handleManualSave}
                          className="px-3 py-1.5 rounded-lg bg-[#c26b3c] text-white text-[12px] font-semibold hover:bg-[#a8592d]"
                        >
                          Save Workspace
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Virtual Floating Cursor for Auto-Play Tour */}
          {cursor.visible && (
            <motion.div
              initial={false}
              animate={{
                left: `${cursor.x}px`,
                top: `${cursor.y}px`,
                scale: cursor.clicking ? 0.8 : 1,
              }}
              transition={{ ease: 'easeInOut', duration: 0.8 }}
              className="absolute pointer-events-none z-30 transform -translate-x-1 -translate-y-1"
              aria-hidden="true"
            >
              <MousePointer className="w-5 h-5 fill-[#221F1B] text-white drop-shadow-md" />
              {cursor.clicking && (
                <span className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-[#c26b3c]/40 animate-ping" />
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
