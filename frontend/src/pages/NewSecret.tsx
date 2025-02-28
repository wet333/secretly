import NewSecretForm from '../components/features/secrets/NewSecretForm';
import {useContext} from "react";
import Layout from "../components/ui/layout/Layout.tsx";
import {ProjectContext, ProjectContextType} from "../context/ProjectContext.tsx";
import SectionTitle from "../components/ui/layout/SectionTitle.tsx";

export function NewSecret() {
    const {selectedProject} = useContext(ProjectContext) as ProjectContextType;

    const handleSecretAdded = () => {
        // Refresh your secrets list or show notification
        console.log('Secret added successfully');
    };

    return (
        <Layout>
            <SectionTitle
                hasBackButton={true}
                title="New Secret"
                subtitle={`Add a new secret on ${selectedProject.name}`}
            />
            <NewSecretForm
                onSecretAdded={handleSecretAdded}
            />
        </Layout>
    );
}