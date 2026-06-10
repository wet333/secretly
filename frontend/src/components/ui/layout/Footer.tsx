import React, { useContext, useEffect, useState } from "react";
import { ADMIN_NAME, APP_VERSION } from "../../../lib/constants.ts";
import { ProjectContext } from "../../../context/ProjectContext.tsx";
import ActivityList from "../../features/activity/ActivityList.tsx";

const formatClock = (date: Date): string => date.toLocaleTimeString("en-GB", { hour12: false });

/**
 * Bottom telemetry strip — vault status, cipher, inventory, clock, version.
 */
const Footer: React.FC = () => {
    const { projects } = useContext(ProjectContext)!;
    const [clock, setClock] = useState(() => formatClock(new Date()));

    useEffect(() => {
        const interval = setInterval(() => setClock(formatClock(new Date())), 1000);
        return () => clearInterval(interval);
    }, []);

    const projectCount = projects?.length ?? 0;
    const secretCount = projects?.reduce((acc, p) => acc + p.secrets.length, 0) ?? 0;

    return (
        <footer className="shrink-0 pb-[max(0.25rem,env(safe-area-inset-bottom))]">
            <ActivityList />
            <div className="status-bar" role="status" aria-label="System status">
                <span className="status-bar__seg">
                    {projectCount} {projectCount === 1 ? "project" : "projects"} · {secretCount}{" "}
                    {secretCount === 1 ? "secret" : "secrets"}
                </span>
                <span className="status-bar__seg status-bar__seg--mut status-bar__seg--optional">
                    Made by {ADMIN_NAME}
                </span>
                <span className="status-bar__seg status-bar__seg--mut status-bar__seg--end">
                    <time aria-hidden="true">{clock}</time>
                </span>
                <span className="status-bar__seg status-bar__seg--mut border-r-0!">
                    {APP_VERSION}
                </span>
            </div>
        </footer>
    );
};

export default Footer;
