import React, { useContext } from "react";
import { Project, ProjectContext, ProjectContextType } from "../../../context/ProjectContext.tsx";
import { Led } from "../../ui/primitives";

interface ProjectListItemProps {
    project: Project;
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({ project }) => {
    const { selectedProject, setSelectedProject } = useContext(
        ProjectContext,
    ) as ProjectContextType;
    const isSelected = selectedProject?.name === project.name;

    return (
        <button
            type="button"
            aria-current={isSelected ? "true" : undefined}
            className={[
                // 2px signal bar on the left when selected (drawn via left border)
                "flex items-center gap-2.5 w-full py-2.5 pr-3 pl-[calc(0.75rem-2px)] cursor-pointer touch-manipulation border-l-2",
                "transition-[background-color,border-color,color] duration-150",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base",
                isSelected
                    ? "bg-raised border-l-accent text-pri"
                    : "border-l-transparent hover:bg-raised/60 text-sec",
            ].join(" ")}
            onClick={() => setSelectedProject(project)}
        >
            <Led tone={isSelected ? "ok" : "mut"} />
            <span
                className={`truncate font-mono text-sm text-left flex-1 min-w-0 ${isSelected ? "font-semibold" : "font-normal"}`}
            >
                {project.name}
            </span>
            <span className="shrink-0 font-mono text-micro uppercase tracking-[0.06em] text-mut tabular-nums">
                {project.secrets.length} {project.secrets.length === 1 ? "secret" : "secrets"}
            </span>
        </button>
    );
};

export default ProjectListItem;
