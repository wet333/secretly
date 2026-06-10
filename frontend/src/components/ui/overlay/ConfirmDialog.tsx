import React from "react";
import { Modal } from "./Modal";
import { Button } from "../primitives";

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    confirmLabel?: string;
    cancelLabel?: string;
    tone?: "danger" | "default";
    onConfirm: () => void;
    onClose: () => void;
    children: React.ReactNode;
}

/**
 * Confirmation dialog built on Modal. Consolidates the repeated
 * "delete X? cancel / confirm" pattern (delete project, delete secret).
 */
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    title,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    tone = "danger",
    onConfirm,
    onClose,
    children,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            title={title}
            onClose={onClose}
            actions={
                <>
                    <Button variant="ghost" onClick={onClose}>
                        {cancelLabel}
                    </Button>
                    <Button variant={tone === "danger" ? "danger" : "primary"} onClick={onConfirm}>
                        {confirmLabel}
                    </Button>
                </>
            }
        >
            <p className="text-sm leading-relaxed">{children}</p>
        </Modal>
    );
};

export default ConfirmDialog;
