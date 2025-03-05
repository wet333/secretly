import Layout from "../components/ui/layout/Layout.tsx";
import SectionTitle from "../components/ui/layout/SectionTitle.tsx";
import NewProjectForm from "../components/features/projects/NewProjectForm.tsx";
import React from "react";

export function NewProject() {
    React.useEffect(() => {
        document.title = "Secretly - New Project";
    });

    return (
        <Layout>
            <SectionTitle
                hasBackButton={true}
                title="Create project"
                subtitle={`Create a new project to store all your related secrets.`}
            />
            <NewProjectForm />
        </Layout>
    );
}