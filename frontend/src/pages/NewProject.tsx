import Layout from "../components/ui/layout/Layout.tsx";
import SectionTitle from "../components/ui/layout/SectionTitle.tsx";
import NewProjectForm from "../components/features/projects/NewProjectForm.tsx";

export function NewProject() {

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