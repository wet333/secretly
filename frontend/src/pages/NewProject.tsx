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
            <SectionTitle
                hasBackButton={true}
                title="Create Project"
                subtitle="Organize your secrets into a dedicated, encrypted vault."
            />
            <div className="form-shell">
                <NewProjectForm />
            </div>
        </Layout>
    );
}
