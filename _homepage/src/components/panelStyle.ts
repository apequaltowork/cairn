import type { CSSProperties } from 'react';

// Drawings of the Cairn side panel on this page follow the redesigned extension
// (cairn-code, src/styles/theme.css and base.css), so they look like the real thing.

/** The extension's own font stack. */
export const PANEL_FONT = "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";

/** The colours Cairn gives new workspaces, in order. */
export const WORKSPACE_PALETTE = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#ef4444', '#3b82f6'];

/** A workspace tile: its colour as a soft square, with a letter or icon. Mirrors .cairn-tile. */
export function tileStyle(color: string, size: number, dark = false): CSSProperties {
  return {
    width: size,
    height: size,
    background: `color-mix(in srgb, ${color} ${dark ? 24 : 18}%, transparent)`,
    color: `color-mix(in srgb, ${color} ${dark ? 55 : 58}%, ${dark ? 'white' : 'black'})`,
  };
}

export const TILE_CLASS = 'inline-flex items-center justify-center shrink-0 rounded-lg font-bold text-sm leading-none';
