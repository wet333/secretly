import { FC } from 'react';
import './Loader.css'; // import your CSS here

interface LoaderProps {
    color?: string;
    size?: number;
}

const circleRadius = 18;
const circleCircumference = 2 * Math.PI * circleRadius;

const Loader: FC<LoaderProps> = ({ color = '#e6a803', size = 40 }) => {
    return (
        <svg
            className="loader-svg"
            width={size}
            height={size}
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                className="loader-circle"
                cx="20"
                cy="20"
                r={circleRadius}
                fill="none"
                stroke={color}
                strokeWidth={4}
                strokeDasharray={circleCircumference}
            />
        </svg>
    );
};

export default Loader;
