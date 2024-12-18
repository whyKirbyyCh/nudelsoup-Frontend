import React, {useEffect, useState} from "react";
import styles from "../../styles/components/campaign/campaignContentArchiveContainer.module.css";
import PostsContainer from "@/components/posts/postsContainer";
import ServicesSearchPosts from "@/components/services/servicesSearchPosts";
import ServicesFilterPosts from "@/components/services/servicesFilterPosts";
import { useRouter } from "next/navigation";

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
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/postDetails/postsAllPostsOverview?campaignId=${campaignId}`);
                const data = await response.json();
                setPosts(data.posts || []);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [campaignId]);

    const handleInfoButtonClick = () => {
        router.push("/post-archive-info");
    };

    return (
        <div className={styles.campaignContentArchiveContainer}>
            <div className={styles.campaignContentContainerTitle}>
                ARCHIVED POSTS
            </div>
            <button className={styles.infoButton} onClick={handleInfoButtonClick}>
                <span>ⓘ</span>
            </button>
            <div className={styles.campaignArchiveContentFunctions}>
                <div className={styles.searchWrapper}>
                    <ServicesSearchPosts/>
                </div>
                <div className={styles.filterWrapper}>
                    <ServicesFilterPosts/>
                </div>
            </div>
            <div className={styles.campaignArchiveContent}>
                {isLoading ? (
                    <div className={styles.tempText}>Loading...</div>
                ) : posts.length > 0 ? (
                    posts.map((post, index) => (
                        <PostsContainer
                            key={post.id || index}
                            id={post.id}
                            site={post.site}
                            title={post.title}
                            text={post.content}
                            allowNavigation={true}
                        />
                    ))
                ) : (
                    <div className={styles.tempText}>No posts found</div>
                )}
            </div>
        </div>
    );
};

export default CampaignContentArchiveContainer