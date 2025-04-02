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
            <div className="flex items-center">
                <Lock size={14} className={`mr-2 ${isSelected ? 'text-amber-400' : 'text-stone-500'}`} />
                <span className="text-sm font-medium">{project.name}</span>
            </div>
            <span className="text-xs bg-amber-400 text-stone-950 font-bold rounded-full px-2 py-0.5">{project.secrets.length}</span>
        </button>
    );
};

export default ProjectListItem;