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

export type Theme = "light" | "dark";

type ThemeContextProps = {
  theme: Theme;
  toggleTheme: () => void;
};

const defaultContextValue: ThemeContextProps = {
  theme: (secureLocalStorage.getItem(THEME) as Theme) || LIGHT,
  toggleTheme: () => {},
};

type ThemeProviderProps = {
  children: ReactNode;
  initialTheme: Theme;
};

const ThemeContext = createContext<ThemeContextProps>(defaultContextValue);

const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps) => {
  const storedTheme =
    (secureLocalStorage.getItem(THEME) as Theme) ||
    (initialTheme as Theme) ||
    LIGHT;
  const [theme, setTheme] = useState<Theme>(storedTheme);

  useEffect(() => {
    document.body.classList.toggle("dark", theme === DARK);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => {
      const newTheme = current === LIGHT ? DARK : LIGHT;
      secureLocalStorage.setItem(THEME, newTheme);
      return newTheme;
    });
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
