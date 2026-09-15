import React, { useState } from 'react';
import { ShieldCheck, HardDrive, EyeOff, KeyRound, CheckCircle2, FileText } from 'lucide-react';
import { PRIVACY_PILLARS, PAGES } from '../data/cairnData';

type InspectorTab = 'network' | 'storage' | 'ai';

const PILLAR_ICONS = [HardDrive, EyeOff, KeyRound];

const INSPECTOR_TABS: { id: InspectorTab; label: string }[] = [
  { id: 'network', label: 'Network' },
  { id: 'storage', label: 'Storage' },
  { id: 'ai', label: 'AI (optional)' },
];

// Every line here is stated in the privacy policy.
const INSPECTOR_ROWS: Record<InspectorTab, [string, string][]> = {
  network: [
    ['ANALYTICS & TRACKING', 'None, of any kind'],
    ['CAIRN SERVERS', 'None — there isn’t one'],
    ['ACCOUNT', 'None — no email, no password'],
    ['SCRIPTS ON WEB PAGES', 'None — Cairn runs no content scripts'],
  ],
  storage: [
    ['WORKSPACES, NOTES, SETTINGS', 'chrome.storage.local, on this device'],
    ['HISTORY & BOOKMARKS', 'Read on your device, never stored or sent'],
    ['CRASH SNAPSHOTS', 'Last 5, gone after a week, no incognito tabs'],
    ['BACKUPS', 'Export or import a JSON file, API key left out'],
  ],
  ai: [
    ['DEFAULT', 'Off until you set up a provider'],
    ['PROVIDER', 'Anthropic, OpenAI or your own endpoint, with your key'],
    ['BEFORE EVERY REQUEST', 'You see and choose what’s sent: titles, URLs, notes'],
    ['API KEY', 'Kept on this device, never in backups'],
  ],
};

export const PrivacyVault: React.FC = () => {
  const [activeInspector, setActiveInspector] = useState<InspectorTab>('network');

  return (
    <section id="privacy" className="py-24 lg:py-32 bg-[#FAF7F2] border-b border-[#E8E1D3] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E7C4E]/15 text-[#6E7C4E] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#1C1A17] tracking-tight">
            Your data stays on your device
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5E5749]">No account. No server. No telemetry of any kind.</p>
        </div>

        {/* 3 Privacy Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PRIVACY_PILLARS.map((pillar, idx) => {
            const Icon = PILLAR_ICONS[idx];
            return (
              <div
                key={pillar.title}
                className="p-8 rounded-3xl bg-white border border-[#E0D7C6] shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F3EFE7] text-[#554E41] border border-[#E8E1D3]">
                      {pillar.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#6E7C4E]/15 text-[#6E7C4E] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[#1C1A17] mb-3">{pillar.title}</h3>
                  <p className="text-sm text-[#665F51] leading-relaxed">{pillar.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0EAE0] flex items-center justify-end text-xs font-semibold text-[#1C1A17]">
                  <span className="text-[#6E7C4E] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {pillar.stat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* What Cairn keeps, and where */}
        <div className="max-w-4xl mx-auto bg-[#1C1A16] rounded-3xl border border-[#3E3A33] shadow-2xl p-6 sm:p-8 text-white">
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-white/10 gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-[#6E7C4E]" />
              <span className="font-mono text-xs text-[#A69E8F] uppercase tracking-wider font-semibold">
                What Cairn keeps, and where
              </span>
            </div>

            <div className="flex items-center gap-1 bg-white/10 p-1 rounded-lg text-xs font-mono" role="tablist">
              {INSPECTOR_TABS.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeInspector === tab.id}
                  onClick={() => setActiveInspector(tab.id)}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeInspector === tab.id ? 'bg-[#c26b3c] text-white font-bold' : 'text-[#A69E8F] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="py-6 font-mono text-xs" role="tabpanel">
            <div className="space-y-3">
              {INSPECTOR_ROWS[activeInspector].map(([key, value], i, rows) => (
                <div
                  key={key}
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 ${
                    i === 0 ? 'text-[#85DE72]' : 'text-[#DDD4C3]'
                  } ${i < rows.length - 1 ? 'border-b border-white/5 pb-2' : ''}`}
                >
                  <span>{key}:</span>
                  <span className="sm:text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A69E8F]">
            <span>Every piece of data Cairn touches is listed in the privacy policy, in plain words.</span>
            <a
              href={PAGES.privacy}
              className="text-[#E87334] hover:underline inline-flex items-center gap-1 font-semibold shrink-0"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Read the full privacy policy →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
