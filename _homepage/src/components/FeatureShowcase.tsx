import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Search, Edit3, Layers } from 'lucide-react';

const SAMPLE_SEARCH_RESULTS = [
  { type: 'Workspace', title: 'Client Website Launch', meta: '10 tabs · 4 groups', tagColor: '#c26b3c' },
  { type: 'Tab', title: 'Figma — Homepage redesign', meta: 'figma.com', tagColor: '#a259ff' },
  { type: 'Note', title: 'Check the staging links before Tuesday’s review', meta: 'Client Website Launch', tagColor: '#6E7C4E' },
  { type: 'Bookmark', title: 'Tailwind CSS — Reference', meta: 'tailwindcss.com', tagColor: '#b45309' },
  { type: 'History', title: 'chrome.tabs API reference', meta: 'developer.chrome.com', tagColor: '#0284c7' },
];

const CheckList: React.FC<{ items: string[]; color: string }> = ({ items, color }) => (
  <div className="space-y-2.5 pt-2">
    {items.map((pt, i) => (
      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#3A352B]">
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${color}26`, color }}
        >
          <Check className="w-3 h-3" />
        </div>
        <span>{pt}</span>
      </div>
    ))}
  </div>
);

export const FeatureShowcase: React.FC = () => {
  // Interactive mini-states for each feature card
  const [duplicateClosed, setDuplicateClosed] = useState(false);
  const [userNote, setUserNote] = useState('Check the staging links before Tuesday’s review.');
  const [searchFilter, setSearchFilter] = useState('');

  const query = searchFilter.trim().toLowerCase();
  const searchResults = SAMPLE_SEARCH_RESULTS.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.meta.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query),
  );

  return (
    <section id="features" className="py-24 lg:py-32 bg-[#FAF7F2] border-b border-[#E8E1D3] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE8DC] text-[#554E41] text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-[#c26b3c]" />
            <span>What Cairn does</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#1C1A17] tracking-tight">
            More than a list of links
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#615A4D]">
            Save your tabs, keep notes beside them, clear the clutter, and find anything again.
          </p>
        </div>

        {/* Feature Rows */}
        <div className="space-y-24 lg:space-y-32">
          {/* Feature 1: Restore exactly */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-[#c26b3c]/10 text-[#c26b3c]">
                Not bookmarks
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-[#1C1A17] leading-[1.15]">
                One click reopens every tab, exactly as it was.
              </h3>
              <p className="text-base text-[#5F584A] leading-relaxed">
                Tab groups, pinned state, and order are all preserved — not just a list of links you have to re-open one
                by one.
              </p>
              <CheckList
                color="#c26b3c"
                items={[
                  'Tab groups come back with their names and colours',
                  'Pinned tabs stay pinned',
                  'Tabs you already have open aren’t opened twice',
                ]}
              />
            </div>

            <div className="lg:col-span-7 relative">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden bg-[#221F1B] p-2.5 shadow-2xl border border-[#3E3A33]"
              >
                <img
                  src="images/panel-workspaces.webp"
                  alt="Cairn’s Workspaces section, each workspace with a Continue button"
                  className="w-full h-auto rounded-xl object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#E0D7C6] shadow-lg flex items-center justify-between text-xs text-[#221F1B]">
                  <div className="flex items-center gap-2 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c26b3c]" />
                    <span>Continue</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#7A7365]">Opens every saved tab</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Feature 2: Notes (Reverse Direction) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1 relative">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden bg-[#221F1B] p-2.5 shadow-2xl border border-[#3E3A33]"
              >
                <img
                  src="images/panel-notes.webp"
                  alt="A Cairn workspace showing its tabs and notes"
                  className="w-full h-auto rounded-xl object-cover"
                />

                {/* Interactive notes widget */}
                <div className="mt-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E0D7C6] shadow-sm">
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="demo-note" className="flex items-center gap-2 text-xs font-bold text-[#1C1A17]">
                      <Edit3 className="w-3.5 h-3.5 text-[#6E7C4E]" />
                      <span>Workspace notes</span>
                    </label>
                    <span className="text-[10px] text-[#7A7365] font-semibold">Client Website Launch</span>
                  </div>
                  <input
                    id="demo-note"
                    type="text"
                    value={userNote}
                    onChange={(e) => setUserNote(e.target.value)}
                    className="w-full text-xs px-3 py-1.5 bg-white border border-[#D9D0BE] rounded-lg text-[#221F1B] focus:outline-none focus:ring-1 focus:ring-[#6E7C4E]"
                    placeholder="Next steps, links, reminders…"
                  />
                  <div className="mt-1 flex items-center justify-between text-[10px] text-[#7A7365]">
                    <span>Saved on this device</span>
                    <span className="text-[#6E7C4E] font-medium">Shows up in search</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-[#6E7C4E]/15 text-[#6E7C4E]">
                Notes, included
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-[#1C1A17] leading-[1.15]">
                Not just tabs — the context around them.
              </h3>
              <p className="text-base text-[#5F584A] leading-relaxed">
                Every workspace carries its own notes, right next to the tabs they’re about. Nothing rots in a separate
                app.
              </p>
              <CheckList
                color="#6E7C4E"
                items={[
                  'Pin the notes that matter to the top',
                  'Select text on any page, right-click, “Save as a note”',
                  'Notes turn up in search with everything else',
                ]}
              />
            </div>
          </div>

          {/* Feature 3: Cleanup */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-[#b45309]/10 text-[#b45309]">
                Nothing closes silently
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-[#1C1A17] leading-[1.15]">
                Finds the clutter. You approve every close.
              </h3>
              <p className="text-base text-[#5F584A] leading-relaxed">
                Duplicate tabs, stale tabs, and smart group suggestions — reviewed and confirmed, never auto-rearranged.
              </p>
              <CheckList
                color="#b45309"
                items={[
                  'Spots duplicates even when only the #anchor differs',
                  'Flags tabs unused for 7, 30, 60 or 90 days — you pick',
                  'Suggests groups from shared sites and title words',
                ]}
              />
            </div>

            <div className="lg:col-span-7 relative">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden bg-[#221F1B] p-2.5 shadow-2xl border border-[#3E3A33]"
              >
                <img
                  src="images/panel-cleanup.webp"
                  alt="Cairn Cleanup listing duplicate and old tabs"
                  className="w-full h-auto rounded-xl object-cover"
                />

                {/* Interactive duplicate widget */}
                <div className="mt-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E0D7C6] shadow-sm flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#b45309]/15 text-[#b45309] flex items-center justify-center font-bold text-xs shrink-0">
                      {duplicateClosed ? '✓' : '2×'}
                    </div>
                    <div className="min-w-0" aria-live="polite">
                      <div className="text-xs font-bold text-[#1C1A17]">
                        {duplicateClosed ? 'Closed 1 duplicate' : '1 page is open twice'}
                      </div>
                      <div className="text-[11px] text-[#7A7365] truncate">
                        {duplicateClosed ? 'Changed your mind? It’s under Recently closed.' : 'Figma — Homepage redesign'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setDuplicateClosed(!duplicateClosed)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                      duplicateClosed ? 'bg-[#EFE8DC] text-[#484236]' : 'bg-[#b45309] text-white hover:bg-[#92400e]'
                    }`}
                  >
                    {duplicateClosed ? 'Show again' : 'Keep first, close rest'}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Feature 4: Universal Search (Reverse Direction) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1 relative">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden bg-[#221F1B] p-2.5 shadow-2xl border border-[#3E3A33]"
              >
                <img
                  src="images/panel-search.webp"
                  alt="Cairn search results grouped by source"
                  className="w-full h-auto rounded-xl object-cover"
                />

                {/* Interactive search box */}
                <div className="mt-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#E0D7C6] shadow-sm">
                  <div className="relative mb-2">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7365]" />
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="Try “staging”, “figma” or “note”…"
                      aria-label="Search the sample results"
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-white rounded-lg border border-[#DDD3C0] text-[#1C1A17] focus:outline-none focus:ring-1 focus:ring-[#0284c7]"
                    />
                  </div>

                  {/* Filtered items */}
                  <div className="space-y-1 max-h-28 overflow-y-auto">
                    {searchResults.map((res, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white border border-[#EFE9DC] text-xs hover:bg-[#F2ECE1] transition-colors"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded text-white"
                            style={{ backgroundColor: res.tagColor }}
                          >
                            {res.type}
                          </span>
                          <span className="font-medium text-[#1C1A17] truncate">{res.title}</span>
                        </div>
                        <span className="text-[10px] text-[#7A7365] shrink-0 ml-2 font-mono">{res.meta}</span>
                      </div>
                    ))}
                    {searchResults.length === 0 && (
                      <div className="px-2.5 py-1.5 text-xs text-[#7A7365]">Nothing in this sample matches.</div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-[#0284c7]/10 text-[#0284c7]">
                One search box
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-[#1C1A17] leading-[1.15]">
                “Where did I see that?” Answered in one search.
              </h3>
              <p className="text-base text-[#5F584A] leading-relaxed">
                Tabs, history, bookmarks, workspaces, and notes — searched together, grouped by source, one click to open.
              </p>
              <CheckList
                color="#0284c7"
                items={[
                  'Everything is searched on your device',
                  'Results grouped by where they came from',
                  'Switch history or bookmarks off in Settings',
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
