import React from "react";
import styles from "../../styles/components/review/reviewSelectionContainer.module.css";
import ReviewSearch from "./reviewSearch";
import ReviewFilter from "./reviewFilter";

const ReviewSelectionContainer = () => {
    return (
        <div className={styles.reviewSelectionContainer}>
            <ReviewSearch />
            <ReviewFilter />
        </div>
    )
}

export default ReviewSelectionContainer