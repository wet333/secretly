import React, { useContext, useState } from "react";
import Layout from "../components/ui/layout/Layout";
import { ProjectContext, ProjectContextType } from "../context/ProjectContext";
import SecretList from "../components/features/secrets/SecretList";
import ProjectBanner from "../components/features/projects/ProjectBanner";
import { Button, Loader, IconBadge, Surface, EmptyState } from "../components/ui/primitives";
import { Plus, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import ConfirmDialog from "../components/ui/overlay/ConfirmDialog.tsx";

const Dashboard = () => {
    const { projects, initialized, selectedProject, deleteProject } = useContext(
        ProjectContext,
    ) as ProjectContextType;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const projectCount = projects?.length ?? 0;
    const noProjects: boolean = projectCount === 0;
    const secretCount = selectedProject?.secrets?.length ?? 0;

    React.useEffect(() => {
        document.title = "Secretly - Dashboard";
    }, []);

    const handleDeleteProject = () => {
        if (selectedProject) {
            deleteProject(selectedProject);
            setShowDeleteConfirm(false);
        }
    };

    return (
        <>
            {!initialized ? (
                <Layout>
                    <div className="flex justify-center py-16">
                        <Loader />
                    </div>
                </Layout>
            ) : (
                <Layout>
                    {showDeleteConfirm && selectedProject && (
                        <ConfirmDialog
                            isOpen={showDeleteConfirm}
                            title="Delete Project"
                            confirmLabel="Delete Project"
                            onConfirm={handleDeleteProject}
                            onClose={() => setShowDeleteConfirm(false)}
                        >
                            Delete <span className="text-highlight">{selectedProject.name}</span>{" "}
                            and all {secretCount} secrets? This cannot be undone.
                        </ConfirmDialog>
                    )}

                    {noProjects ? (
                        <Surface className="max-w-lg mx-auto w-full">
                            <EmptyState
                                className="p-8"
                                icon={
                                    <IconBadge size="lg" tone="accent" className="mx-auto">
                                        <ShieldCheck size={28} aria-hidden="true" />
                                    </IconBadge>
                                }
                                title={
                                    <span className="text-2xl font-bold text-pri">
                                        Welcome to Secretly
                                    </span>
                                }
                                description="Store API keys and environment variables in an encrypted vault. Create your first project to get started."
                                action={
                                    <Link to="/createProject">
                                        <Button
                                            variant="primary"
                                            icon={<Plus size={16} />}
                                            iconPosition="left"
                                        >
                                            Create Project
                                        </Button>
                                    </Link>
                                }
                            />
                        </Surface>
                    ) : (
                        <>
                            {selectedProject && (
                                <ProjectBanner
                                    project={selectedProject}
                                    secretCount={secretCount}
                                    onDelete={() => setShowDeleteConfirm(true)}
                                />
                            )}

                            {selectedProject && (
                                <SecretList
                                    count={selectedProject.secrets.length}
                                    secrets={selectedProject.secrets}
                                />
                            )}
                        </>
                    )}
                </Layout>
            )}
        </>
    );
};

export default Dashboard;
