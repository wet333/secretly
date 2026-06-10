import React from "react";
import {
    ActivityAction,
    ActivityInfo,
    ActivityNotification,
} from "../../../context/ActivityContext.tsx";
import { timeAgo, formatLogTime } from "../../../lib/utils/dates.ts";
import { Led } from "../../ui/primitives";

interface ActivityItemProps {
    activity: ActivityNotification;
}

type ActivityTone = "create" | "update" | "delete";

const toneToLed: Record<ActivityTone, "ok" | "warn" | "err"> = {
    create: "ok",
    update: "warn",
    delete: "err",
};

const getTone = (action: ActivityAction): ActivityTone => {
    if (action === "UPDATE") {
        return "update";
    }
    if (action === "DELETE") {
        return "delete";
    }
    return "create";
};

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
    const tone = getTone(activity.activityAction);

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
                parts.push(
                    <span key={index} className={`log-entity--${tone}`}>
                        {activityInfo[key]}
                    </span>,
                );
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

    const actionLabel =
        activity.activityAction === "CREATE"
            ? "Created"
            : activity.activityAction === "UPDATE"
              ? "Updated"
              : "Deleted";

    const message = activity.activityInfo?.message;
    const activityData = activity.activityInfo;

    return (
        <div className="log-row">
            <time className="log-row__time" dateTime={activity.createdAt}>
                {formatLogTime(activity.createdAt)}
            </time>
            <Led tone={toneToLed[tone]} />
            <p className="log-row__message">
                <span className="sr-only">{actionLabel}: </span>
                {buildMsg(message, activityData)}
                <span className="log-row__ago">{timeAgo(activity.createdAt)}</span>
            </p>
        </div>
    );
};

export default ActivityItem;
