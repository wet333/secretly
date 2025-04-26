import React, {Context, createContext, ReactNode, useState} from "react";

export interface AppGlobalContextType {
    isModalVisible: boolean,
    toggleModalVisibility: () => void,
}

export const AppGlobalContext: Context<AppGlobalContextType | undefined> = createContext<AppGlobalContextType | undefined>(
    undefined
);

interface AppGlobalContextProviderProps {
    children: ReactNode;
}

export const AppGlobalContextProvider: React.FC<AppGlobalContextProviderProps> = ({children}) => {

    const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false);

    const toggleModalVisibility = () => {
        setIsModalVisible(!isModalVisible)
    }

    return (
        <AppGlobalContext.Provider value={{
            isModalVisible: isModalVisible,
            toggleModalVisibility,
        }}>
            {children}
        </AppGlobalContext.Provider>
    )
}