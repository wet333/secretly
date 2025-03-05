import React from 'react';

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'icon' | 'iconColor' | 'iconDanger';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonType = 'button' | 'submit' | 'reset';
type IconPosition = 'left' | 'right';

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
                                           variant = 'default',
                                           size = 'md',
                                           icon,
                                           iconPosition = 'left',
                                           className = '',
                                           fullWidth = false,
                                           disabled = false,
                                           type = 'button',
                                           onClick,
                                           ...props
                                       }) => {
    // Define base classes
    const baseClasses = "rounded font-medium transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/30 inline-flex items-center justify-center";

    // Define variant classes
    const variantClasses: Record<ButtonVariant, string> = {
        default: "bg-stone-800 text-amber-50 hover:bg-stone-700",
        primary: "bg-gradient-to-r from-amber-600 to-amber-400 hover:from-amber-700 hover:to-amber-500 text-stone-900 shadow-lg shadow-amber-900/10",
        secondary: "bg-stone-700 text-amber-50 hover:bg-stone-600",
        ghost: "bg-transparent text-amber-400 hover:bg-stone-800 hover:text-amber-300",
        outline: "bg-transparent border border-stone-700 text-amber-50 hover:bg-stone-800",
        danger: "bg-red-600/80 text-white hover:bg-red-700",
        icon: "bg-transparent text-stone-400 hover:bg-stone-700 hover:text-amber-400 p-1.5 rounded",
        iconColor: "bg-transparent text-amber-400 border border-amber-400/25 hover:bg-stone-800 hover:border-amber-400/50",
        iconDanger: "bg-transparent text-stone-400 hover:border-red-500 hover:text-red-500 p-1.5 rounded"
    };

    // Define size classes
    const sizeClasses: Record<ButtonSize | 'iconOnly', string> = {
        xs: "text-xs py-1 px-2",
        sm: "text-sm py-1.5 px-3",
        md: "text-sm py-2 px-4",
        lg: "text-base py-2.5 px-5",
        xl: "text-base py-3 px-6",
        // For icon-only buttons
        iconOnly: "p-1.5"
    };

    // Determine if it's an icon-only button
    const isIconOnly = !children && icon;

    // Combine all classes
    const buttonClasses = [
        baseClasses,
        variantClasses[variant],
        isIconOnly ? sizeClasses.iconOnly : sizeClasses[size],
        fullWidth ? "w-full" : "",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        "cursor-pointer",
        className
    ].join(" ");

    // Determine icon spacing class
    const iconSpacingClass = children && icon ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : '';

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {icon && iconPosition === 'left' && (
                <span className={iconSpacingClass}>{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
                <span className={iconSpacingClass}>{icon}</span>
            )}
        </button>
    );
};

export default Button;