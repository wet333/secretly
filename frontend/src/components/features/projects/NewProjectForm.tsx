import React, { useState } from "react";
import { Field } from "../../ui/primitives";
import FormShell, { FormField } from "../../ui/forms/FormShell.tsx";
import { useProject } from "../../../hooks/useProjects.tsx";
import { useNavigate } from "react-router-dom";

const NewProjectForm: React.FC = () => {
    const [projectName, setProjectName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setSelectedProject, addProject } = useProject();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!projectName.trim()) {
            setError("Project name is required.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            addProject({ name: projectName, secrets: [] });
            setSelectedProject({ name: projectName, secrets: [] });
            setProjectName("");
            navigate("/");
        } catch (err) {
            setError("Failed to create project. Check your connection and try again.");
            console.error("Error creating project:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FormShell
            onSubmit={handleSubmit}
            error={error}
            submitLabel="Create Project"
            submittingLabel="Creating…"
            isSubmitting={isSubmitting}
            onCancel={() => navigate("/")}
        >
            <FormField
                htmlFor="projectName"
                label="Project Name"
                hint="Group related secrets under one project."
            >
                <Field
                    type="text"
                    id="projectName"
                    name="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. Production API…"
                    autoComplete="off"
                />
            </FormField>
        </FormShell>
    );
};

export default NewProjectForm;
