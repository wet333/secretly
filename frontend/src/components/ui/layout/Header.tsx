import { Shield, Settings } from 'lucide-react';
import React from "react";
import Button from "../Button.tsx";
import {ADMIN_NAME, LOGO_TITLE} from "../../../lib/constants.ts";

const Header : React.FC = () => {

    const extractInitials = (input: string): string => {
        if (!input || input.trim() === '') {
            return '';
        }
        const words = input.trim().split(/\s+/);
        const initials = words.map(word => word.charAt(0).toUpperCase());
        return initials.slice(0, 2).join('');
    }

    return (
        <header className="bg-stone-900 border-b border-stone-800 py-3 px-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Shield className="h-6 w-6 mb-[-2px] text-amber-600 mr-2" />
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-300">
                        {LOGO_TITLE}
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant={"icon"}
                        className={"rounded-full cursor-pointer"}
                        icon={<Settings size={24} />}
                        iconPosition="left"
                    />
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-600 to-amber-400 flex items-center justify-center">
                        <span className="text-sm font-medium text-stone-900">{extractInitials(ADMIN_NAME)}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;