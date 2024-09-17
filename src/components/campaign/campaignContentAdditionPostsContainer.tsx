import React, { useState } from "react";
import styles from "../../styles/components/campaign/campaignContentAdditionPostsContainer.module.css";
import PostsContainer from "@/components/posts/postsContainer";

interface CampaignContentAdditionPostsContainerProps {
    campaignId: string;
    topic: string;
    goal: string;
    selectedServices: number[];
    selectedSubReddits: number[];
}

interface Post {
    id: number;
    site: string;
    title: string;
    text: string;
}

const CampaignContentAdditionPostsContainer: React.FC<
    CampaignContentAdditionPostsContainerProps
> = ({ campaignId, topic, goal, selectedServices, selectedSubReddits }) => {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 1,
            site: "Reddit",
            title: "Post 1",
            text: "Content of post 1...",
        },
        {
            id: 2,
            site: "Twitter",
            title: "Post 2",
            text: "Content of post 2...",
        },
        {
            id: 3,
            site: "Facebook",
            title: "Post 3",
            text: "Content of post 3...",
        },
        {
            id: 4,
            site: "GitHub",
            title: "Post 4",
            text: "Content of post 4...",
        },
    ]);

    const handleDelete = (id: number) => {
        setPosts(posts.filter((post) => post.id !== id));
    };

    const handleSave = (id: number, newTitle: string, newText: string) => {
        setPosts(
            posts.map((post) =>
                post.id === id
                    ? { ...post, title: newTitle, text: newText }
                    : post
            )
        );
    };

    return (
        <div className={styles.campaignContentAdditionPostsContainer}>
            <div className={styles.campaignContentAdditionPostsContainerTitle}>
                NEW CONTENT
            </div>
            <div className={styles.campaignContentAdditionPostsContainerContent}>
                {posts.map((post) => (
                    <PostsContainer
                        key={post.id}
                        id={post.id}
                        site={post.site}
                        title={post.title}
                        text={post.text}
                        onDelete={handleDelete}
                        onSave={handleSave}
                    />
                ))}
            </div>
        </div>
    );
};

export default CampaignContentAdditionPostsContainer;