import React from "react";
import Surface from "./Surface";

interface PanelProps {
    /** Heading text (rendered as <h2>) or a custom node for the title slot. */
    title?: React.ReactNode;
    /** Icon shown before the title. */
    icon?: React.ReactNode;
    /** Small count/metadata shown after the title (mono). */
    count?: React.ReactNode;
    /** Action controls aligned to the right of the header. */
    actions?: React.ReactNode;
    /** id applied to the heading when `title` is a string (for aria-labelledby). */
    headingId?: string;
    /** Override classes on the string title `<h2>`. */
    titleClassName?: string;
    /** Override classes on the actions wrapper. */
    actionsClassName?: string;
    /** `"stacked"` puts actions on a second row below the title. */
    headerLayout?: "inline" | "stacked";
    as?: React.ElementType;
    className?: string;
    bodyClassName?: string;
    children: React.ReactNode;
    "aria-labelledby"?: string;
}

/**
 * Surface + standard header bar (icon · title · count · actions) separated by a
 * hairline. The repeating "card with a titled header" pattern across the app.
 */
const Panel: React.FC<PanelProps> = ({
    title,
    icon,
    count,
    actions,
    headingId,
    titleClassName = "micro-label text-sec! truncate",
    actionsClassName = "shrink-0 ml-auto",
    headerLayout = "inline",
    as = "section",
    className = "",
    bodyClassName = "",
    children,
    ...props
}) => {
    const hasHeader = title != null || actions != null;

    return (
        <Surface as={as} className={className} {...props}>
            {hasHeader && (
                <div
                    className={`px-5 py-3.5 border-b border-line bg-raised ${
                        headerLayout === "stacked"
                            ? "flex flex-col gap-2.5"
                            : "flex flex-wrap items-center justify-between gap-3 min-h-[3.25rem]"
                    }`}
                >
                    <div
                        className={
                            headerLayout === "stacked"
                                ? "min-w-0 w-full"
                                : "flex items-center gap-2.5 shrink-0 min-w-0"
                        }
                    >
                        {headerLayout === "inline" && icon}
                        {typeof title === "string" ? (
                            <h2 id={headingId} className={titleClassName}>
                                {title}
                            </h2>
                        ) : (
                            title
                        )}
                        {headerLayout === "inline" &&
                            count != null &&
                            (typeof count === "string" || typeof count === "number" ? (
                                <span className="font-mono text-micro text-mut tabular-nums shrink-0">
                                    {count}
                                </span>
                            ) : (
                                count
                            ))}
                    </div>
                    {actions && (
                        <div
                            className={
                                headerLayout === "stacked"
                                    ? "w-full min-w-0"
                                    : `flex items-center gap-2 ${actionsClassName}`
                            }
                        >
                            {actions}
                        </div>
                    )}
                </div>
            )}
            <div className={`overflow-hidden ${bodyClassName}`}>{children}</div>
        </Surface>
    );
};

export default Panel;
