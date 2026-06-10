import React from "react";
import { CircleAlert } from "lucide-react";
import { Button, Surface, Alert } from "../primitives";

interface FormShellProps {
    onSubmit: (e: React.FormEvent) => void;
    error?: string | null;
    submitLabel: string;
    submittingLabel: string;
    isSubmitting: boolean;
    onCancel: () => void;
    children: React.ReactNode;
}

interface FormFieldProps {
    htmlFor: string;
    label: string;
    hint?: string;
    className?: string;
    children: React.ReactNode;
}

/**
 * Labeled field row inside a FormShell: silkscreen-style label, control, hint.
 */
export const FormField: React.FC<FormFieldProps> = ({
    htmlFor,
    label,
    hint,
    className = "mb-6",
    children,
}) => {
    return (
        <div className={className}>
            <label htmlFor={htmlFor} className="micro-label text-sec! block mb-2">
                {label}
            </label>
            {children}
            {hint && <p className="text-xs text-mut mt-2">{hint}</p>}
        </div>
    );
};

/**
 * Shared chassis for the create-project / add-secret forms: surface, error
 * alert, fields and the Cancel / Submit action row.
 */
const FormShell: React.FC<FormShellProps> = ({
    onSubmit,
    error,
    submitLabel,
    submittingLabel,
    isSubmitting,
    onCancel,
    children,
}) => {
    return (
        <Surface className="p-6">
            <form onSubmit={onSubmit} noValidate>
                {error && (
                    <Alert
                        tone="err"
                        className="mb-5"
                        icon={<CircleAlert size={18} aria-hidden="true" />}
                    >
                        {error}
                    </Alert>
                )}

                {children}

                <div className="flex justify-end gap-2.5">
                    <Button type="button" variant="ghost" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                        {isSubmitting ? submittingLabel : submitLabel}
                    </Button>
                </div>
            </form>
        </Surface>
    );
};

export default FormShell;
