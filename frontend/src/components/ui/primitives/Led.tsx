import React from "react";

type LedTone = "ok" | "warn" | "err" | "accent" | "mut";

interface LedProps extends React.HTMLAttributes<HTMLSpanElement> {
    tone?: LedTone;
    pulse?: boolean;
    className?: string;
}

/**
 * Hardware indicator light: a small dot with a faint halo. The cassette-futurism
 * signature for live status (vault state, project rows, log entries).
 */
const Led: React.FC<LedProps> = ({ tone = "mut", pulse = false, className = "", ...props }) => {
    return (
        <span
            className={`led led--${tone} ${pulse ? "led--pulse" : ""} ${className}`}
            aria-hidden="true"
            {...props}
        />
    );
};

export default Led;
