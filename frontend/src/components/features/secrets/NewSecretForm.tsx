import React, { useState } from 'react';
import Button from "../../ui/Button.tsx";
import {CircleAlert} from "lucide-react";
import {useProject} from "../../../hooks/useProjects.tsx";
import {useNavigate} from "react-router-dom";

const NewSecretForm: React.FC = () => {
    const [keyName, setKeyName] = useState('');
    const [value, setValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {selectedProject, addSecret} = useProject();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!keyName.trim() || !value.trim()) {
            setError('Both key name and value are required.');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            if (selectedProject) {
                addSecret(selectedProject.name, { keyName: keyName, value: value });
            }

            setKeyName('');
            setValue('');
            navigate("/");
        } catch (err) {
            setError('Failed to add secret. Check your connection and try again.');
            console.error('Error adding secret:', err);
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

                <div className="mb-5">
                    <label htmlFor="keyName" className="block text-sm font-medium text-stone-300 mb-2">
                        Key Name
                    </label>
                    <input
                        type="text"
                        id="keyName"
                        name="keyName"
                        value={keyName}
                        onChange={(e) => setKeyName(e.target.value)}
                        className="input-field font-mono"
                        placeholder="e.g. STRIPE_API_KEY…"
                        autoComplete="off"
                        spellCheck={false}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="value" className="block text-sm font-medium text-stone-300 mb-2">
                        Value
                    </label>
                    <input
                        type="password"
                        id="value"
                        name="value"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="input-field font-mono"
                        placeholder="Enter secret value…"
                        autoComplete="off"
                        spellCheck={false}
                    />
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
                        {isSubmitting ? 'Saving…' : 'Save Secret'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default NewSecretForm;
