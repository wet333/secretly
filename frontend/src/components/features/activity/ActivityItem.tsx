import React from 'react';
import {Edit, Plus, Trash2} from 'lucide-react';
import {ActivityInfo, ActivityNotification} from "./../../../context/ActivityContext.tsx";
import {timeAgo} from "../../../lib/utils/dates.ts";

interface ActivityItemProps {
    activity: ActivityNotification;
}

const ActivityItem : React.FC<ActivityItemProps> = ({ activity }) => {
    const getIcon = () => {
        switch(activity.activityAction) {
            case 'UPDATE':
                return <Edit size={14} aria-hidden="true" />;
            case 'CREATE':
                return <Plus size={14} aria-hidden="true" />;
            case 'DELETE':
                return <Trash2 size={14} aria-hidden="true" />;
            default:
                return <Plus size={14} aria-hidden="true" />;
        }
    };

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
                parts.push(<span key={index} className="font-medium text-amber-400">{activityInfo[key]}</span>);
            } else {
                parts.push(placeholder);
            }
            lastIndex = index + placeholder.length;
        }

        if (lastIndex < template.length) {
            parts.push(template.slice(lastIndex));
        }
        return parts;
    };

    const actionLabel = activity.activityAction === 'CREATE'
        ? 'Created'
        : activity.activityAction === 'UPDATE'
            ? 'Updated'
            : 'Deleted';

    const message = activity.activityInfo?.message;
    const activityData = activity.activityInfo;

    return (
        <div className="flex items-start gap-3 px-4 py-3">
            <div
                className="shrink-0 h-7 w-7 rounded-md bg-amber-600/10 text-amber-500 flex items-center justify-center border border-amber-500/15"
                aria-hidden="true"
            >
                {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
                <span className="sr-only">{actionLabel}: </span>
                <p className="text-sm text-stone-300 leading-relaxed">
                    {buildMsg(message, activityData)}
                </p>
                <time className="text-xs text-stone-500 mt-1 block tabular-nums" dateTime={activity.createdAt}>
                    {timeAgo(activity.createdAt)}
                </time>
            </div>
        </div>
    );
};

export default ActivityItem;
