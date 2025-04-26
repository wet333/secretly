import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

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

    if (!isOpen) return null;

    const modalRoot = document.getElementById('modal-root')!;
    return createPortal(
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={`relative bg-stone-900 text-amber-50 rounded-lg shadow-lg px-6 pt-4 pb-1 ${sizeClasses[size]}`}
            >
                {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
                <div className="mb-4">
                    {children}
                </div>
                {actions && (
                    <div className="flex justify-end space-x-2">
                        {actions}
                    </div>
                )}
            </div>
        </div>,
        modalRoot
    )
}