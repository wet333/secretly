import React, {useContext, useMemo} from 'react';
import { Activity } from 'lucide-react';
import ActivityItem from './ActivityItem.tsx';
import {ActivityContext, ActivityContextType} from "../../../context/ActivityContext.tsx";

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
        <section className="card" aria-labelledby="activity-heading">
            <div className="card-header">
                <div className="card-header__title">
                    <Activity size={16} className="text-amber-500 shrink-0" aria-hidden="true" />
                    <h2 id="activity-heading" className="font-medium text-stone-100">
                        Recent Activity
                    </h2>
                </div>
                <span className="text-xs text-stone-500 tabular-nums shrink-0">
                    Last {recentActivities.length}
                </span>
            </div>
            <ul className="activity-list">
                {recentActivities.map((activity) => (
                    <li key={activity.id}>
                        <ActivityItem activity={activity} />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ActivityList;
