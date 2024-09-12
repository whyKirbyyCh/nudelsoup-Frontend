import React from "react";
import styles from "../../styles/components/review/reviewWritingContainer.module.css";

const ReviewWritingContainer: React.FC = () => {
    return (
        <div className={styles.reviewWritingContainer}>
            <div className={styles.reviewWritingContainerTitle}>
                WRITE YOUR REVIEW
            </div>
            <div className={styles.reviewWritingContainerInput}>
            </div>
        </div>
    );
}

export default ReviewWritingContainer