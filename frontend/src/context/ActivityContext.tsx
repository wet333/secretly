import React, {Context, createContext, ReactNode, useState} from "react";
import initialActivities from "./../dummyData/recent_activity.json";

export interface ActivityNotification {
    id: number,
    type: string,
    secretName: string,
    projectName: string,
    timeAgo: string,
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
    const [activities, setActivities] = useState<ActivityNotification[]>([...initialActivities]);

    return (
        <ActivityContext.Provider value={{
            activities,
            setActivities,
        }}>
            {children}
        </ActivityContext.Provider>
    )
}