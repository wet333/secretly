import React, { useState } from 'react';
import { Eye, EyeOff, Edit, Trash2 } from 'lucide-react';
import Button from "../../ui/Button.tsx";
import {Secret} from "../../../context/ProjectContext.tsx";

interface SecretListItemProps {
    secret: Secret;
}

const SecretListItem : React.FC<SecretListItemProps> = ({ secret }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <tr className="bg-stone-900 hover:bg-stone-800">
            <td className="py-4 px-4">
                <div className="font-mono text-sm text-amber-100">{secret.keyName}</div>
            </td>
            <td className="py-4 px-4 w-1/2">
                <div className="flex items-center">
                    <div className={`font-mono text-sm truncate max-w-md ${!isVisible ? "cursor-default" : ""}`}>
                        {isVisible ? secret.value : "••••••••••••••••••••••"}
                    </div>
                </div>
            </td>
            <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end space-x-2">
                    <Button
                        variant={"icon"}
                        icon={isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                        onClick={toggleVisibility}
                    />
                    <Button
                        variant={"icon"}
                        icon={<Edit size={16} />}
                    />
                    <Button
                        variant={"icon"}
                        icon={<Trash2 size={16} />}
                    />
                </div>
            </td>
        </tr>
    );
};

export default SecretListItem;