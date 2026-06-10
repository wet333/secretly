import { Shield, Settings } from "lucide-react";
import React, { useContext } from "react";
import { Button, IconBadge, Led } from "../primitives";
import { ADMIN_NAME, LOGO_TITLE } from "../../../lib/constants.ts";
import { AppGlobalContext } from "../../../context/AppGlobalContext.tsx";
import { useApiStatus } from "../../../hooks/useApiStatus.ts";

const Header: React.FC = () => {
    const { toggleModalVisibility } = useContext(AppGlobalContext)!;
    const apiStatus = useApiStatus();

    const apiLedTone = apiStatus === "online" ? "ok" : apiStatus === "offline" ? "err" : "mut";
    const apiLabel =
        apiStatus === "online"
            ? "API:ONLINE"
            : apiStatus === "offline"
              ? "API:OFFLINE"
              : "API:…";

    const extractInitials = (input: string): string => {
        if (!input || input.trim() === "") {
            return "";
        }
        const words = input.trim().split(/\s+/);
        const initials = words.map((word) => word.charAt(0).toUpperCase());
        return initials.slice(0, 2).join("");
    };

    return (
        <header className="shrink-0 pt-[max(0.25rem,env(safe-area-inset-top))]">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                    <div className="flex items-center gap-3 min-w-0">
                        <IconBadge size="sm" tone="accent" className="shrink-0">
                            <Shield className="h-5 w-5" aria-hidden="true" />
                        </IconBadge>
                        <div className="min-w-0">
                            <span className="block font-mono text-sm font-bold tracking-[0.22em] uppercase text-pri leading-tight">
                                {LOGO_TITLE}
                            </span>
                            <span className="type-mono-micro block font-mono text-2xs tracking-[0.22em] uppercase text-mut leading-tight mt-0.5">
                                Centralized Key Vault
                            </span>
                        </div>
                    </div>
                    <span
                        className="hidden sm:block w-px h-6 bg-line shrink-0"
                        aria-hidden="true"
                    />
                    <div
                        className="hidden sm:flex items-center gap-2 shrink-0"
                        role="status"
                        aria-live="polite"
                        aria-label={`API status: ${apiLabel}`}
                    >
                        <Led tone={apiLedTone} pulse={apiStatus === "online"} />
                        <span className="font-mono text-micro tracking-[0.14em] text-sec">
                            {apiLabel}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <Button
                        variant="icon"
                        aria-label="Open settings"
                        icon={<Settings size={20} aria-hidden="true" />}
                        onClick={toggleModalVisibility}
                    />
                    <div
                        className="h-8 w-8 bg-raised border border-line-strong flex items-center justify-center"
                        title={ADMIN_NAME}
                        aria-label={`Signed in as ${ADMIN_NAME}`}
                    >
                        <span className="font-mono text-xs font-semibold text-pri tabular-nums">
                            {extractInitials(ADMIN_NAME)}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
