import React from "react";

type AlertTone = "err" | "ok" | "warn";

interface AlertProps {
    tone?: AlertTone;
    icon?: React.ReactNode;
    className?: string;
    children: React.ReactNode;
}

const toneClasses: Record<AlertTone, string> = {
    err: "text-err border-err/45 bg-err/10",
    ok: "text-ok border-ok/45 bg-ok/10",
    warn: "text-warn border-warn/45 bg-warn/10",
};

/**
 * Flat status message. Square, hairline-bordered, contained tint.
 */
const Alert: React.FC<AlertProps> = ({ tone = "err", icon, className = "", children }) => {
    return (
        <div
            role="alert"
            className={`flex items-start gap-2 p-3 text-sm border ${toneClasses[tone]} ${className}`}
        >
            {icon && (
                <span className="shrink-0 mt-0.5" aria-hidden="true">
                    {icon}
                </span>
            )}
            <span>{children}</span>
        </div>
    );
};

export default Alert;
