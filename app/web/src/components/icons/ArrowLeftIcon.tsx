import React from "react";

interface ArrowLeftIconProps {
    className?: string;
}

export const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = ({
    className = "w-5 h-5",
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={className}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
            />
        </svg>
    );
};
