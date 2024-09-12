import React from "react";
import styles from "../../styles/components/review/reviewStatisticsContainer.module.css";
import ReviewStars from "@/components/review/reviewStars";

const ReviewStatisticsContainer: React.FC = () => {
    return (
        <div className={styles.reviewStatisticsContainer}>
            <ReviewStars rating={4.592} />
        </div>
    );
}

export default ReviewStatisticsContainer