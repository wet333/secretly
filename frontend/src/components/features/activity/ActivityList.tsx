import React, {useContext} from 'react';
import { Activity } from 'lucide-react';
import ActivityItem from './ActivityItem.tsx';
import {ActivityContext, ActivityContextType, ActivityNotification} from "../../../context/ActivityContext.tsx";

const ActivityList: React.FC = () => {
    const { activities } = useContext(ActivityContext) as ActivityContextType;

    if (activities.length === 0) {
        return null;
    }

    return (
        <section className="mt-10" aria-labelledby="activity-heading">
            <div className="flex items-center gap-2 mb-4">
                <Activity size={16} className="text-amber-500" aria-hidden="true" />
                <h2 id="activity-heading" className="text-base font-medium text-stone-200">
                    Recent Activity
                </h2>
            </div>
            <div className="card divide-y divide-stone-800/40 overflow-hidden">
                {activities.map((activity: ActivityNotification) => (
                    <ActivityItem key={activity.id} activity={activity} />
                ))}
            </div>
        </section>
    );
};

export default ActivityList;
