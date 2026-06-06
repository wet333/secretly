import React, {useContext, useState} from 'react';
import Layout from '../components/ui/layout/Layout';
import {ProjectContext, ProjectContextType} from '../context/ProjectContext';
import SecretList from '../components/features/secrets/SecretList';
import ActivityList from '../components/features/activity/ActivityList';
import Button from "../components/ui/Button.tsx";
import {Plus, Trash2, KeyRound, ShieldCheck} from "lucide-react";
import {Link} from "react-router-dom";
import Loader from "../components/ui/Loader.tsx";
import {Modal} from "../components/ui/modal/Modal.tsx";

const Dashboard = () => {
    const { projects, initialized, selectedProject, deleteProject } = useContext(ProjectContext) as ProjectContextType;
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
                        <Modal
                            isOpen={showDeleteConfirm}
                            title="Delete Project"
                            onClose={() => setShowDeleteConfirm(false)}
                            actions={
                                <>
                                    <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="danger" onClick={handleDeleteProject}>
                                        Delete Project
                                    </Button>
                                </>
                            }
                        >
                            <p className="text-sm leading-relaxed">
                                Delete <span className="font-semibold text-amber-400">{selectedProject.name}</span> and all {secretCount} secrets? This cannot be undone.
                            </p>
                        </Modal>
                    )}

                    <div className="mb-8">
                        {noProjects ? (
                            <div className="card p-8 text-center">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-600/10 border border-amber-500/20">
                                    <ShieldCheck size={28} className="text-amber-500" aria-hidden="true" />
                                </div>
                                <h1 className="text-2xl font-semibold text-stone-50 mb-2">Welcome to Secretly</h1>
                                <p className="text-stone-400 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
                                    Store API keys and environment variables in an encrypted vault. Create your first project to get started.
                                </p>
                                <Link to="/createProject">
                                    <Button variant="primary" icon={<Plus size={18} />} iconPosition="left">
                                        Create Project
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h1 className="text-2xl font-semibold text-stone-50 truncate">
                                            {selectedProject?.name}
                                        </h1>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 mt-2">
                                        <span className="stat-pill tabular-nums">
                                            <KeyRound size={12} aria-hidden="true" />
                                            {secretCount} {secretCount === 1 ? 'secret' : 'secrets'}
                                        </span>
                                        <span className="text-xs text-stone-500 flex items-center gap-1">
                                            <ShieldCheck size={12} className="text-amber-600/80" aria-hidden="true" />
                                            Encrypted at rest
                                        </span>
                                    </div>
                                </div>
                                {selectedProject && (
                                    <div className="flex items-center gap-2 shrink-0">
                                        <Button
                                            variant="iconDanger"
                                            size="sm"
                                            icon={<Trash2 size={16} aria-hidden="true" />}
                                            onClick={() => setShowDeleteConfirm(true)}
                                        >
                                            Delete
                                        </Button>
                                        <Link to="/addSecret">
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                icon={<Plus size={16} aria-hidden="true" />}
                                                iconPosition="left"
                                            >
                                                Add Secret
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {selectedProject && (
                        <SecretList count={selectedProject.secrets.length} secrets={selectedProject.secrets} />
                    )}
                    {!noProjects && <ActivityList />}
                </Layout>
            )}
        </>
    );
};

export default Dashboard;
