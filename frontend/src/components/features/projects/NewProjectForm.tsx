import React, { useState } from 'react';
import Button from "../../ui/Button.tsx";
import {CircleAlert} from "lucide-react";
import {useProject} from "../../../hooks/useProjects.tsx";
import {useNavigate} from "react-router-dom";

const NewProjectForm: React.FC = () => {
    const [projectName, setProjectName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setSelectedProject } = useProject();
    const {addProject} = useProject();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!projectName.trim()) {
            setError('Project name is required');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            addProject({ name: projectName, secrets: [] });
            setSelectedProject({ name: projectName, secrets: [] });

            // Clear form after successful submission
            setProjectName('');
            navigate("/")
        } catch (err) {
            setError('Failed to create new project. Please try again.');
            console.error('Error creating project:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-stone-900 rounded-lg py-4 px-6">
            <form onSubmit={handleSubmit}>
                {error && (
                    <div className="flex mb-4 text-red-400 text-sm p-3 bg-red-900/15 rounded items-center">
                        <CircleAlert size={18} className="mr-2" />
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="projectName" className="block text-stone-300 mb-2">
                        Project Name
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full bg-stone-800 border border-stone-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Enter project name"
                        autoComplete={"off"}
                    />
                </div>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        variant={"primary"}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating project...' : 'Send'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default NewProjectForm;