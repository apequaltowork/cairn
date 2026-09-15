import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BookmarkX, Check } from 'lucide-react';
import { DEMO_TABS } from '../data/cairnData';

export const ParallaxTabStream: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Parallax transform calculations for floating tab strips
  const xLeftRow = useTransform(scrollYProgress, [0.05, 0.45], [-120, 80]);
  const xRightRow = useTransform(scrollYProgress, [0.05, 0.45], [80, -140]);

  return (
    <section className="relative py-20 lg:py-28 bg-[#F4EFE6] border-b border-[#E3DBCB] overflow-hidden">
      {/* Subtle textured grid lines */}
      <div className="absolute inset-0 bg-subtle-noise opacity-70 pointer-events-none" />

      {/* Parallax Stream Row 1: Drifting Left to Right */}
      <motion.div
        style={{ x: xLeftRow }}
        aria-hidden="true"
        className="flex gap-4 pb-6 whitespace-nowrap select-none opacity-45 hover:opacity-80 transition-opacity"
      >
        {DEMO_TABS.map((tab, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/80 border border-[#DDD3BF] shadow-2xs text-xs font-semibold text-[#3D382E]"
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tab.color }} />
            <span className="font-mono text-[11px] text-[#8C8474]">{tab.domain}</span>
            <span className="text-[#201D19]">{tab.title}</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#EFE8DA] text-[#696253]">{tab.group}</span>
          </div>
        ))}
      </motion.div>

      {/* Central Bold Typography & Problem Manifesto */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center my-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E5DDCB] text-[#595244] text-xs font-bold uppercase tracking-wider">
            <BookmarkX className="w-3.5 h-3.5 text-[#c26b3c]" />
            <span>Sound familiar?</span>
          </div>

          {/* Giant Bold Typography */}
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#1C1A17] tracking-tight leading-[1.12]">
            You have <span className="text-[#c26b3c] underline decoration-[#c26b3c]/30 decoration-wavy">30 tabs open</span> and can’t close them.
          </h2>

          <p className="text-lg sm:text-xl text-[#5F584A] leading-relaxed max-w-3xl mx-auto font-normal">
            Because closing them means losing them.
          </p>

          {/* Solution Highlight Block */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DDD3BF] shadow-md max-w-2xl mx-auto text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c26b3c]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f2e6d2] to-[#e4d4bc] border border-[#e0d6c4] p-2 shrink-0 shadow-sm">
                <img src="images/icon128.png" alt="" className="w-full h-full object-contain" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg sm:text-xl text-[#1C1A17]">
                  Cairn turns that pile into named workspaces.
                </h3>
                <p className="text-sm text-[#665F51] leading-relaxed">
                  Put one down and pick it back up next week, next sprint, or next month.
                  <strong className="text-[#c26b3c] font-semibold"> Close everything guilt-free</strong>, then get it all back exactly as it was.
                </p>
                <div className="flex flex-wrap gap-3 pt-2 text-xs font-semibold text-[#484236]">
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#6E7C4E]" /> Tab groups kept
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#6E7C4E]" /> Pinned tabs stay pinned
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#6E7C4E]" /> Notes come along
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Parallax Stream Row 2: Drifting Right to Left */}
      <motion.div
        style={{ x: xRightRow }}
        aria-hidden="true"
        className="flex gap-4 pt-6 whitespace-nowrap select-none opacity-45 hover:opacity-80 transition-opacity"
      >
        {DEMO_TABS.slice()
          .reverse()
          .map((tab, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/80 border border-[#DDD3BF] shadow-2xs text-xs font-semibold text-[#3D382E]"
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tab.color }} />
              <span className="font-mono text-[11px] text-[#8C8474]">{tab.domain}</span>
              <span className="text-[#201D19]">{tab.title}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#EFE8DA] text-[#696253]">{tab.group}</span>
            </div>
          ))}
      </motion.div>
    </section>
  );
};
