import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button, Surface } from "../primitives";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    size?: "small" | "medium" | "large" | "full";
    title?: string;
    children: ReactNode;
    actions?: ReactNode;
}

const sizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
    small: "max-w-sm",
    medium: "max-w-md",
    large: "max-w-lg",
    full: "w-full md:w-2/3",
};

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    size = "medium",
    title,
    children,
    actions,
}) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const modalRoot = document.getElementById("modal-root")!;
    return createPortal(
        <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
        >
            <div className="absolute inset-0 modal-backdrop" onClick={onClose} aria-hidden="true" />

            <Surface
                className={`relative w-full ${sizeClasses[size]} overscroll-contain border-line-strong!`}
            >
                <div className="flex items-center justify-between gap-3 px-6 py-3.5 border-b border-line bg-raised">
                    {title && (
                        <h2 id="modal-title" className="micro-label text-sec! truncate">
                            {title}
                        </h2>
                    )}
                    <Button
                        variant="icon"
                        className="ml-auto -mr-2"
                        aria-label="Close dialog"
                        icon={<X size={18} aria-hidden="true" />}
                        onClick={onClose}
                    />
                </div>
                <div className="px-6 py-5 text-sec">{children}</div>
                {actions && <div className="flex justify-end gap-2.5 px-6 pb-5">{actions}</div>}
            </Surface>
        </div>,
        modalRoot,
    );
};
