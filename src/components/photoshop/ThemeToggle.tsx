import React, { useEffect, useState, createContext, useContext } from "react";

type Theme = "classic" | "modern";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("classic");

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem("ps-theme") as Theme;
    if (saved) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "modern") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("ps-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "classic" ? "modern" : "classic"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback for when used outside provider
    return {
      theme: "classic" as Theme,
      setTheme: () => {},
      toggleTheme: () => {},
    };
  }
  return context;
};

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="h-full px-3 text-xs hover:bg-menu-hover hover:text-menu-hover-foreground transition-colors flex items-center gap-1.5"
      title={`Switch to ${theme === "classic" ? "Modern Dark" : "Classic"} theme`}
    >
      {theme === "classic" ? (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" className="opacity-70">
            <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M7 1 A6 6 0 0 1 7 13" fill="currentColor"/>
          </svg>
          <span>Modern</span>
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" className="opacity-70">
            <circle cx="7" cy="7" r="5" fill="currentColor"/>
          </svg>
          <span>Classic</span>
        </>
      )}
    </button>
  );
};
