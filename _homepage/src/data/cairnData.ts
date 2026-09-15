import type { DemoTab, HeroSlide } from '../types';

export const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/nhjinpljinhggphpohdjlgkbjkabhkhh';
export const YOUTUBE_ID = 'fvWrDqO2-_A';
export const YOUTUBE_URL = `https://www.youtube.com/watch?v=${YOUTUBE_ID}`;
export const CONTACT_EMAIL = 'apequaltowork@gmail.com';

/** The site's other pages. Relative, so they resolve next to this page wherever it's hosted. */
export const PAGES = {
  guide: 'guide/',
  changelog: 'changelog/',
  privacy: 'privacy/',
  support: 'support/',
};

/** The extension's real shortcuts. ⌘ replaces Ctrl on a Mac. There is no save shortcut. */
export const SHORTCUTS = {
  open: 'Ctrl+Shift+Space',
  palette: 'Ctrl+Shift+K',
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'save-close',
    badge: 'Local-first',
    title: 'Close 30 tabs',
    highlight: 'guilt-free.',
    subtitle: 'Save all your open tabs as a named workspace, close everything, and get it all back in one click.',
    tagline: 'No account · No server · No telemetry',
    accentColor: '#c26b3c',
    stats: [
      { label: 'Restore', value: 'One click' },
      { label: 'Account', value: 'None' },
      { label: 'Stored', value: 'Your device' },
    ],
  },
  {
    id: 'context-notes',
    badge: 'Notes, included',
    title: 'Not just links.',
    highlight: 'The context around them.',
    subtitle: 'A workspace keeps your tab groups, pinned tabs and tab order, plus its own notes, right next to the tabs they’re about.',
    tagline: 'Groups come back with their names and colours',
    accentColor: '#6E7C4E',
    stats: [
      { label: 'Keeps', value: 'Groups & pins' },
      { label: 'Notes', value: 'Per workspace' },
      { label: 'Add a note', value: 'Right-click' },
    ],
  },
  {
    id: 'cleanup',
    badge: 'Nothing closes silently',
    title: 'Finds the clutter.',
    highlight: 'You approve every close.',
    subtitle: 'Duplicate tabs, stale tabs, and smart group suggestions — reviewed and confirmed by you, never auto-rearranged.',
    tagline: 'Cairn never closes or regroups a tab on its own',
    accentColor: '#B45309',
    stats: [
      { label: 'Duplicates', value: 'Found' },
      { label: 'Old tabs', value: '7–90 days' },
      { label: 'Closes', value: 'When you say' },
    ],
  },
  {
    id: 'search',
    badge: 'One search box',
    title: '“Where did I see that?”',
    highlight: 'Answered in one search.',
    subtitle: 'Tabs, history, bookmarks, workspaces, and notes — searched together on your device, grouped by source, one click to open.',
    tagline: `${SHORTCUTS.open} opens Cairn with search at the top`,
    accentColor: '#3B82F6',
    stats: [
      { label: 'Searches', value: '5 sources' },
      { label: 'Runs', value: 'On device' },
      { label: 'Sources', value: 'You choose' },
    ],
  },
];

/** Sample tabs for the illustrations. Four groups, so the counts shown stay honest. */
export const DEMO_TABS: DemoTab[] = [
  { id: 't1', title: 'Figma — Homepage redesign', domain: 'figma.com', color: '#a259ff', group: 'Design' },
  { id: 't2', title: 'GitHub — client-site pull requests', domain: 'github.com', color: '#24292e', group: 'Code' },
  { id: 't3', title: 'Stripe — Billing API docs', domain: 'stripe.com', color: '#635bff', group: 'Docs' },
  { id: 't4', title: 'Linear — Sprint backlog', domain: 'linear.app', color: '#5e6ad2', group: 'Code' },
  { id: 't5', title: 'Google Docs — Launch copy', domain: 'docs.google.com', color: '#4285f4', group: 'Docs' },
  { id: 't6', title: 'Vite — Configuration guide', domain: 'vitejs.dev', color: '#bd34fe', group: 'Code' },
  { id: 't7', title: 'Tailwind CSS — Reference', domain: 'tailwindcss.com', color: '#06b6d4', group: 'Docs' },
  { id: 't8', title: 'Substack — Mindful computing', domain: 'substack.com', color: '#ff6719', group: 'Reading' },
  { id: 't9', title: 'MDN — View transitions', domain: 'developer.mozilla.org', color: '#111827', group: 'Docs' },
  { id: 't10', title: 'YouTube — Cairn in 52 seconds', domain: 'youtube.com', color: '#ef4444', group: 'Reading' },
  { id: 't11', title: 'Notion — Meeting notes', domain: 'notion.so', color: '#000000', group: 'Design' },
  { id: 't12', title: 'Stack Overflow — chrome.tabs API', domain: 'stackoverflow.com', color: '#f48024', group: 'Code' },
];

/**
 * The crash demo's tabs. Short titles on purpose: a real Chrome strip this full
 * truncates too, and the point is that they look like your own tabs.
 */
export const CRASH_DEMO_TABS = [
  { color: '#c26b3c', title: 'Neon' },
  { color: '#6E7C4E', title: 'supabase' },
  { color: '#5b7ba8', title: 'Stack Ov' },
  { color: '#a85b8f', title: 'Figma' },
  { color: '#c26b3c', title: 'Postgres' },
  { color: '#6E7C4E', title: 'MDN' },
  { color: '#8a7b5b', title: 'Linear' },
  { color: '#5b7ba8', title: 'GitHub' },
  { color: '#a8735b', title: 'Invoice' },
  { color: '#6E7C4E', title: 'Notion' },
  { color: '#5b8a7b', title: 'Calendar' },
];

export const PRIVACY_PILLARS = [
  {
    title: 'Local-first storage',
    description: "Workspaces, notes, and settings live in Chrome's local storage on your device — nowhere else. There is no Cairn server to send them to.",
    stat: 'No account',
    badge: 'On this device',
  },
  {
    title: 'History & bookmarks, read-only',
    description: 'Searched locally to power universal search. Never collected, never transmitted. Either source can be switched off in Settings.',
    stat: 'Never uploaded',
    badge: 'Read-only',
  },
  {
    title: 'AI is opt-in, every time',
    description: 'Off by default. Shows exactly what will be sent before anything goes out, using your own API key.',
    stat: 'Off by default',
    badge: 'Your own key',
  },
];

export const COMPARISONS = [
  {
    label: 'vs. Bookmarks',
    cairnApproach: 'Cairn saves everything open right now — all your tabs at once, with groups, pinned state, and order preserved — restorable in one click.',
    otherApproach: 'Bookmarks save one link at a time and lose all arrangement.',
  },
  {
    label: 'vs. “Reopen closed tab”',
    cairnApproach: 'Named, intentional, and permanent — pick a workspace back up next week, next month, whenever.',
    otherApproach: 'That only covers the last few minutes.',
  },
  {
    label: 'vs. Leaving them open',
    cairnApproach: 'Put a project down and pick it back up when you need it. Crash recovery covers the tabs you never got round to saving.',
    otherApproach: 'The tabs stay open because closing them feels like losing them, and a crash or restart can still take them with it.',
  },
];
