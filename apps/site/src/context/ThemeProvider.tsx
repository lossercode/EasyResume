import { useSettings } from '@/hooks/useSettings';
import { ThemeMode } from '@/types';
import type React from 'react';
import {
  createContext,
  type PropsWithChildren,
  use,
  useEffect,
  useState,
} from 'react';

interface ThemeContextType {
  theme: ThemeMode;
  settingTheme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: ThemeMode.light,
  settingTheme: ThemeMode.light,
  toggleTheme: () => {},
});

interface ThemeProviderProps extends PropsWithChildren {
  defaultTheme?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme,
}) => {
  const { theme, setTheme } = useSettings();
  const [_theme, _setTheme] = useState(theme);

  const toggleTheme = () => {
    setTheme(theme === ThemeMode.dark ? ThemeMode.light : ThemeMode.dark);
  };

  useEffect((): any => {
    if (theme === ThemeMode.auto || defaultTheme === ThemeMode.auto) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      _setTheme(mediaQuery.matches ? ThemeMode.dark : ThemeMode.light);
      const handleChange = (e: MediaQueryListEvent) =>
        _setTheme(e.matches ? ThemeMode.dark : ThemeMode.light);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    _setTheme(theme);
  }, [defaultTheme, theme]);

  useEffect(() => {
    document.body.setAttribute('theme-mode', _theme);
  }, [_theme]);

  return (
    <ThemeContext value={{ theme: _theme, settingTheme: theme, toggleTheme }}>
      {children}
    </ThemeContext>
  );
};

export const useTheme = () => use(ThemeContext);
