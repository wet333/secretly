import React, { useContext } from 'react';
import { Lock } from 'lucide-react';
import {Project, ProjectContext, ProjectContextType} from '../../../context/ProjectContext.tsx';

interface ProjectListItemProps {
    project: Project;
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({ project }) => {
    const { selectedProject, setSelectedProject } = useContext(ProjectContext) as ProjectContextType;
    const isSelected = selectedProject?.name === project.name;

    return (
        <button
            className={`flex items-center justify-between w-full py-2.5 px-3 rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-stone-800' : 'hover:bg-stone-800/50'}`}
            onClick={() => setSelectedProject(project)}
        >
            <div className="grid w-full h-4 grid-cols-[18px_1fr_auto] items-center content-center">
                <Lock size={14} className={`${isSelected ? 'text-amber-400' : 'text-stone-500'}`} />
                <span className="block whitespace-nowrap overflow-hidden text-ellipsis text-left pl-1 text-sm font-medium">{project.name}</span>
                <span className="h-fit px-2 py-0.5 text-xs font-bold bg-amber-400 text-stone-950 rounded-full">{project.secrets.length}</span>
            </div>
        </button>
    );
};

export default ProjectListItem;