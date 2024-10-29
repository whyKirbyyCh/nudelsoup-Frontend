import React, {useEffect, useState} from "react";
import styles from "../../styles/components/campaign/campaignContentArchiveContainer.module.css";
import PostsContainer from "@/components/posts/postsContainer";
import ServicesSearchPosts from "@/components/services/servicesSearchPosts";
import ServicesFilterPosts from "@/components/services/servicesFilterPosts";

interface CampaignContentArchiveContainerProps {
    campaignId: string
    userId: string
}

interface Post {
    id: string;
    campaignId: string;
    site: string;
    title: string;
    content: string;
}

const CampaignContentArchiveContainer: React.FC<CampaignContentArchiveContainerProps> = ({ campaignId, userId}) => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try{
                const response = await fetch(`/api/postDetails/postsAllPostsOverview?campaignId=${campaignId}`);
                const data = await response.json();
                setPosts(data.posts);
                console.log(data.posts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts().then();
    }, [campaignId]);

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
                {posts.map((post, index) => (
                    <PostsContainer
                        key={post.id || index}
                        id={post.id}
                        site={post.site}
                        title={post.title}
                        text={post.content}
                        allowNavigation={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default CampaignContentArchiveContainer