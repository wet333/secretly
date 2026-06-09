import React from 'react';

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'dangerOutline' | 'icon' | 'iconColor' | 'iconDanger';
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
    const baseClasses = [
        'inline-flex items-center justify-center rounded-lg font-medium touch-manipulation',
        'transition-[background-color,border-color,color,box-shadow,opacity] duration-150 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950',
        variant === 'danger' || variant === 'dangerOutline' || variant === 'iconDanger'
            ? 'focus-visible:ring-red-500/35'
            : 'focus-visible:ring-amber-500/40',
    ].join(' ');

    const variantClasses: Record<ButtonVariant, string> = {
        default: 'bg-stone-800 text-stone-100 hover:bg-stone-700 active:bg-stone-600',
        primary: 'bg-amber-600 text-stone-950 hover:bg-amber-500 active:bg-amber-400 shadow-sm shadow-amber-900/20',
        secondary: 'bg-stone-800/80 text-stone-200 hover:bg-stone-700 border border-stone-700/50',
        ghost: 'bg-transparent text-stone-400 hover:bg-stone-800/80 hover:text-amber-300',
        outline: 'bg-transparent border border-stone-600/50 text-stone-200 hover:bg-stone-800/60 hover:border-stone-500',
        danger: 'bg-red-900/80 text-red-100 hover:bg-red-800 border border-red-800/50',
        dangerOutline: 'bg-red-950/50 text-red-300/90 border border-red-900/55 hover:bg-red-950/80 hover:border-red-800/65 hover:text-red-200',
        icon: 'bg-transparent text-stone-400 hover:bg-stone-800 hover:text-amber-400 p-2 rounded-lg',
        iconColor: 'bg-amber-600/10 text-amber-400 border border-amber-500/25 hover:bg-amber-600/20 hover:border-amber-500/40',
        iconDanger: 'bg-transparent text-stone-400 hover:bg-red-950/50 hover:text-red-400 border border-transparent hover:border-red-900/50 p-2 rounded-lg',
    };

    const sizeClasses: Record<ButtonSize | 'iconOnly', string> = {
        xs: 'text-xs py-1 px-2',
        sm: 'text-sm py-1.5 px-3',
        md: 'text-sm py-2 px-4',
        lg: 'text-base py-2.5 px-5',
        xl: 'text-base py-3 px-6',
        iconOnly: 'p-2',
    };

    const isIconOnly = !children && icon;

    const buttonClasses = [
        baseClasses,
        variantClasses[variant],
        isIconOnly ? sizeClasses.iconOnly : sizeClasses[size],
        fullWidth ? 'w-full' : '',
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
        className,
    ].join(' ');

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
                <span className={iconSpacingClass} aria-hidden="true">{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
                <span className={iconSpacingClass} aria-hidden="true">{icon}</span>
            )}
        </button>
    );
};

export default Button;
