import React from "react";
import styles from "../../styles/components/review/reviewPageContainer.module.css";
import ReviewStatisticsContainer from "./reviewStatisticsContainer"

const ReviewPageContainer: React.FC = () => {
    return (
        <div className={styles.reviewPageContainer}>
            <ReviewStatisticsContainer/>
        </div>
    );
}

export default ReviewPageContainer