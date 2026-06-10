import React, { Context, createContext, ReactNode, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const THEME_STORAGE_KEY = "secretly-theme";

const THEME_COLORS: Record<Theme, string> = {
    dark: "#121310",
    light: "#e8e4d8",
};

export interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

export const ThemeContext: Context<ThemeContextType | undefined> = createContext<
    ThemeContextType | undefined
>(undefined);

const readStoredTheme = (): Theme => {
    try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (stored === "light" || stored === "dark") {
            return stored;
        }
    } catch {
        /* ignore */
    }
    return "dark";
};

const applyTheme = (theme: Theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
        meta.setAttribute("content", THEME_COLORS[theme]);
    }
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(readStoredTheme);

    useEffect(() => {
        applyTheme(theme);
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch {
            /* ignore */
        }
    }, [theme]);

    const setTheme = (next: Theme) => {
        setThemeState(next);
    };

    const toggleTheme = () => {
        setThemeState((current) => (current === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
};
