import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Sidebar from "./Sidebar.tsx";
import React, { useContext } from "react";
import { AppGlobalContext } from "../../../context/AppGlobalContext.tsx";
import { Modal } from "../overlay/Modal.tsx";
import { Button, ThemeSwitch } from "../primitives";
import { ProjectContext } from "../../../context/ProjectContext.tsx";
import { saveAs } from "file-saver";
import { Download, Shield } from "lucide-react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { isModalVisible, toggleModalVisibility } = useContext(AppGlobalContext)!;
    const { projects } = useContext(ProjectContext)!;

    const exportProjectData = () => {
        const jsonStr = JSON.stringify(projects, null, 2);
        const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
        saveAs(blob, "secretly-export.json");
    };

    return (
        <>
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            {isModalVisible && (
                <Modal isOpen={isModalVisible} title="Settings" onClose={toggleModalVisibility}>
                    <div className="space-y-4">
                        <ThemeSwitch />
                        <div className="flex items-start gap-3 bg-raised p-3 border border-line">
                            <Shield
                                size={18}
                                className="text-accent shrink-0 mt-0.5"
                                aria-hidden="true"
                            />
                            <p className="text-sm text-sec leading-relaxed">
                                Export your projects as an encrypted JSON backup. Store the file in
                                a secure location.
                            </p>
                        </div>
                        <Button
                            variant="secondary"
                            icon={<Download size={18} />}
                            iconPosition="left"
                            onClick={exportProjectData}
                        >
                            Export Secrets
                        </Button>
                    </div>
                </Modal>
            )}
            <div className="app-shell">
                <div className="app-frame">
                    <div className="app-header">
                        <Header />
                    </div>
                    <div className="app-workspace">
                        <div className="app-sidebar">
                            <Sidebar />
                        </div>
                        <main id="main-content" className="app-main">
                            <div className="page-content">{children}</div>
                        </main>
                    </div>
                    <div className="app-footer">
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
