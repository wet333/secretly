import React, {useContext} from 'react';
import Layout from '../components/ui/layout/Layout';
import {ProjectContext, ProjectContextType} from '../context/ProjectContext';
import SecretList from '../components/features/secrets/SecretList';
import ActivityList from '../components/features/activity/ActivityList';
import Button from "../components/ui/Button.tsx";
import {Plus, Trash2} from "lucide-react";
import {Link} from "react-router-dom";
import Loader from "../components/ui/Loader.tsx";

const Dashboard = () => {
    const { projects, selectedProject, deleteProject } = useContext(ProjectContext) as ProjectContextType;

    const projectCount = projects?.length ?? 0;
    const noProjects: boolean = (projectCount == 0);
    const noProjectSubtitle = "Create your first project to get started";
    const projectSubtitle = selectedProject?.secrets?.length + " secrets stored securely";

    React.useEffect(() => {
        document.title = "Secretly - Dashboard";
    }, []);

    return (
        <>
            {noProjects && (
                <Layout>
                    <div className="flex justify-center my-4">
                        <Loader />
                    </div>
                </Layout>
            )}
            {!noProjects && (
                <Layout>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold">{noProjects ? "No projects yet" : selectedProject?.name}</h1>
                            <p className="text-stone-400 text-md mt-2">{noProjects ? noProjectSubtitle : projectSubtitle}</p>
                        </div>
                        {!noProjects && selectedProject && (
                            <div className="flex items-center gap-x-2">
                                <Button
                                    variant={"iconDanger"}
                                    icon={<Trash2 size={18}/>}
                                    className="border border-stone-500/25"
                                    onClick={() => deleteProject(selectedProject)}
                                >
                                    Delete Project
                                </Button>
                                <Link to={"/addSecret"}>
                                    <Button
                                        variant={"primary"}
                                        icon={<Plus size={18}/>}
                                        iconPosition={"left"}
                                    >
                                        Add Secret
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                    {selectedProject && (
                        <SecretList count={selectedProject.secrets.length} secrets={selectedProject.secrets} />
                    )}
                    <ActivityList />
                </Layout>
            )}
        </>
    );
};

export default Dashboard;