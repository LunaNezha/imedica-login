import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { THEME } from "@src/constants/local-storage.const";
import secureLocalStorage from "react-secure-storage";
import { DARK, LIGHT } from "@src/constants/theme.const";

import { Theme } from "@src/types/theme";
export type { Theme } from "@src/types/theme";

type ThemeContextProps = {
  theme: Theme;
  toggleTheme: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
  initialTheme: Theme;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.body.classList.toggle("dark", theme === DARK);
    document.documentElement.classList.toggle("dark", theme === DARK);
    document.documentElement.classList.toggle(
      "ion-palette-dark",
      theme === DARK,
    );
    const browserColor = theme === DARK ? "#11221e" : "#f7faf8";
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.setAttribute("content", browserColor);
    });
    document
      .querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
      ?.setAttribute("content", theme === DARK ? "black" : "default");
    try {
      secureLocalStorage.setItem(THEME, theme);
    } catch {
      // Theme switching does not require writable browser storage.
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === LIGHT ? DARK : LIGHT));
  };

  const contextValue: ThemeContextProps = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export { ThemeProvider, useTheme };
