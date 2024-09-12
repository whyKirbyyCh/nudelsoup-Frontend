import React from "react";
import styles from "../../styles/components/review/reviewStatisticsContainer.module.css";
import ReviewStars from "@/components/review/reviewStars";

const ReviewStatisticsContainer: React.FC = () => {
    return (
        <div className={styles.reviewStatisticsContainer}>
            <div className={styles.reviewStatisticsContainerTitle}>
                REVIEW STATISTICS
            </div>
            <div className={styles.reviewStatisticsContainerTop}>
                <div className={styles.reviewStatisticsContainerTopLeft}>
                    <img
                        src={"/average.svg"}
                        alt={"average symbol"}
                        className={styles.averageSymbol}
                    />
                    <div className={styles.averageSymbolPoints}>: </div>
                    <ReviewStars rating={4.592}/>
                </div>
                <div className={styles.reviewStatisticsContainerTopRight}>

                </div>
            </div>
            <div className={styles.reviewStatisticsContainerBottom}>
                <div className={styles.reviewStatisticsContainerBottomLeft}>
                    <img
                        src={"/amount.svg"}
                        alt={"amount symbol"}
                        className={styles.amountSymbol}
                    />
                    <div className={styles.amountSymbolPoints}>:</div>
                    <div className={styles.reviewAmounts}>
                        1175
                    </div>
                </div>
                <div className={styles.reviewStatisticsContainerBottomRight}>

                </div>
            </div>
        </div>
    );
}

export default ReviewStatisticsContainer