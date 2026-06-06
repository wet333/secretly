import React, { useState } from 'react';
import Button from "../../ui/Button.tsx";
import {CircleAlert} from "lucide-react";
import {useProject} from "../../../hooks/useProjects.tsx";
import {useNavigate} from "react-router-dom";

const NewProjectForm: React.FC = () => {
    const [projectName, setProjectName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setSelectedProject, addProject } = useProject();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!projectName.trim()) {
            setError('Project name is required.');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            addProject({ name: projectName, secrets: [] });
            setSelectedProject({ name: projectName, secrets: [] });
            setProjectName('');
            navigate("/")
        } catch (err) {
            setError('Failed to create project. Check your connection and try again.');
            console.error('Error creating project:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card p-6">
            <form onSubmit={handleSubmit} noValidate>
                {error && (
                    <div role="alert" className="flex mb-5 text-red-300 text-sm p-3 bg-red-950/40 rounded-lg border border-red-900/40 items-start gap-2">
                        <CircleAlert size={18} className="shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{error}</span>
                    </div>
                )}

                <div className="mb-6">
                    <label htmlFor="projectName" className="block text-sm font-medium text-stone-300 mb-2">
                        Project Name
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        name="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="input-field"
                        placeholder="e.g. Production API…"
                        autoComplete="off"
                    />
                    <p className="text-xs text-stone-500 mt-2">
                        Group related secrets under one project.
                    </p>
                </div>

                <div className="flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating…' : 'Create Project'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default NewProjectForm;
