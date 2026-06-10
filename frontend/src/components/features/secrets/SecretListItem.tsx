import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { Eye, EyeOff, Edit, Trash2, X, Check, Copy } from "lucide-react";
import { Button, Field } from "../../ui/primitives";
import ConfirmDialog from "../../ui/overlay/ConfirmDialog.tsx";
import { ProjectContext, ProjectContextType, Secret } from "../../../context/ProjectContext.tsx";

interface SecretListItemProps {
    secret: Secret;
}

const COPY_FEEDBACK_MS = 1500;

const SecretListItem: React.FC<SecretListItemProps> = ({ secret }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [editValue, setEditValue] = useState(secret.value);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const copyTimeout = useRef<ReturnType<typeof setTimeout>>(null);
    const { deleteSecret, updateSecret } = useContext(ProjectContext) as ProjectContextType;

    useEffect(() => {
        return () => {
            if (copyTimeout.current) clearTimeout(copyTimeout.current);
        };
    }, []);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const toggleEditable = () => {
        setIsEditable(!isEditable);
        if (isEditable) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditValue(e.target.value);
    };

    const saveEdit = () => {
        setIsEditable(false);
        updateSecret(secret.projectName, secret.keyName, editValue);
    };

    const cancelEdit = () => {
        setIsEditable(false);
        setEditValue(secret.value);
    };

    const confirmDelete = () => {
        deleteSecret(secret.projectName, secret.keyName);
        setShowDeleteConfirm(false);
    };

    const copyValue = async () => {
        try {
            await navigator.clipboard.writeText(secret.value);
            setIsCopied(true);
            if (copyTimeout.current) clearTimeout(copyTimeout.current);
            copyTimeout.current = setTimeout(() => setIsCopied(false), COPY_FEEDBACK_MS);
        } catch (err) {
            console.error("Failed to copy secret value:", err);
        }
    };

    return (
        <>
            {showDeleteConfirm && (
                <ConfirmDialog
                    isOpen={showDeleteConfirm}
                    title="Delete Secret"
                    confirmLabel="Delete Secret"
                    onConfirm={confirmDelete}
                    onClose={() => setShowDeleteConfirm(false)}
                >
                    Delete <span className="font-mono text-highlight">{secret.keyName}</span>? This
                    cannot be undone.
                </ConfirmDialog>
            )}
            <tr className="group table-row-hover">
                <td className="py-3 px-4 min-w-0">
                    <div className="font-mono text-sm font-semibold text-pri break-words">
                        {secret.keyName}
                    </div>
                </td>
                <td className="py-3 px-4 min-w-0">
                    {isEditable ? (
                        <div className="flex items-center gap-2 min-w-0">
                            <Field
                                type="text"
                                name="secret-value-edit"
                                value={editValue}
                                onChange={handleValueChange}
                                autoComplete="off"
                                spellCheck={false}
                                aria-label={`Edit value for ${secret.keyName}`}
                                className="font-mono text-sm py-1.5 min-w-0 flex-1"
                            />
                            <Button
                                variant="icon"
                                aria-label="Save changes"
                                icon={<Check size={16} className="text-ok" aria-hidden="true" />}
                                onClick={saveEdit}
                            />
                            <Button
                                variant="icon"
                                aria-label="Cancel editing"
                                icon={<X size={16} className="text-err" aria-hidden="true" />}
                                onClick={cancelEdit}
                            />
                        </div>
                    ) : (
                        <span
                            className={`min-w-0 truncate ${isVisible ? "secret-value" : "secret-mask"}`}
                        >
                            {isVisible ? secret.value : "••••••••••••••••••••••"}
                        </span>
                    )}
                </td>
                <td className="py-3 px-4 text-right w-[8.5rem]">
                    {!isEditable && (
                        <div className="flex items-center justify-end gap-0.5 opacity-80 group-hover:opacity-100 transition-opacity duration-150">
                            <Button
                                variant="icon"
                                aria-label={isVisible ? "Hide secret value" : "Reveal secret value"}
                                icon={
                                    isVisible ? (
                                        <EyeOff size={16} aria-hidden="true" />
                                    ) : (
                                        <Eye size={16} aria-hidden="true" />
                                    )
                                }
                                onClick={toggleVisibility}
                            />
                            <Button
                                variant="icon"
                                aria-label={isCopied ? "Copied" : "Copy secret value"}
                                icon={
                                    isCopied ? (
                                        <Check size={16} className="text-ok" aria-hidden="true" />
                                    ) : (
                                        <Copy size={16} aria-hidden="true" />
                                    )
                                }
                                onClick={copyValue}
                            />
                            <Button
                                variant="icon"
                                aria-label="Edit secret"
                                icon={<Edit size={16} aria-hidden="true" />}
                                onClick={toggleEditable}
                            />
                            <Button
                                variant="icon"
                                aria-label="Delete secret"
                                icon={<Trash2 size={16} aria-hidden="true" />}
                                onClick={() => setShowDeleteConfirm(true)}
                            />
                        </div>
                    )}
                </td>
            </tr>
        </>
    );
};

export default SecretListItem;
