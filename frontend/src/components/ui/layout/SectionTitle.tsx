import React from "react";
import { Eyebrow } from "../primitives";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionTitleProps {
    hasBackButton: boolean;
    title: string;
    subtitle: string;
    eyebrow?: string;
}

const backLinkClass = [
    "inline-flex items-center justify-center gap-2 touch-manipulation select-none shrink-0",
    "font-mono uppercase tracking-[0.08em] font-medium text-xs py-2 px-4",
    "transition-[background-color,border-color,color,box-shadow,opacity,transform] duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:ring-offset-base focus-visible:ring-accent",
    "bg-panel text-sec hover:bg-raised hover:text-pri border border-line-strong",
].join(" ");

const SectionTitle: React.FC<SectionTitleProps> = ({ hasBackButton, title, subtitle, eyebrow }) => {
    return (
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 flex-1">
                {eyebrow && (
                    <Eyebrow as="p" className="text-accent!">
                        ▮ {eyebrow}
                    </Eyebrow>
                )}
                <h1
                    className={`min-w-0 text-2xl font-bold text-pri tracking-tight text-pretty ${
                        eyebrow ? "mt-1" : ""
                    }`}
                >
                    {title}
                </h1>
                <p className="text-mut text-sm mt-1.5 leading-relaxed text-pretty">{subtitle}</p>
            </div>
            {hasBackButton && (
                <Link to="/" className={backLinkClass}>
                    <ArrowLeft size={14} aria-hidden="true" />
                    Back
                </Link>
            )}
        </header>
    );
};

export default SectionTitle;
