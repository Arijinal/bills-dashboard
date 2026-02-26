import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('bills-theme') || 'cosmos';
    } catch {
      return 'cosmos';
    }
  });

  useEffect(() => {
    document.body.classList.remove('theme-classic', 'theme-cosmos');
    document.body.classList.add(`theme-${theme}`);
    try {
      localStorage.setItem('bills-theme', theme);
    } catch { /* noop */ }
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'cosmos' ? 'classic' : 'cosmos');
  const isCosmos = theme === 'cosmos';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isCosmos }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
