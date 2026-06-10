import React, { useContext, useMemo } from "react";
import { History } from "lucide-react";
import ActivityItem from "./ActivityItem.tsx";
import { ActivityContext, ActivityContextType } from "../../../context/ActivityContext.tsx";

const ACTIVITY_LIMIT = 5;

const ActivityList: React.FC = () => {
    const { activities } = useContext(ActivityContext) as ActivityContextType;

    const recentActivities = useMemo(() => {
        return [...activities]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, ACTIVITY_LIMIT);
    }, [activities]);

    if (recentActivities.length === 0) {
        return null;
    }

    return (
        <section className="footer-log" aria-labelledby="activity-heading">
            <div className="footer-log__header">
                <History size={12} className="text-sec shrink-0" aria-hidden="true" />
                <h2 id="activity-heading" className="micro-label text-sec!">
                    Activity Log
                </h2>
                <span className="font-mono text-micro text-mut tabular-nums ml-auto">
                    Last {recentActivities.length}
                </span>
            </div>
            <div className="log-screen">
                <ul className="log-list">
                    {recentActivities.map((activity) => (
                        <li key={activity.id}>
                            <ActivityItem activity={activity} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default ActivityList;
