import NewSecretForm from '../components/features/secrets/NewSecretForm';
import React, {useContext} from "react";
import Layout from "../components/ui/layout/Layout.tsx";
import {ProjectContext, ProjectContextType} from "../context/ProjectContext.tsx";
import SectionTitle from "../components/ui/layout/SectionTitle.tsx";

export function NewSecret() {
    const {selectedProject} = useContext(ProjectContext) as ProjectContextType;

    React.useEffect(() => {
        document.title = "Secretly - Add Secret";
    }, []);

    return (
        <Layout>
            <SectionTitle
                hasBackButton={true}
                title="Add Secret"
                subtitle={`Store a new encrypted value in ${selectedProject?.name ?? 'your project'}.`}
            />
            <div className="form-shell">
                <NewSecretForm />
            </div>
        </Layout>
    );
}
