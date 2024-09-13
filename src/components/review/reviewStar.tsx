import React from "react";
import styles from "../../styles/components/review/reviewStar.module.css";

interface ReviewStarProps {
    fillPercentage: number;
}

const ReviewStar: React.FC<ReviewStarProps> = ({ fillPercentage }) => {
    return (
        <svg
            className={styles.starContainer}
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="25" height="25" className={styles.starRect} />
            <defs>
                <linearGradient id={`star-fill-${fillPercentage}`}>
                    <stop offset={`${fillPercentage}%`} stopColor="#FFDC78" />
                    <stop offset={`${fillPercentage}%`} stopColor="#FFFFFF" />
                </linearGradient>
            </defs>

            <path
                className={styles.starPath}
                d="M13 4L15.2747 9.8691L21.5595 10.2188L16.6806 14.1959L18.2901 20.2812L13 16.87L7.70993 20.2812L9.31941 14.1959L4.44049 10.2188L10.7253 9.8691L13 4Z"
                fill={`url(#star-fill-${fillPercentage})`}
            />
        </svg>
    );
};

export default ReviewStar;
