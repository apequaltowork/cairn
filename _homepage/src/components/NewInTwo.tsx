import React from 'react';
import { motion } from 'motion/react';
import { PenLine, BookOpen, BellRing, Share2, HardDriveDownload, Sparkles } from 'lucide-react';
import { PAGES, PUBLISHED_VERSION } from '../data/cairnData';

/**
 * What version 2.0 added, as a band of its own rather than a rewrite of the
 * sections above: those describe what Cairn is, and this says what is new.
 */
const ITEMS = [
  {
    icon: PenLine,
    title: 'A note on any tab',
    body: 'One line about why you kept it — "password is in the launch doc". It sits where the address would be, and search finds the tab by it.',
  },
  {
    icon: BookOpen,
    title: 'Read later',
    body: 'Right-click any page or link to put it on one list, and tick things off as you read them.',
  },
  {
    icon: BellRing,
    title: 'Reminders',
    body: 'Ask Cairn to bring a workspace back to you later today, tomorrow morning, this weekend, or at a time you pick.',
  },
  {
    icon: Share2,
    title: 'Send a workspace',
    body: 'Save it as a file and pass it on. They import it and get their own copy, tabs and notes included. Nothing is uploaded.',
  },
  {
    icon: HardDriveDownload,
    title: 'Backups on their own',
    body: 'A copy of everything into your downloads folder, daily or weekly, keeping the last ten. Plain JSON you can read.',
  },
];

export const NewInTwo: React.FC = () => (
  <section id="new" className="py-24 lg:py-32 bg-[#F4EEE3] border-b border-[#E8E1D3] scroll-mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c26b3c] text-white text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>New in {PUBLISHED_VERSION}</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#1C1A17] tracking-tight">
          Why you kept it, and when to come back
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#615A4D]">
          A week later, a tab title tells you nothing. These are the things that do.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map(({ icon: Icon, title, body }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="rounded-2xl bg-white border border-[#E8E1D3] p-6 flex flex-col gap-3"
          >
            <span className="w-10 h-10 rounded-xl bg-[#F5E7DA] text-[#c26b3c] flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </span>
            <h3 className="font-display font-bold text-lg text-[#1C1A17]">{title}</h3>
            <p className="text-sm leading-relaxed text-[#615A4D]">{body}</p>
          </motion.div>
        ))}

        {/* The sixth cell carries the promise the rest of the page makes, and the way in. */}
        <div className="rounded-2xl border border-dashed border-[#DCCFBA] p-6 flex flex-col justify-center gap-3">
          <p className="text-sm leading-relaxed text-[#615A4D]">
            Nothing new is asked of you at install. Saving backup files and showing notifications are
            asked for only if you switch those features on, and everything still stays on your device.
          </p>
          <a
            href={PAGES.changelog}
            className="text-sm font-semibold text-[#c26b3c] underline underline-offset-4 decoration-[#c26b3c]/40 hover:decoration-[#c26b3c]"
          >
            Everything in {PUBLISHED_VERSION} →
          </a>
        </div>
      </div>
    </div>
  </section>
);
