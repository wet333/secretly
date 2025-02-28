import React from 'react';
import {Edit, Plus, Trash2} from 'lucide-react';
import {ActivityNotification} from "./../../../context/ActivityContext.tsx";

interface ActivityItemProps {
    activity: ActivityNotification
}

const ActivityItem : React.FC<ActivityItemProps> = ({ activity }) => {
    const getIcon = () => {
        switch(activity.type) {
            case 'edit':
                return <Edit size={14} />;
            case 'add':
                return <Plus size={14} />;
            case 'delete':
                return <Trash2 size={14} />;
            default:
                return <Edit size={14} />;
        }
    };

    const getMessage = () => {
        switch(activity.type) {
            case 'edit':
                return (
                    <p className="text-sm">
                        <span className="font-medium">{activity.secretName}</span> was updated in <span className="text-amber-400">{activity.projectName}</span>
                    </p>
                );
            case 'add':
                return (
                    <p className="text-sm">
                        <span className="font-medium">{activity.secretName}</span> was added to <span className="text-amber-400">{activity.projectName}</span>
                    </p>
                );
            case 'delete':
                return (
                    <p className="text-sm">
                        <span className="font-medium">{activity.secretName}</span> was deleted from <span className="text-amber-400">{activity.projectName}</span>
                    </p>
                );
            default:
                return (
                    <p className="text-sm">
                        <span className="font-medium">{activity.secretName}</span> was modified in <span className="text-amber-400">{activity.projectName}</span>
                    </p>
                );
        }
    };

    return (
        <div className="p-4 flex items-center">
            <div className="h-8 w-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mr-4">
                {getIcon()}
            </div>
            <div className="flex-1">
                {getMessage()}
                <p className="text-xs text-stone-500 mt-1">{activity.timeAgo}</p>
            </div>
        </div>
    );
};

export default ActivityItem;