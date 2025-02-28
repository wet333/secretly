import React, { useContext, useState } from 'react';
import { Search, Plus } from 'lucide-react';
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
        <div className="w-64 bg-stone-900 border-r border-stone-800 p-4">
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full bg-stone-800 rounded-lg py-2 pl-10 pr-4 text-sm border border-stone-700 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search size={16} className="absolute left-3 top-2.5 text-stone-500" />
            </div>

            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">Projects</h2>
                    <Link to={"/createProject"}>
                        <Button
                            variant={"iconColor"}
                            icon={<Plus size={16} />}
                            // TODO: Add create project action
                        />
                    </Link>
                </div>
                <ProjectList projects={filteredProjects} />
            </div>
        </div>
    );
};

export default Sidebar;