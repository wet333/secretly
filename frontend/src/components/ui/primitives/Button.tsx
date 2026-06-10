import React from "react";

type ButtonVariant =
    | "default"
    | "primary"
    | "secondary"
    | "ghost"
    | "outline"
    | "danger"
    | "dangerOutline"
    | "icon"
    | "iconColor"
    | "iconDanger";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
type ButtonType = "button" | "submit" | "reset";
type IconPosition = "left" | "right";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: React.ReactNode;
    iconPosition?: IconPosition;
    className?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    type?: ButtonType;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "default",
    size = "md",
    icon,
    iconPosition = "left",
    className = "",
    fullWidth = false,
    disabled = false,
    type = "button",
    onClick,
    ...props
}) => {
    const isDanger =
        variant === "danger" || variant === "dangerOutline" || variant === "iconDanger";
    const isIconVariant = variant === "icon" || variant === "iconColor" || variant === "iconDanger";

    const baseClasses = [
        // Square, zero radius — physical key on the chassis
        "inline-flex items-center justify-center touch-manipulation select-none",
        "transition-[background-color,border-color,color,box-shadow,opacity,transform] duration-150 ease-out",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:ring-offset-base",
        isDanger ? "focus-visible:ring-err" : "focus-visible:ring-accent",
        // Mono uppercase labels everywhere except bare icon buttons
        isIconVariant ? "" : "font-mono uppercase tracking-[0.08em] font-medium",
    ].join(" ");

    const variantClasses: Record<ButtonVariant, string> = {
        // Signal-orange physical key: pressed edge below, sinks on :active.
        primary:
            "bg-accent text-accent-ink font-semibold border border-accent-down border-b-2 hover:bg-accent-up active:translate-y-px",
        default:
            "bg-raised text-pri hover:bg-line border border-line-strong border-b-2 active:translate-y-px",
        secondary: "bg-panel text-sec hover:bg-raised hover:text-pri border border-line-strong",
        ghost: "bg-transparent text-mut hover:bg-raised hover:text-pri border border-transparent",
        outline: "bg-transparent border border-line-strong text-sec hover:bg-raised hover:text-pri",
        danger: "bg-err/15 text-err hover:bg-err/25 border border-err/55 hover:border-err/70",
        dangerOutline:
            "bg-transparent text-err/90 border border-err/45 hover:bg-err/10 hover:text-err hover:border-err/60",
        icon: "bg-transparent text-mut hover:bg-raised hover:text-pri border border-transparent p-2",
        iconColor: "bg-raised text-sec border border-line-strong hover:bg-line hover:text-pri",
        iconDanger:
            "bg-transparent text-mut hover:bg-err/15 hover:text-err border border-transparent hover:border-err/45 p-2",
    };

    const sizeClasses: Record<ButtonSize | "iconOnly", string> = {
        xs: "text-micro py-1 px-2",
        sm: "text-xs py-1.5 px-3",
        md: "text-xs py-2 px-4",
        lg: "text-sm py-2.5 px-5",
        xl: "text-sm py-3 px-6",
        iconOnly: "p-2",
    };

    const isIconOnly = !children && icon;

    const buttonClasses = [
        baseClasses,
        variantClasses[variant],
        isIconOnly ? sizeClasses.iconOnly : sizeClasses[size],
        fullWidth ? "w-full" : "",
        disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer",
        className,
    ].join(" ");

    const iconSpacingClass = children && icon ? (iconPosition === "left" ? "mr-2" : "ml-2") : "";

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {icon && iconPosition === "left" && (
                <span className={iconSpacingClass} aria-hidden="true">
                    {icon}
                </span>
            )}
            {children}
            {icon && iconPosition === "right" && (
                <span className={iconSpacingClass} aria-hidden="true">
                    {icon}
                </span>
            )}
        </button>
    );
};

export default Button;
