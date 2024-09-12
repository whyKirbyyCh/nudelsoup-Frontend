import React from "react";
import styles from "../../styles/components/review/reviewWritingContainer.module.css";

const ReviewWritingContainer: React.FC = () => {
    return (
        <div className={styles.reviewWritingContainer}>
            <div>
                WRITE YOUR REVIEW
            </div>
            <div className={styles.reviewWritingContainerTop}>
                <div className={styles.reviewWritingContainerTopLeft}>
                    hi
                </div>
                <div className={styles.reviewWritingContainerTopRight}>
                </div>
            </div>
            <div className={styles.reviewWritingContainerBottom}>
                <div className={styles.reviewWritingContainerBottomLeft}>
                </div>
                <div className={styles.reviewWritingContainerBottomRight}>

                </div>
            </div>
        </div>
    );
}

export default ReviewWritingContainer