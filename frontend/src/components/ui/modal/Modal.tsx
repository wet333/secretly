import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Button from "../Button.tsx";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    size?: 'small' | 'medium' | 'large' | 'full',
    title?: string,
    children: ReactNode,
    actions?: ReactNode
}

const sizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
    small: "max-w-sm",
    medium: "max-w-md",
    large: "max-w-lg",
    full: "w-full md:w-2/3"
};

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    size = "medium",
    title,
    children,
    actions
}) => {

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const modalRoot = document.getElementById('modal-root')!;
    return createPortal(
        <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
        >
            <div
                className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                className={`relative card w-full ${sizeClasses[size]} overscroll-contain shadow-2xl shadow-black/40`}
            >
                <div className="flex items-start justify-between px-6 pt-5 pb-0">
                    {title && (
                        <h2 id="modal-title" className="text-lg font-semibold text-stone-100">
                            {title}
                        </h2>
                    )}
                    <Button
                        variant="icon"
                        className="ml-auto -mr-1 -mt-1"
                        aria-label="Close dialog"
                        icon={<X size={18} aria-hidden="true" />}
                        onClick={onClose}
                    />
                </div>
                <div className="px-6 py-4 text-stone-300">
                    {children}
                </div>
                {actions && (
                    <div className="flex justify-end gap-2 px-6 pb-5">
                        {actions}
                    </div>
                )}
            </div>
        </div>,
        modalRoot
    )
}
