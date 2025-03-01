import React, {ChangeEvent, useContext, useState} from 'react';
import {Eye, EyeOff, Edit, Trash2, X, Check} from 'lucide-react';
import Button from "../../ui/Button.tsx";
import {ProjectContext, ProjectContextType, Secret} from "../../../context/ProjectContext.tsx";

interface SecretListItemProps {
    secret: Secret;
}

const SecretListItem : React.FC<SecretListItemProps> = ({ secret }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [editValue, setEditValue] = useState(secret.value);
    const { deleteSecret, updateSecret } = useContext(ProjectContext) as ProjectContextType;

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const toggleEditable = () => {
        setIsEditable(!isEditable);
        if (isEditable) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    };

    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditValue(e.target.value);
    }

    const saveEdit = () => {
        setIsEditable(false);
        updateSecret(secret.projectName, secret.keyName, editValue);
        setEditValue(editValue);
    }

    const cancelEdit = () => {
        setIsEditable(false);
        setEditValue(secret.value);
    }

    const deleteSecretAction = () => {
        deleteSecret(secret.projectName, secret.keyName);
    };

    return (
        <tr className="bg-stone-900 hover:bg-stone-800">
            <td className="py-4 px-4">
                <div className="font-mono text-sm text-amber-100">{secret.keyName}</div>
            </td>
            <td className="py-4 px-4 w-1/2">
                <div className="flex items-center">
                    {isEditable ? (
                        <div className="flex w-full space-x-2">
                            <input
                                type="text"
                                value={editValue}
                                onChange={handleValueChange}
                                className="bg-stone-700 text-white font-mono text-sm px-2 py-1 rounded w-full"
                                autoFocus
                            />
                            <Button
                                variant={"icon"}
                                icon={<Check size={16} className="text-green-500" />}
                                onClick={saveEdit}
                            />
                            <Button
                                variant={"icon"}
                                icon={<X size={16} className="text-red-500" />}
                                onClick={cancelEdit}
                            />
                        </div>
                    ) : (
                        <div className={`font-mono text-sm truncate max-w-md ${!isVisible ? "cursor-default" : ""}`}>
                            {isVisible ? secret.value : "••••••••••••••••••••••"}
                        </div>
                    )}
                </div>
            </td>
            <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end space-x-2">
                    {!isEditable && (
                        <>
                            <Button
                                variant={"icon"}
                                icon={isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                                onClick={toggleVisibility}
                            />
                            <Button
                                variant={"icon"}
                                icon={<Edit size={16} />}
                                onClick={toggleEditable}
                            />
                            <Button
                                variant={"icon"}
                                icon={<Trash2 size={16} />}
                                onClick={deleteSecretAction}
                            />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default SecretListItem;