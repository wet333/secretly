import React, {Context, createContext, ReactNode, useContext, useState, useEffect} from "react";
import API from "../lib/api.ts";
import {ProjectContext, ProjectContextType} from "./ProjectContext.tsx";

export type ActivityAction = "CREATE" | "UPDATE" | "DELETE";
export type ActivityInfo = Record<string, string>;

export interface ActivityNotification {
    id: number,
    createdAt: string,
    activityType: string,
    activityAction: ActivityAction,
    activityInfo: ActivityInfo,
}

export interface ActivityContextType {
    activities: ActivityNotification[];
    setActivities: (activities: ActivityNotification[]) => void;
}

export const ActivityContext: Context<ActivityContextType | undefined> = createContext<ActivityContextType | undefined>(undefined)

interface ActivityContextProviderProps {
    children: ReactNode;
}

export const ActivityContextProvider: React.FC<ActivityContextProviderProps> = ({children}) => {
    const [activities, setActivities] = useState<ActivityNotification[]>([]);
    const { selectedProject, projects } = useContext(ProjectContext) as ProjectContextType;

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await API.get(`/activity`);
                if (response.status === 200 && response?.data.data) {
                    setActivities(response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchActivities();
    }, [selectedProject, projects]);

    return (
        <ActivityContext.Provider value={{
            activities,
            setActivities,
        }}>
            {children}
        </ActivityContext.Provider>
    )
}