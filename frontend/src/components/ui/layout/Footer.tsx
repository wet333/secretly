import React from "react";
import {ADMIN_NAME} from "../../../lib/constants.ts";

const Footer: React.FC = () => {
    return (
        <footer className="shrink-0 pb-[max(0.25rem,env(safe-area-inset-bottom))]">
            <p className="text-[11px] font-medium tracking-wide text-stone-500 text-center sm:text-left">
                Made by <span className="text-stone-400">{ADMIN_NAME}</span>
            </p>
        </footer>
    );
};

export default Footer;
