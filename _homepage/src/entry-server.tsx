// Renders the homepage to HTML at build time (see scripts/prerender.mjs), so search
// engines and link previews get the page's real content instead of an empty <div>.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
