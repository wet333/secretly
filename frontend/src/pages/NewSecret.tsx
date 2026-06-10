import NewSecretForm from "../components/features/secrets/NewSecretForm";
import React, { useContext } from "react";
import Layout from "../components/ui/layout/Layout.tsx";
import { ProjectContext, ProjectContextType } from "../context/ProjectContext.tsx";
import SectionTitle from "../components/ui/layout/SectionTitle.tsx";

export function NewSecret() {
    const { selectedProject } = useContext(ProjectContext) as ProjectContextType;

    React.useEffect(() => {
        document.title = "Secretly - Add Secret";
    }, []);

    return (
        <Layout>
            <div className="form-shell">
                <SectionTitle
                    hasBackButton={true}
                    eyebrow="New entry"
                    title="Add Secret"
                    subtitle={`Store a new encrypted value in ${selectedProject?.name ?? "your project"}.`}
                />
                <NewSecretForm />
            </div>
        </Layout>
    );
}
