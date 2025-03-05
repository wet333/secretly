import React from 'react';
import {Edit, Plus, Trash2} from 'lucide-react';
import {ActivityNotification} from "./../../../context/ActivityContext.tsx";
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

    const getMessage = () => {
        const message = activity.activityInfo?.message;
        const words: string[] = message.split(/(\s+)/);

        // Process each word, checking if it matches any property values in activityInfo
        const processedMessage = words.map((word: string, index: number) => {
            const matchingKey = Object.entries(activity.activityInfo)
                .find(([key, value]) => {
                    return key != "message" && typeof value === "string" && value.includes(word)
                });

            if (matchingKey) {
                return <span key={index} className="font-semibold text-amber-400">{word}</span>;
            } else {
                return word;
            }
        });

        return (
            <p className="text-sm">
                {processedMessage}
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