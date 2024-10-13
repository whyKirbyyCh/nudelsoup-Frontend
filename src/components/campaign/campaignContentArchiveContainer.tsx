import React, {useState} from "react";
import styles from "../../styles/components/campaign/campaignContentArchiveContainer.module.css";
import PostsContainer from "@/components/posts/postsContainer";
import ServicesSearchPosts from "@/components/services/servicesSearchPosts";
import ServicesFilterPosts from "@/components/services/servicesFilterPosts";

interface CampaignContentArchiveContainerProps {
    campaignId: string
}

interface Post {
    id: string;
    site: string;
    title: string;
    text: string;
}

const CampaignContentArchiveContainer: React.FC<CampaignContentArchiveContainerProps> = ({ campaignId}) => {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: "1",
            site: "Reddit",
            title: "Post 1",
            text: "Content of post 1... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        },
        {
            id: "2",
            site: "Twitter",
            title: "Post 2",
            text: "Content of post 2... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        },
        {
            id: "3",
            site: "Facebook",
            title: "Post 3",
            text: "Content of post 3... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        },
        {
            id: "4",
            site: "GitHub",
            title: "Post 4",
            text: "Content of post 4... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        },
    ]);

    return (
        <div className={styles.campaignContentArchiveContainer}>
            <div className={styles.campaignContentContainerTitle}>
                ARCHIVED POSTS
            </div>
            <div className={styles.campaignArchiveContentFunctions}>
                <div className={styles.searchWrapper}>
                    <ServicesSearchPosts/>
                </div>
                <div className={styles.filterWrapper}>
                    <ServicesFilterPosts/>
                </div>
            </div>
            <div className={styles.campaignArchiveContent}>
                {posts.map((post) => (
                    <PostsContainer
                        key={post.id}
                        id={post.id}
                        site={post.site}
                        title={post.title}
                        text={post.text}
                        allowNavigation={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default CampaignContentArchiveContainer