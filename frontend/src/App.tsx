import { ProjectProvider } from './context/ProjectContext';
import Dashboard from './pages/Dashboard';
import {Routes, Route} from "react-router-dom";
import {NewSecret} from "./pages/NewSecret.tsx";
import {NewProject} from "./pages/NewProject.tsx";
import {ActivityContextProvider} from "./context/ActivityContext.tsx";
import {AppGlobalContextProvider} from "./context/AppGlobalContext.tsx";

// TODO: Unify all Providers

const App = () => {
    return (
        <AppGlobalContextProvider>
            <ProjectProvider>
                <ActivityContextProvider>
                    <Routes>
                        <Route path={"/"} Component={Dashboard} />
                        <Route path={"/addSecret"} Component={NewSecret} />
                        <Route path={"/createProject"} Component={NewProject} />
                    </Routes>
                </ActivityContextProvider>
            </ProjectProvider>
        </AppGlobalContextProvider>
    );
};

export default App;