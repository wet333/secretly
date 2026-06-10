import React, { useState } from "react";
import { Field } from "../../ui/primitives";
import FormShell, { FormField } from "../../ui/forms/FormShell.tsx";
import { useProject } from "../../../hooks/useProjects.tsx";
import { useNavigate } from "react-router-dom";

const NewSecretForm: React.FC = () => {
    const [keyName, setKeyName] = useState("");
    const [value, setValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { selectedProject, addSecret } = useProject();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!keyName.trim() || !value.trim()) {
            setError("Both key name and value are required.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            if (selectedProject) {
                addSecret(selectedProject.name, { keyName: keyName, value: value });
            }

            setKeyName("");
            setValue("");
            navigate("/");
        } catch (err) {
            setError("Failed to add secret. Check your connection and try again.");
            console.error("Error adding secret:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FormShell
            onSubmit={handleSubmit}
            error={error}
            submitLabel="Save Secret"
            submittingLabel="Saving…"
            isSubmitting={isSubmitting}
            onCancel={() => navigate("/")}
        >
            <FormField htmlFor="keyName" label="Key Name" className="mb-5">
                <Field
                    type="text"
                    id="keyName"
                    name="keyName"
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                    className="font-mono"
                    placeholder="e.g. STRIPE_API_KEY…"
                    autoComplete="off"
                    spellCheck={false}
                />
            </FormField>

            <FormField htmlFor="value" label="Value">
                <Field
                    type="password"
                    id="value"
                    name="value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="font-mono"
                    placeholder="Enter secret value…"
                    autoComplete="off"
                    spellCheck={false}
                />
            </FormField>
        </FormShell>
    );
};

export default NewSecretForm;
