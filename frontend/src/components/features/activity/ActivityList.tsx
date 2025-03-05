import React, {useContext} from 'react';
import { ChevronRight } from 'lucide-react';
import ActivityItem from './ActivityItem.tsx';
import {ActivityContext, ActivityContextType, ActivityNotification} from "../../../context/ActivityContext.tsx";

const ActivityList: React.FC = () => {
    const { activities } = useContext(ActivityContext) as ActivityContextType;

    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-amber-300">Recent Activity</h2>
                <button className="text-sm text-amber-400 hover:text-amber-300 flex items-center">
                    View all <ChevronRight size={16} />
                </button>
            </div>
            <div className="bg-stone-900 rounded-xl border border-stone-800 divide-y divide-stone-800">
                {activities.map((activity: ActivityNotification) => (
                    <ActivityItem key={activity.id} activity={activity} />
                ))}
            </div>
        </div>
    );
};

export default ActivityList;