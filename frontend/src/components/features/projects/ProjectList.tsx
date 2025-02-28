import React from 'react';
import ProjectListItem from './ProjectListItem.tsx';
import {Project} from "../../../context/ProjectContext.tsx";
import {Link} from "react-router-dom";

interface ProjectListProps {
    projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
    return (
        <div className="flex flex-col space-y-1 gap-y-1">
            {projects.map((project: Project) => (
                <Link key={project.name} to={"/"}>
                    <ProjectListItem key={project.name} project={project} />
                </Link>
            ))}
        </div>
    );
};

export default ProjectList;