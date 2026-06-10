import React from "react";
import { Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Project } from "../../../context/ProjectContext.tsx";
import { Button, Eyebrow } from "../../ui/primitives";

interface ProjectBannerProps {
    project: Project;
    secretCount: number;
    onDelete: () => void;
}

/**
 * Header banner for the selected project on the dashboard. Open section
 * (no chassis border): eyebrow, display title, telemetry meta and actions.
 */
const ProjectBanner: React.FC<ProjectBannerProps> = ({ project, secretCount, onDelete }) => {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 flex-1">
                <Eyebrow as="p" className="text-accent!">
                    ▮ Project
                </Eyebrow>
                <h1 className="text-2xl font-bold text-pri truncate tracking-tight sm:text-3xl mt-1">
                    {project.name}
                </h1>
                <p className="font-mono text-xs uppercase tracking-[0.1em] text-sec mt-2">
                    {secretCount} {secretCount === 1 ? "secret" : "secrets"} {"stored"}
                </p>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
                <Button
                    variant="dangerOutline"
                    size="md"
                    icon={<Trash2 size={14} aria-hidden="true" />}
                    onClick={onDelete}
                >
                    Delete
                </Button>
                <Link to="/addSecret">
                    <Button
                        variant="primary"
                        size="md"
                        icon={<Plus size={14} aria-hidden="true" />}
                        iconPosition="left"
                    >
                        Add Secret
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ProjectBanner;
