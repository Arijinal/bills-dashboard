import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App';

/* ── Fonts ──────────────────────────────────────────── */
import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono';

/* ── Styles ─────────────────────────────────────────── */
import './styles/tokens.css';
import './styles/global.css';
import './styles/animations.css';

/* ── React Query ────────────────────────────────────── */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

/* ── Render ─────────────────────────────────────────── */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
