import Header from './Header.tsx';
import Sidebar from './Sidebar.tsx';
import React, {useContext} from "react";
import {AppGlobalContext} from "../../../context/AppGlobalContext.tsx";
import {Modal} from "../modal/Modal.tsx";
import Button from "../Button.tsx";
import {ProjectContext} from "../../../context/ProjectContext.tsx";
import {saveAs} from "file-saver";
import {Upload} from "lucide-react";

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    const {isModalVisible, toggleModalVisibility} = useContext(AppGlobalContext)!;
    const {projects} = useContext(ProjectContext)!;

    const exportProjectData = () => {
        const jsonStr = JSON.stringify(projects, null, 2);
        const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8"});
        saveAs(blob, "secretly-export.json");
    }

    return (
        <>
            {isModalVisible && <Modal
                isOpen={isModalVisible}
                title={"Configurations"}
                onClose={() => {}}>
                <h3 className={"mb-1"}>Actions</h3>
                <div className={"mb-3"}>
                    <Button variant={"iconColor"} icon={<Upload size={18}/>} onClick={exportProjectData} >Export secrets</Button>
                </div>
                <p>More options will be available soon...</p>
                <div className={"justify-self-end"}>
                    <Button variant={"danger"} onClick={toggleModalVisibility} className={"mt-4"}>Close</Button>
                </div>
            </Modal>}
            <div className="min-h-screen bg-stone-950 text-amber-50 flex justify-center">
                <div className="w-full flex flex-col">
                    <Header />
                    <div className="flex flex-1">
                        <Sidebar />
                        <div className="flex flex-col items-center w-full">
                            <div className="flex-1 p-6 bg-stone-950 w-full max-w-screen-md">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;