"use client";

import React, {useState} from "react";
import styles from "../../styles/components/review/reviewStatisticsContainer.module.css";
import ReviewStars from "@/components/review/reviewStars";
import Image from "next/image";

const ReviewStatisticsContainer: React.FC = () => {
    const [verifiedPurchaseAmount, setVerifiedPurchaseAmount] = useState(63)
    const [activeSubscriptionAmount, setActiveSubscriptionAmount] = useState(45)
    const [averageRating, setAverageRating] = useState(4.5)
    const [reviewAmount, setReviewAmount] = useState(1157)

    return (
        <div className={styles.reviewStatisticsContainer}>
            <div className={styles.reviewStatisticsContainerTitle}>
                REVIEW STATISTICS
            </div>
            <div className={styles.reviewStatisticsContainerTop}>
                <div className={styles.reviewStatisticsContainerTopLeft}>
                    <Image
                        src={"/average.svg"}
                        alt={"average symbol"}
                        className={styles.averageSymbol}
                    />
                    <div className={styles.averageSymbolPoints}>: </div>
                    <ReviewStars rating={averageRating}/>
                </div>
                <div className={styles.reviewStatisticsContainerTopRight}>
                    <div className={styles.reviewSectionTitle}>verified purchases</div>
                    <div className={styles.reviewSectionPoint}>:</div>
                    <div className={styles.reviewSectionAmount}>{verifiedPurchaseAmount}%</div>
                </div>
            </div>
            <div className={styles.reviewStatisticsContainerBottom}>
                <div className={styles.reviewStatisticsContainerBottomLeft}>
                    <Image
                        src={"/amount.svg"}
                        alt={"amount symbol"}
                        className={styles.amountSymbol}
                    />
                    <div className={styles.amountSymbolPoints}>:</div>
                    <div className={styles.reviewAmounts}>
                        {reviewAmount}
                    </div>
                    <div className={styles.reviewSectionTitle}>reviews</div>
                </div>
                <div className={styles.reviewStatisticsContainerBottomRight}>
                    <div className={styles.reviewSectionTitle}>active subscriptions</div>
                    <div className={styles.reviewSectionPoint}>:</div>
                    <div className={styles.reviewSectionAmount}>{activeSubscriptionAmount}%</div>
                </div>
            </div>
        </div>
    );
}

export default ReviewStatisticsContainer