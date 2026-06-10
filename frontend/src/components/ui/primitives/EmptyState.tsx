import React from "react";

interface EmptyStateProps {
    icon?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}

/**
 * Centered empty/zero-data placeholder.
 */
const EmptyState: React.FC<EmptyStateProps> = ({
    icon,
    title,
    description,
    action,
    className = "",
}) => {
    return (
        <div
            className={`flex flex-col items-center justify-center px-6 py-12 text-center ${className}`}
        >
            {icon && (
                <div className="mb-3 text-mut" aria-hidden="true">
                    {icon}
                </div>
            )}
            {title && <p className="text-sm font-medium text-sec mb-1">{title}</p>}
            {description && (
                <p className="text-xs text-mut max-w-sm leading-relaxed">{description}</p>
            )}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
};

export default EmptyState;
