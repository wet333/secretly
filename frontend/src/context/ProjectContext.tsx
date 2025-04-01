import React, {createContext, ReactNode, useState} from 'react';
import {API_URL} from "../lib/constants.ts";
import API from "../lib/api.ts";

export interface Project {
    name: string;
    secrets: Secret[];
}

export interface Secret {
    projectName: string;
    keyName: string;
    value: string;
}

export interface ProjectContextType {
    projects: Project[],
    selectedProject: Project | null,
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>,
    addProject: (project: Project) => void,
    deleteProject: (project: Project) => void,
    addSecret: (projectName: string, secret: Omit<Secret, 'projectName'>) => void,
    updateSecret: (projectName: string, keyName: string, newValue: string) => void,
    deleteSecret: (projectName: string, keyName: string) => void,
}

// Create the context
export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectProviderProps {
    children: ReactNode;
}

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const fetchProjects = async () => {
        try {
            const response = await API.get(API_URL + "projects");
            if (response.status === 200 && response.data.data) {
                const fetchedProjects = response.data.data;
                setProjects(fetchedProjects);

                if (fetchedProjects.length > 0 && !selectedProject) {
                    setSelectedProject(fetchedProjects[0]);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        fetchProjects();
    });

    // Needed this to sync the secretList when modified
    React.useEffect(() => {
        if (selectedProject) {
            const currentProject = projects.find(p => p.name === selectedProject.name);
            if (currentProject) {
                setSelectedProject(currentProject);
            }
            else if (projects.length > 0) {
                setSelectedProject(projects[0]);
            }
        }
    }, [projects, selectedProject, selectedProject?.name]);

    // Add functions to manipulate projects and secrets
    const addProject = async (project: Project) => {
        const response = await API.post("/projects", project);
        if (response.status === 200 && response?.data.data) {
            setProjects([...projects, response.data.data]);
        }
    };

    const deleteProject = async (project: Project) => {
        {/* TODO: Add custom confirmation modal */}
        const proceed = window.confirm("Are you sure you want to delete this project?");
        if (proceed) {
            const response = await API.delete(`/projects/${project.name}`);
            if (response.status === 200 && response?.data.data) {
                await fetchProjects();
            }
        }
    }

    const addSecret = async (projectName: string, secret: Omit<Secret, 'projectName'>) => {
        const response = await API.post("/secrets/" + projectName, secret);

        if (response.status === 200 && response?.data.data) {
            const updatedProjects = projects.map(project => {
                if (project.name === projectName) {
                    return {
                        ...project,
                        secrets: [...project.secrets, {...secret, projectName}]
                    };
                }
                return project;
            });
            setProjects(updatedProjects);
        }
    };

    const updateSecret = async (projectName: string, keyName: string, newValue: string) => {
        const updatedSecret: Secret = {
            projectName: projectName,
            keyName: keyName,
            value: newValue,
        };
        const response = await API.put(`/secrets/${projectName}/${keyName}`, updatedSecret);

        if (response.status === 200 && response?.data.data) {
            const updatedProjects = projects.map(project => {
                if (project.name === projectName) {
                    return {
                        ...project,
                        secrets: project.secrets.map(secret => {
                            if (secret.keyName === keyName) {
                                return {...secret, value: newValue};
                            }
                            return secret;
                        })
                    };
                }
                return project;
            });
            setProjects(updatedProjects);
        }
    };

    const deleteSecret = async (projectName: string, keyName: string) => {
        const proceed = window.confirm("Are you sure you want to delete this project?");

        if (proceed) {
            const response = await API.delete(`/secrets/${projectName}/${keyName}`);
            if (response.status === 200 && response?.data.data) {
                const updatedProjects = projects.map(project => {
                    if (project.name === projectName) {
                        return {
                            ...project,
                            secrets: project.secrets.filter(secret => secret.keyName !== keyName)
                        };
                    }
                    return project;
                });
                setProjects(updatedProjects);
            }
        }
    };

    return (
        <ProjectContext.Provider value={{
            projects,
            selectedProject,
            setSelectedProject,
            addProject,
            deleteProject,
            addSecret,
            updateSecret,
            deleteSecret
        }}>
            {children}
        </ProjectContext.Provider>
    );
};