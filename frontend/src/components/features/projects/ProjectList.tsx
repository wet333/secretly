import React from 'react';
import ProjectListItem from './ProjectListItem.tsx';
import {Project} from "../../../context/ProjectContext.tsx";

interface ProjectListProps {
    projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
    return (
        <ul className="flex flex-col gap-1 list-none m-0 p-0" role="list">
            {projects.map((project: Project) => (
                <li key={project.name}>
                    <ProjectListItem project={project} />
                </li>
            ))}
        </ul>
    );
};

export default ProjectList;
