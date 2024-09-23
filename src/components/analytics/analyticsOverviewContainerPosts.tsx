import React from "react";
import styles from "../../styles/components/analytics/analyticsOverviewContainerPosts.module.css";

interface analyticsOverviewContainerPostsProps{
  postId: number;
}

const AnalyticsOverviewContainerPosts: React.FC<analyticsOverviewContainerPosts> = ({postId}) => {
    return(
        <div>
            {postId}
        </div>
    );
};

export default AnalyticsOverviewContainerPosts
