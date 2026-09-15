import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookmarkCheck, LogOut, RotateCcw, Sparkles } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      stepNumber: '01',
      title: 'Save',
      tagline: 'Name your tabs. Keep the whole setup.',
      description:
        'Save the tabs you have open as a named workspace, from the side panel or the command palette. Take all of them, or tick just the ones you want.',
      icon: BookmarkCheck,
      color: '#c26b3c',
      badge: 'Named workspace',
      details: ['Tab groups keep their names and colours', 'Pinned tabs stay pinned', 'Add notes to it any time'],
    },
    {
      stepNumber: '02',
      title: 'Close',
      tagline: 'Close everything. Nothing is lost.',
      description:
        'Close your browser, or move on to something else. The workspace is saved in Chrome’s storage on your device, ready next week or next month.',
      icon: LogOut,
      color: '#6E7C4E',
      badge: 'Nothing lost',
      details: ['Still there after Chrome restarts', 'No account, nothing uploaded', 'Crash recovery covers tabs you never saved'],
    },
    {
      stepNumber: '03',
      title: 'Continue',
      tagline: 'One click, and you’re back.',
      description:
        'Click Continue on that workspace whenever you’re ready, and every tab reopens exactly where you left off.',
      icon: RotateCcw,
      color: '#0284c7',
      badge: 'One click',
      details: ['Tabs reopen in their saved order', 'Tabs already open aren’t opened twice', 'Broken links are skipped, and you’re told'],
    },
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-[#F3EFE7] border-b border-[#E3DBCB] relative overflow-hidden scroll-mt-16">
      {/* Subtle Background Cairn Stone Stack Graphic */}
      <div className="absolute right-10 bottom-10 opacity-10 pointer-events-none hidden lg:block">
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-10 rounded-2xl bg-[#221F1B]" />
          <div className="w-32 h-14 rounded-3xl bg-[#221F1B]" />
          <div className="w-48 h-20 rounded-4xl bg-[#221F1B]" />
          <div className="w-64 h-24 rounded-[3rem] bg-[#221F1B]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E5DDCB] text-[#554E41] text-xs font-bold uppercase tracking-wider mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c26b3c]" />
            <span>Three stones</span>
          </motion.div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#1C1A17] tracking-tight">
            How Cairn works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#615A4D] font-normal">Three steps. No account, no setup.</p>
        </div>

        {/* Interactive 3-Step Grid with Unique Card Designs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;

            return (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                onClick={() => setActiveStep(idx)}
                className={`group relative rounded-3xl p-8 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white shadow-xl border-2 border-[#c26b3c] -translate-y-2'
                    : 'bg-[#FAF7F2] border border-[#E0D7C6] hover:bg-white hover:border-[#c26b3c]/40 hover:-translate-y-1 shadow-2xs'
                }`}
              >
                <div>
                  {/* Top Row: Huge Typographic Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display font-black text-5xl tracking-tighter opacity-80" style={{ color: step.color }}>
                      {step.stepNumber}
                    </span>

                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-110"
                      style={{ backgroundColor: step.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Step Title & Tagline */}
                  <div className="space-y-2 mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#F2ECE1] text-[#696152]">
                      {step.badge}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1C1A17]">{step.title}</h3>
                    <p className="font-semibold text-sm text-[#c26b3c]">{step.tagline}</p>
                  </div>

                  {/* Body description */}
                  <p className="text-sm text-[#665F51] leading-relaxed mb-6">{step.description}</p>
                </div>

                {/* Key Checklist Highlights */}
                <div className="pt-4 border-t border-[#EAE3D5] space-y-2">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs font-medium text-[#484236]">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: step.color }} />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stone Philosophy Card */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#E8E0CF] border border-[#D9CEB9] max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-[#1C1A17] p-2 flex items-center justify-center shrink-0">
            <img src="images/icon128.png" alt="" className="w-full h-full object-contain" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-bold text-base text-[#1C1A17]">Why the name “Cairn”?</h4>
            <p className="text-xs sm:text-sm text-[#5C5446] leading-relaxed">
              On mountain trails, a <em>cairn</em> is a stack of stones that marks the way through fog and rough ground.
              Cairn does the same for your browsing: a marker that leads you back to what you were doing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
