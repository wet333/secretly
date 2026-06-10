import React from "react";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Optional leading icon (e.g. a search glyph) rendered inside the field. */
    icon?: React.ReactNode;
    className?: string;
    wrapperClassName?: string;
}

/**
 * Flat, square, hairline-bordered text input. Used for forms, filters and
 * inline editing. Pass `icon` for the search variant.
 */
const Field = React.forwardRef<HTMLInputElement, FieldProps>(
    ({ icon, className = "", wrapperClassName = "", ...props }, ref) => {
        if (!icon) {
            return <input ref={ref} className={`field ${className}`} {...props} />;
        }

        return (
            <div className={`relative ${wrapperClassName}`}>
                <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-mut pointer-events-none flex items-center"
                    aria-hidden="true"
                >
                    {icon}
                </span>
                <input ref={ref} className={`field field--icon ${className}`} {...props} />
            </div>
        );
    },
);

Field.displayName = "Field";

export default Field;
