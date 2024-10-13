import React from "react";
import styles from "../../styles/components/analytics/analyticsOverviewContainerPosts.module.css";
import AnalyticsOverviewContainerPostsComments from "../analytics/analyticsOverviewContainerPostsComments.tsx"
import AnalyticsOverviewContainerPostsStatistics from "../analytics/analyticsOverviewContainerPostsStatistics.tsx"

interface analyticsOverviewContainerPostsProps{
  postId: number;
}

const AnalyticsOverviewContainerPosts: React.FC<analyticsOverviewContainerPosts> = ({postId}) => {
    return(
        <div className={styles.analyticsOverviewContainerPosts}>
            <AnalyticsOverviewContainerPostsStatistics postId={postId} />
            <AnalyticsOverviewContainerPostsComments postId={postId} />
        </div>
    );
};

export default AnalyticsOverviewContainerPosts
