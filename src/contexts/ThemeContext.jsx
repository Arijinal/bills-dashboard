import { createContext, useContext, useState, useEffect } from 'react';

const THEMES = ['command', 'gameday', 'classic'];
const THEME_LABELS = { command: 'COMMAND', gameday: 'GAMEDAY', classic: 'CLASSIC' };

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('bills-theme');
      return THEMES.includes(saved) ? saved : 'command';
    } catch {
      return 'command';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('bills-theme', theme);
    } catch { /* noop */ }
  }, [theme]);

  const cycleTheme = () => {
    setTheme(t => {
      const idx = THEMES.indexOf(t);
      return THEMES[(idx + 1) % THEMES.length];
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, cycleTheme, themeLabel: THEME_LABELS[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
