import { Shield, Settings } from 'lucide-react';
import React from "react";
import Button from "../Button.tsx";
import {LOGO_TITLE} from "../../../constants.ts";

const Header : React.FC = () => {
    return (
        <header className="bg-stone-900 border-b border-stone-800 py-3 px-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Shield className="h-6 w-6 mb-[-2px] text-amber-400 mr-2" />
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300">
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
                        <span className="text-sm font-medium text-stone-900">AW</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;