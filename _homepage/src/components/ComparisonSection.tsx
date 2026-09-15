import React from 'react';
import { COMPARISONS } from '../data/cairnData';

export const ComparisonSection: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#F3EFE7] border-b border-[#E3DBCB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E5DDCB] text-[#554E41] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Why Cairn</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#1C1A17] tracking-tight">
            Not another tab manager
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#615A4D]">What the browser’s own tools leave out.</p>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COMPARISONS.map((comp) => (
            <div
              key={comp.label}
              className="bg-white rounded-3xl p-8 border border-[#DDD3C0] shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#c26b3c] mb-3">
                  {comp.label}
                </span>

                {/* With Cairn */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D3] mb-5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1C1A17] mb-1.5">
                    <img src="images/icon128.png" alt="" className="w-5 h-5 rounded-full" />
                    <span>With Cairn</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#484236] leading-relaxed">{comp.cairnApproach}</p>
                </div>

                {/* Without */}
                <div className="p-4 rounded-2xl bg-[#F9F5EE]/60 border border-[#EFE8DC]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#7A7365] mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#DDD3BF] text-[#7A7365] flex items-center justify-center text-[10px]">
                      ✕
                    </span>
                    <span>Without</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#7A7365] leading-relaxed">{comp.otherApproach}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F0EAE0] flex items-center justify-between text-xs font-semibold text-[#6E7C4E]">
                <span>Keeps</span>
                <span>Groups, pins & notes</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
