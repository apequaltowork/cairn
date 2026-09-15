import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';
import { YOUTUBE_ID, YOUTUBE_URL } from '../data/cairnData';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1C1A16]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Cairn in 52 seconds"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl bg-[#1C1A16] rounded-3xl border border-[#3E3A33] shadow-2xl overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c26b3c] shrink-0" />
                <span className="font-display font-bold text-white text-sm truncate">Cairn — the whole story (0:52)</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#A69E8F] hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5"
                >
                  <span>Open on YouTube</span>
                  <ExternalLink className="w-3 h-3 text-[#c26b3c]" />
                </a>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-[#A69E8F] hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close video"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Player: loaded only once the viewer asks for it */}
            <div className="aspect-video w-full bg-black relative">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                title="Cairn — the whole story"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
