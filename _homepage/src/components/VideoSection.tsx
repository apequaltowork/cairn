import React from 'react';
import { motion } from 'motion/react';
import { Play, ExternalLink, Film } from 'lucide-react';
import { YOUTUBE_URL } from '../data/cairnData';

interface VideoSectionProps {
  onOpenVideo: () => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ onOpenVideo }) => {
  return (
    <section id="watch" className="py-24 lg:py-32 bg-[#FAF7F2] border-b border-[#E8E1D3] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE8DC] text-[#554E41] text-xs font-bold uppercase tracking-wider mb-3">
            <Film className="w-3.5 h-3.5 text-[#c26b3c]" />
            <span>52-second story</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#1C1A17] tracking-tight">Prefer to watch?</h2>
          <p className="mt-3 text-base sm:text-lg text-[#615A4D]">The whole story in under a minute.</p>
        </div>

        {/* Video Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-[#1C1A16] border border-[#3E3A33] shadow-2xl group">
            <button
              type="button"
              onClick={onOpenVideo}
              className="block w-full relative cursor-pointer"
              aria-label="Play the 52-second story"
            >
              <img src="images/video-preview.jpg" alt="" className="w-full h-auto object-cover" />

              {/* Play Button Overlay */}
              <span className="absolute inset-0 bg-black/35 flex items-center justify-center transition-colors group-hover:bg-black/25">
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#c26b3c] text-white flex items-center justify-center shadow-xl transition-transform"
                >
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1.5 fill-current" />
                </motion.span>
              </span>
            </button>

            {/* Video Meta Pill */}
            <div className="absolute left-4 bottom-4 flex flex-wrap items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-full bg-[#1C1A17]/85 backdrop-blur-md text-white text-xs font-bold flex items-center gap-2 border border-white/15">
                <span className="w-2 h-2 rounded-full bg-[#c26b3c]" />
                <span>0:52 · The whole story</span>
              </div>

              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#1C1A17] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3 h-3 text-[#c26b3c]" />
              </a>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs text-[#7A7365] italic">The video plays from YouTube.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
