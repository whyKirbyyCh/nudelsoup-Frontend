import React from "react";
import styles from "../../styles/components/review/reviewStatisticsContainer.module.css";
import ReviewStars from "@/components/review/reviewStars";

const ReviewStatisticsContainer: React.FC = () => {
    return (
        <div className={styles.reviewStatisticsContainer}>
            <div>
                REVIEW STATISTICS
            </div>
            <div className={styles.reviewStatisticsContainerTop}>
                <div className={styles.reviewStatisticsContainerTopLeft}>
                    <ReviewStars rating={4.592}/>
                </div>
                <div className={styles.reviewStatisticsContainerTopRight}>

                </div>
            </div>
            <div className={styles.reviewStatisticsContainerBottom}>
                <div className={styles.reviewStatisticsContainerBottomLeft}>
                </div>
                <div className={styles.reviewStatisticsContainerBottomRight}>

                </div>
            </div>
        </div>
    );
}

export default ReviewStatisticsContainer