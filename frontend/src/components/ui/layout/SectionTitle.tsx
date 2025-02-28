import React from "react";
import Button from "../Button.tsx";
import {ArrowLeft} from "lucide-react";
import {Link} from "react-router-dom";

interface SectionTitleProps {
    hasBackButton: boolean;
    title: string;
    subtitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ hasBackButton, title, subtitle }) => {
    return (
        <div className={"mb-8 flex gap-x-4"}>
            {hasBackButton && (
                <div className={"flex items-center"}>
                    <Link to="/">
                        <Button
                            variant={"iconColor"}
                            icon={<ArrowLeft/>}
                        />
                    </Link>
                </div>
            )}
            <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-stone-400 text-sm mt-1">{subtitle}</p>
            </div>
        </div>
    )
}

export default SectionTitle;