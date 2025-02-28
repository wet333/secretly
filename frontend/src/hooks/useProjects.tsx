import { ProjectContext } from "../context/ProjectContext";
import {useContext} from "react";

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (context == undefined) {
        throw new Error('useProject() must be called within a ProjectProvider');
    }
    return context;
}