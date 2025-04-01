import React from 'react';
import {Edit, Plus, Trash2} from 'lucide-react';
import {ActivityInfo, ActivityNotification} from "./../../../context/ActivityContext.tsx";
import {timeAgo} from "../../../lib/utils/dates.ts";

interface ActivityItemProps {
    activity: ActivityNotification
}

const ActivityItem : React.FC<ActivityItemProps> = ({ activity }) => {
    const getIcon = () => {
        switch(activity.activityAction) {
            case 'UPDATE':
                return <Edit size={14} />;
            case 'CREATE':
                return <Plus size={14} />;
            case 'DELETE':
                return <Trash2 size={14} />;
            default:
                return <Plus size={14} />;
        }
    };

    // Takes the activity status message and replaces all placeholders with their values
    const buildMsg = (template: string, activityInfo: ActivityInfo): React.ReactNode[] => {
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        const regex = /{(.*?)}/g;
        let match: RegExpExecArray | null;

        while ((match = regex.exec(template)) !== null) {
            const [placeholder, key] = match;
            const index = match.index;

            if (index > lastIndex) {
                parts.push(template.slice(lastIndex, index));
            }

            if (activityInfo[key] !== undefined) {
                parts.push(<span key={index} className="font-semibold text-amber-400">{activityInfo[key]}</span>);
            } else {
                parts.push(placeholder);
            }
            lastIndex = index + placeholder.length;
        }

        if (lastIndex < template.length) {
            parts.push(template.slice(lastIndex));
        }
        return parts;
    }

    const getMessage = () => {
        const message: string = activity.activityInfo?.message;
        const activityData = activity.activityInfo;

        return (
            <p className="text-sm">
                {buildMsg(message, activityData)}
                <span className={"ml-[0.5px]"} >.</span>
            </p>
        );
    };

    return (
        <div className="p-4 flex items-center">
            <div className="h-8 w-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mr-4">
                {getIcon()}
            </div>
            <div className="flex-1">
                {getMessage()}
                <p className="text-xs text-stone-500 mt-1">{timeAgo(activity.createdAt)}</p>
            </div>
        </div>
    );
};

export default ActivityItem;