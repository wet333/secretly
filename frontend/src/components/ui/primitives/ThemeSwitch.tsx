import React from "react";
import { useTheme } from "../../../context/ThemeContext.tsx";

const ThemeSwitch: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";
    const activeLabel = isDark ? "Dark" : "Light";
    const nextLabel = isDark ? "light" : "dark";

    return (
        <div className="theme-switch">
            <div className="flex flex-col gap-1 min-w-0">
                <span className="micro-label">Theme</span>
                <span className="font-mono text-xs tracking-[0.08em] uppercase text-sec">
                    {activeLabel} active
                </span>
            </div>
            <button
                type="button"
                className="theme-switch__track"
                onClick={toggleTheme}
                aria-label={`Theme: ${activeLabel.toLowerCase()}. Switch to ${nextLabel}.`}
            >
                <span
                    className={`theme-switch__option${isDark ? " theme-switch__option--active" : ""}`}
                    aria-hidden="true"
                >
                    Dark
                </span>
                <span
                    className={`theme-switch__option${!isDark ? " theme-switch__option--active" : ""}`}
                    aria-hidden="true"
                >
                    Light
                </span>
            </button>
        </div>
    );
};

export default ThemeSwitch;
