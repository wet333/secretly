import { ProjectProvider } from './context/ProjectContext';
import Dashboard from './pages/Dashboard';
import {Routes, Route} from "react-router-dom";
import {NewSecret} from "./pages/NewSecret.tsx";
import {NewProject} from "./pages/NewProject.tsx";
import {ActivityContextProvider} from "./context/ActivityContext.tsx";

// TODO: Unify all Providers

const App = () => {
    return (
        <ProjectProvider>
            <ActivityContextProvider>
                <Routes>
                    <Route path={"/"} Component={Dashboard} />
                    <Route path={"/addSecret"} Component={NewSecret} />
                    <Route path={"/createProject"} Component={NewProject} />
                </Routes>
            </ActivityContextProvider>
        </ProjectProvider>
    );
};

export default App;