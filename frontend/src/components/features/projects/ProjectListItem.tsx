import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Project, ProjectContext, ProjectContextType } from "../../../context/ProjectContext.tsx";
import { Led } from "../../ui/primitives";

interface ProjectListItemProps {
    project: Project;
}

const MARQUEE_MIN_SPEED = 22;
const MARQUEE_MAX_SPEED = 45;
const MARQUEE_FULL_SPEED_OVERFLOW = 180;
const MARQUEE_TRAILING_GAP = 24;
const MARQUEE_EDGE_PAUSE_MS = 300;

const marqueeSpeed = (overflow: number): number => {
    const ratio = Math.min(1, overflow / MARQUEE_FULL_SPEED_OVERFLOW);
    return MARQUEE_MIN_SPEED + (MARQUEE_MAX_SPEED - MARQUEE_MIN_SPEED) * ratio;
};

const ProjectListItem: React.FC<ProjectListItemProps> = ({ project }) => {
    const { selectedProject, setSelectedProject } = useContext(
        ProjectContext,
    ) as ProjectContextType;
    const isSelected = selectedProject?.name === project.name;

    const nameRef = useRef<HTMLSpanElement>(null);
    const animationRef = useRef<Animation | null>(null);
    const [scrolling, setScrolling] = useState(false);

    const stopMarquee = useCallback(() => {
        animationRef.current?.cancel();
        animationRef.current = null;
        setScrolling(false);
    }, []);

    const startMarquee = useCallback(() => {
        const el = nameRef.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const overflow = el.scrollWidth - el.clientWidth;
        if (overflow <= 1) return;

        const distance = overflow + MARQUEE_TRAILING_GAP;
        const forwardMs = (distance / marqueeSpeed(overflow)) * 1000;
        const returnMs = forwardMs / 3;
        const total = forwardMs + returnMs + MARQUEE_EDGE_PAUSE_MS * 2;
        const afterStartPause = MARQUEE_EDGE_PAUSE_MS / total;
        const reachEnd = (MARQUEE_EDGE_PAUSE_MS + forwardMs) / total;
        const leaveEnd = (MARQUEE_EDGE_PAUSE_MS * 2 + forwardMs) / total;

        animationRef.current?.cancel();
        setScrolling(true);
        animationRef.current = el.animate(
            [
                { transform: "translateX(0)", offset: 0, easing: "linear" },
                { transform: "translateX(0)", offset: afterStartPause, easing: "linear" },
                { transform: `translateX(-${distance}px)`, offset: reachEnd, easing: "linear" },
                { transform: `translateX(-${distance}px)`, offset: leaveEnd, easing: "ease-in" },
                { transform: "translateX(0)", offset: 1, easing: "linear" },
            ],
            { duration: total, iterations: Infinity },
        );
    }, []);

    useEffect(() => stopMarquee, [stopMarquee]);

    return (
        <button
            type="button"
            aria-current={isSelected ? "true" : undefined}
            className={[
                "flex items-center gap-2.5 w-full py-2.5 pr-3 pl-[calc(0.75rem-2px)] cursor-pointer touch-manipulation border-l-2",
                "transition-[background-color,border-color,color] duration-150",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base",
                isSelected
                    ? "bg-raised border-l-accent text-pri"
                    : "border-l-transparent hover:bg-raised/60 text-sec",
            ].join(" ")}
            onClick={() => setSelectedProject(project)}
            onMouseEnter={startMarquee}
            onMouseLeave={stopMarquee}
            onFocus={startMarquee}
            onBlur={stopMarquee}
        >
            <Led tone={isSelected ? "ok" : "mut"} />
            <span className="flex-1 min-w-0 overflow-hidden">
                <span
                    ref={nameRef}
                    className={[
                        "block font-mono text-sm text-left whitespace-nowrap",
                        scrolling ? "" : "overflow-hidden text-ellipsis",
                        isSelected ? "font-semibold" : "font-normal",
                    ].join(" ")}
                >
                    {project.name}
                </span>
            </span>
            <span className="shrink-0 font-mono text-micro uppercase tracking-[0.06em] text-mut tabular-nums">
                {project.secrets.length} {project.secrets.length === 1 ? "secret" : "secrets"}
            </span>
        </button>
    );
};

export default ProjectListItem;
