import Header from './Header.tsx';
import Sidebar from './Sidebar.tsx';
import React from "react";

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
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
    );
};

export default Layout;