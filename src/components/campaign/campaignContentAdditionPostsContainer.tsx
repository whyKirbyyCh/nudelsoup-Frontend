import React from "react";
import styles from "../../styles/components/campaign/campaignContentAdditionPostsContainer.module.css";
import PostsContainer from "@/components/posts/postsContainer";

interface CampaignContentAdditionPostsContainerProps {
    campaignId: string;
    topic: string;
    goal: string;
    selectedServices: number[];
    selectedSubReddits: number[];
}

const CampaignContentAdditionPostsContainer: React.FC<CampaignContentAdditionPostsContainerProps> = ({campaignId, topic, goal, selectedServices, selectedSubReddits,}) => {
    const posts = [
        { title: "Post 1", text: "Content of post 1" },
        { title: "Post 2", text: "Content of post 2" },
        { title: "Post 3", text: "Content of post 3" },
        { title: "Post 4", text: "Content of post 4" },
    ];

    return (
        <div className={styles.campaignContentAdditionPostsContainer}>
            <div className={styles.campaignContentAdditionPostsContainerTitle}>
                NEW CONTENT
            </div>
            <div className={styles.campaignContentAdditionPostsContainerContent}>
                {posts.map((post, index) => (
                    <PostsContainer key={index} title={post.title} text={post.text} />
                ))}
            </div>
        </div>
    );
};

export default CampaignContentAdditionPostsContainer;
