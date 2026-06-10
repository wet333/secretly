import React from "react";

interface SurfaceProps extends React.HTMLAttributes<HTMLElement> {
    as?: React.ElementType;
    className?: string;
    children: React.ReactNode;
}

/**
 * The base chassis panel. Flat matte surface, 1px hairline border, zero radius.
 * Every panel/card in the app is built on top of this primitive.
 */
const Surface: React.FC<SurfaceProps> = ({
    as: Tag = "div",
    className = "",
    children,
    ...props
}) => {
    return (
        <Tag className={`bg-panel border border-line ${className}`} {...props}>
            {children}
        </Tag>
    );
};

export default Surface;
