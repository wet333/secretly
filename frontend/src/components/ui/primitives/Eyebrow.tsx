import React from "react";

interface EyebrowProps extends React.HTMLAttributes<HTMLElement> {
    as?: React.ElementType;
    className?: string;
    children: React.ReactNode;
}

/**
 * Micro-label in uppercase mono with wide tracking — equipment silkscreen.
 * Used for section labels, table headers, status captions.
 */
const Eyebrow: React.FC<EyebrowProps> = ({
    as: Tag = "span",
    className = "",
    children,
    ...props
}) => {
    return (
        <Tag className={`micro-label ${className}`} {...props}>
            {children}
        </Tag>
    );
};

export default Eyebrow;
