import React from "react";
import styles from "../../styles/components/analytics/analyticsOverviewContainerPostsStatistics.module.css"

interface analyticsOverviewContainerPostsStatisticsProps{
  postId: number;
}

const AnalyticsOverviewContainerPostsStatistics: React.FC<analyticsOverviewContainerPostsStatisticsProps> = ({postId}) => {
    return(
        <div className={styles.analyticsStatisticsContainer}>
            <div className={styles.analyticsStatisticsContainerTitle}>
                POST STATISTICS
            </div>
            <div className={styles.analyticsStatisticsContainerContent}>
                CONTENT {postId}
            </div>
        </div>
    );
};

export default AnalyticsOverviewContainerPostsStatistics
