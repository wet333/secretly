import React from "react";

type PillTone = "default" | "active" | "warn";

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
    tone?: PillTone;
    icon?: React.ReactNode;
    className?: string;
    children: React.ReactNode;
}

const toneClasses: Record<PillTone, string> = {
    default: "bg-raised text-sec border border-line-strong",
    active: "bg-accent text-accent-ink border border-accent-down",
    warn: "bg-transparent text-warn border border-warn/50",
};

/**
 * Square, mono badge. Counts, env indicators ("ENV:PROD") and short stats.
 */
const Pill: React.FC<PillProps> = ({
    tone = "default",
    icon,
    className = "",
    children,
    ...props
}) => {
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-xs font-medium tracking-[0.08em] tabular-nums ${toneClasses[tone]} ${className}`}
            {...props}
        >
            {icon}
            {children}
        </span>
    );
};

export default Pill;
