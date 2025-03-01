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
            setError('Both Key Name and Value are required');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            if (selectedProject) {
                addSecret(selectedProject.name, { keyName: keyName, value: value });
            }

            // Clear form after successful submission
            setKeyName('');
            setValue('');

            navigate("/");
        } catch (err) {
            setError('Failed to add secret. Please try again.');
            console.error('Error adding secret:', err);
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
                    <label htmlFor="keyName" className="block text-stone-300 mb-2">
                        Key Name
                    </label>
                    <input
                        type="text"
                        id="keyName"
                        value={keyName}
                        onChange={(e) => setKeyName(e.target.value)}
                        className="w-full bg-stone-800 border border-stone-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Enter key name"
                        autoComplete={"off"}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="value" className="block text-stone-300 mb-2">
                        Value
                    </label>
                    <input
                        type="text"
                        id="value"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full bg-stone-800 border border-stone-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Enter secret value"
                        autoComplete={"off"}
                    />
                </div>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        variant={"primary"}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Adding...' : 'Send'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default NewSecretForm;