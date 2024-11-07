import styles from "../../styles/components/campaign/campaignContentLiveContainer.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ServicesSearchPosts from "@/components/services/servicesSearchPosts";
import ServicesFilterPosts from "@/components/services/servicesFilterPosts";
import PostsContainer from "@/components/posts/postsContainer";

interface CampaignContentLiveContainerProps {
    campaignId: string;
    userId: string;
}

interface Post {
    id: string;
    campaignId: string;
    site: string;
    title: string;
    content: string;
}

const CampaignContentLiveContainer = ({ campaignId, userId }: CampaignContentLiveContainerProps) => {
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
        router.push("/post-live-info");
    };

    return (
        <div className={styles.campaignContentArchiveContainer}>
            <div className={styles.campaignContentContainerTitle}>
                LIVE POSTS
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

export default CampaignContentLiveContainer;