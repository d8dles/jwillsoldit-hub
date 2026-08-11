import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import App from './App';

import './styles/tokens.css';
import './styles/globals.css';
import './styles/layout.css';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root not found');

const app = (
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>
);

if (rootEl.hasChildNodes()) hydrateRoot(rootEl, app);
else createRoot(rootEl).render(app);
