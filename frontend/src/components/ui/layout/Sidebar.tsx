import React, { useContext, useState } from 'react';
import { Search, Plus, FolderLock } from 'lucide-react';
import ProjectList from '../../features/projects/ProjectList.tsx';
import {ProjectContext, Project, ProjectContextType} from '../../../context/ProjectContext.tsx';
import Button from "../Button.tsx";
import {Link} from "react-router-dom";

const Sidebar : React.FC = () => {
    const { projects } = useContext(ProjectContext) as ProjectContextType;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProjects = projects.filter((project: Project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <aside className="flex w-full md:w-72 shrink-0 flex-col border-b md:border-b-0 md:border-r border-stone-800/60 bg-stone-950/50 max-h-[40vh] md:max-h-none">
            <div className="p-4 border-b border-stone-800/40">
                <label htmlFor="project-search" className="sr-only">
                    Search projects
                </label>
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" aria-hidden="true" />
                    <input
                        id="project-search"
                        name="project-search"
                        type="search"
                        placeholder="Search projects…"
                        autoComplete="off"
                        spellCheck={false}
                        className="input-field input-field-search text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 overscroll-contain">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                        Projects
                    </h2>
                    <Link to="/createProject">
                        <Button
                            variant="iconColor"
                            size="sm"
                            aria-label="Create project"
                            icon={<Plus size={16} aria-hidden="true" />}
                        />
                    </Link>
                </div>
                {filteredProjects.length === 0 ? (
                    <div className="empty-state py-8">
                        <FolderLock size={32} className="text-stone-600 mb-3" aria-hidden="true" />
                        <p className="text-sm text-stone-500">
                            {searchQuery ? 'No projects match your search' : 'No projects yet'}
                        </p>
                        {!searchQuery && (
                            <Link to="/createProject" className="mt-3 text-sm font-medium text-amber-500 hover:text-amber-400">
                                Create your first project
                            </Link>
                        )}
                    </div>
                ) : (
                    <ProjectList projects={filteredProjects} />
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
