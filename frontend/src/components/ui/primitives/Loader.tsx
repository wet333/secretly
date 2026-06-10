import { FC } from "react";
import "./Loader.css";

interface LoaderProps {
    color?: string;
    size?: number;
    label?: string;
}

const circleRadius = 18;
const circleCircumference = 2 * Math.PI * circleRadius;

const Loader: FC<LoaderProps> = ({ color = "#ff8c2e", size = 40, label = "Loading…" }) => {
    return (
        <div role="status" aria-live="polite" className="flex flex-col items-center gap-3">
            <svg
                className="loader-svg"
                width={size}
                height={size}
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <circle
                    className="loader-circle"
                    cx="20"
                    cy="20"
                    r={circleRadius}
                    fill="none"
                    stroke={color}
                    strokeWidth={2}
                    strokeDasharray={circleCircumference}
                />
            </svg>
            <span className="sr-only">{label}</span>
        </div>
    );
};

export default Loader;
