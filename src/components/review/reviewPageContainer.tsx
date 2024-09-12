import React from "react";
import styles from "../../styles/components/review/reviewPageContainer.module.css";
import ReviewStatisticsContainer from "./reviewStatisticsContainer"
import ReviewWritingContainer from "./reviewWritingContainer";

const ReviewPageContainer: React.FC = () => {
    return (
        <div className={styles.reviewPageContainer}>
            <ReviewStatisticsContainer/>
            <ReviewWritingContainer/>
        </div>
    );
}

export default ReviewPageContainer