import {useContext} from 'react';
import Layout from '../components/ui/layout/Layout';
import {ProjectContext, ProjectContextType} from '../context/ProjectContext';
import SecretList from '../components/features/secrets/SecretList';
import AddSecretButton from '../components/features/secrets/AddSecretButton';
import ActivityList from '../components/features/activity/ActivityList';

const Dashboard = () => {
    const { selectedProject } = useContext(ProjectContext) as ProjectContextType;

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">{selectedProject?.name}</h1>
                    <p className="text-stone-400 text-sm mt-1">{selectedProject?.secrets.length} secrets stored securely</p>
                </div>
                <AddSecretButton />
            </div>
            {selectedProject && (
                <SecretList count={selectedProject.secrets.length} secrets={selectedProject.secrets} />
            )}
            <ActivityList />
        </Layout>
    );
};

export default Dashboard;