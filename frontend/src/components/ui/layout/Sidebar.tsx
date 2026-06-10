import React, { useContext, useState } from "react";
import { Search, Plus, FolderLock } from "lucide-react";
import ProjectList from "../../features/projects/ProjectList.tsx";
import { ProjectContext, Project, ProjectContextType } from "../../../context/ProjectContext.tsx";
import { Button, Surface, Field, Eyebrow, EmptyState } from "../primitives";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
    const { projects } = useContext(ProjectContext) as ProjectContextType;
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProjects = projects.filter((project: Project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const isFiltering = searchQuery.length > 0;

    return (
        <Surface as="aside" className="overflow-hidden lg:overflow-visible">
            <div className="p-3 border-b border-line">
                <Eyebrow as="h2" className="mb-3">
                    Projects
                </Eyebrow>
                <Link to="/createProject" className="block mb-3">
                    <Button
                        variant="outline"
                        size="sm"
                        fullWidth
                        icon={<Plus size={14} aria-hidden="true" />}
                    >
                        Add Project
                    </Button>
                </Link>
                <label htmlFor="project-search" className="sr-only">
                    Filter projects
                </label>
                <Field
                    id="project-search"
                    name="project-search"
                    type="search"
                    placeholder="Filter projects…"
                    autoComplete="off"
                    spellCheck={false}
                    className="text-sm font-mono"
                    icon={<Search size={16} aria-hidden="true" />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {isFiltering && (
                    <p className="mt-2 font-mono text-micro uppercase tracking-[0.08em] text-mut tabular-nums">
                        {filteredProjects.length} of {projects.length}{" "}
                        {projects.length === 1 ? "project" : "projects"}
                    </p>
                )}
            </div>

            <div className="p-3">
                {filteredProjects.length === 0 ? (
                    <EmptyState
                        className="py-6"
                        icon={<FolderLock size={28} aria-hidden="true" />}
                        description={
                            <>
                                {searchQuery ? "No projects match your search" : "No projects yet"}
                                {!searchQuery && (
                                    <Link
                                        to="/createProject"
                                        className="mt-2 block text-sm font-medium text-accent hover:text-accent-up"
                                    >
                                        Create your first project
                                    </Link>
                                )}
                            </>
                        }
                    />
                ) : (
                    <ProjectList projects={filteredProjects} />
                )}
            </div>
        </Surface>
    );
};

export default Sidebar;
