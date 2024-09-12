import React from "react";
import styles from "../../styles/components/review/reviewPageContainer.module.css";
import ReviewStatisticsContainer from "./reviewStatisticsContainer"
import ReviewWritingContainer from "./reviewWritingContainer";
import ReviewSelectionContainer from "@/components/review/reviewSelectionContainer";

const ReviewPageContainer: React.FC = () => {
    return (
        <div className={styles.reviewPageContainer}>
            <div className={styles.reviewPageContainerTop}>
                <ReviewStatisticsContainer/>
                <ReviewWritingContainer/>
            </div>
            <div>
                <ReviewSelectionContainer/>
            </div>
        </div>
    );
}

export default ReviewPageContainer