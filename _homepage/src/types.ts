export interface HeroSlide {
  id: 'save-close' | 'context-notes' | 'cleanup' | 'search';
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  tagline: string;
  accentColor: string;
  stats: { label: string; value: string }[];
}

export interface DemoTab {
  id: string;
  title: string;
  domain: string;
  color: string;
  group: string;
}
