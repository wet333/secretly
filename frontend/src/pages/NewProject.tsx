import Layout from "../components/ui/layout/Layout.tsx";
import SectionTitle from "../components/ui/layout/SectionTitle.tsx";
import NewProjectForm from "../components/features/projects/NewProjectForm.tsx";
import React from "react";

export function NewProject() {
    React.useEffect(() => {
        document.title = "Secretly - New Project";
    }, []);

    return (
        <Layout>
            <div className="form-shell">
                <SectionTitle
                    hasBackButton={true}
                    eyebrow="New vault"
                    title="Create Project"
                    subtitle="Organize your secrets into a dedicated, encrypted vault."
                />
                <NewProjectForm />
            </div>
        </Layout>
    );
}
