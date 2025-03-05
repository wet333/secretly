import NewSecretForm from '../components/features/secrets/NewSecretForm';
import React, {useContext} from "react";
import Layout from "../components/ui/layout/Layout.tsx";
import {ProjectContext, ProjectContextType} from "../context/ProjectContext.tsx";
import SectionTitle from "../components/ui/layout/SectionTitle.tsx";

export function NewSecret() {
    const {selectedProject} = useContext(ProjectContext) as ProjectContextType;

    React.useEffect(() => {
        document.title = "Secretly - Add Secret";
    });

    return (
        <Layout>
            <SectionTitle
                hasBackButton={true}
                title="New Secret"
                subtitle={`Add a new secret on ${selectedProject?.name}`}
            />
            <NewSecretForm />
        </Layout>
    );
}