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
            type="button"
            aria-current={isSelected ? 'true' : undefined}
            className={[
                'flex items-center justify-between w-full py-2.5 px-3 rounded-lg cursor-pointer touch-manipulation',
                'transition-[background-color,border-color] duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950',
                isSelected
                    ? 'bg-amber-600/10 border border-amber-500/25 text-stone-100'
                    : 'border border-transparent hover:bg-stone-800/60 text-stone-300',
            ].join(' ')}
            onClick={() => setSelectedProject(project)}
        >
            <div className="flex items-center gap-2 min-w-0 flex-1">
                <Lock
                    size={14}
                    className={isSelected ? 'text-amber-500 shrink-0' : 'text-stone-500 shrink-0'}
                    aria-hidden="true"
                />
                <span className="truncate text-sm font-medium text-left">{project.name}</span>
            </div>
            <span className={[
                'shrink-0 ml-2 px-2 py-0.5 text-[11px] font-semibold rounded-full tabular-nums',
                isSelected
                    ? 'bg-amber-500 text-stone-950'
                    : 'bg-stone-800 text-stone-400',
            ].join(' ')}>
                {project.secrets.length}
            </span>
        </button>
    );
};

export default ProjectListItem;
