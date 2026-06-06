import React from "react";
import Button from "../Button.tsx";
import {ArrowLeft} from "lucide-react";
import {Link} from "react-router-dom";

interface SectionTitleProps {
    hasBackButton: boolean;
    title: string;
    subtitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ hasBackButton, title, subtitle }) => {
    return (
        <div className="mb-8 flex gap-4 items-start">
            {hasBackButton && (
                <Link to="/" className="shrink-0 mt-1">
                    <Button
                        variant="iconColor"
                        aria-label="Back to dashboard"
                        icon={<ArrowLeft size={18} aria-hidden="true" />}
                    />
                </Link>
            )}
            <div className="min-w-0">
                <h1 className="text-2xl font-semibold text-stone-50 tracking-tight">{title}</h1>
                <p className="text-stone-400 text-sm mt-1.5 leading-relaxed">{subtitle}</p>
            </div>
        </div>
    )
}

export default SectionTitle;
