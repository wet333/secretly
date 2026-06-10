import React from "react";

type IconBadgeSize = "sm" | "md" | "lg";
type IconBadgeTone = "default" | "accent";

interface IconBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: IconBadgeSize;
    tone?: IconBadgeTone;
    className?: string;
    children: React.ReactNode;
}

const sizeClasses: Record<IconBadgeSize, string> = {
    sm: "h-9 w-9",
    md: "h-11 w-11",
    lg: "h-14 w-14",
};

const toneClasses: Record<IconBadgeTone, string> = {
    default: "bg-raised border border-line-strong text-sec",
    accent: "bg-accent border border-accent-down text-accent-ink",
};

/**
 * Flat square frame for an icon. The `accent` tone is the solid orange block
 * used for the app logo.
 */
const IconBadge: React.FC<IconBadgeProps> = ({
    size = "md",
    tone = "default",
    className = "",
    children,
    ...props
}) => {
    return (
        <div
            className={`flex items-center justify-center ${toneClasses[tone]} ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default IconBadge;
