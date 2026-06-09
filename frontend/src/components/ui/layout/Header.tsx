import { Shield, Settings } from 'lucide-react';
import React, {useContext} from "react";
import Button from "../Button.tsx";
import {ADMIN_NAME, LOGO_TITLE} from "../../../lib/constants.ts";
import {AppGlobalContext} from "../../../context/AppGlobalContext.tsx";

const Header : React.FC = () => {

    const { toggleModalVisibility } = useContext(AppGlobalContext)!;

    const extractInitials = (input: string): string => {
        if (!input || input.trim() === '') {
            return '';
        }
        const words = input.trim().split(/\s+/);
        const initials = words.map(word => word.charAt(0).toUpperCase());
        return initials.slice(0, 2).join('');
    }

    return (
        <header className="shrink-0 pt-[max(0.25rem,env(safe-area-inset-top))]">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-600/15 border border-amber-500/20">
                        <Shield className="h-5 w-5 text-amber-500" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                        <span className="text-lg font-semibold tracking-tight text-stone-50">
                            {LOGO_TITLE}
                        </span>
                        <p className="text-[11px] uppercase tracking-widest text-stone-500 font-medium">
                            Secure vault
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <Button
                        variant="icon"
                        aria-label="Open settings"
                        icon={<Settings size={20} aria-hidden="true" />}
                        onClick={toggleModalVisibility}
                    />
                    <div
                        className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center ring-2 ring-stone-800"
                        title={ADMIN_NAME}
                        aria-label={`Signed in as ${ADMIN_NAME}`}
                    >
                        <span className="text-xs font-semibold text-stone-950 tabular-nums">
                            {extractInitials(ADMIN_NAME)}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
