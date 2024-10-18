import React, { useState } from "react";
import styles from "../../styles/components/campaign/campaignContentAdditionPostsContainer.module.css";
import PostsContainer from "@/components/posts/postsContainer";
import PageButton from "@/components/page/pageButton";
import PopupPublishTOS from "@/components/popup/popupPublishTOS";
import PostAdditionButton from "@/components/posts/postAdditionButton";
import PostsAdditionPopup from "@/components/posts/postsAdditionPopup";

interface CampaignContentAdditionPostsContainerProps {
    campaignId: string;
    userId: string;
    topic: string;
    goal: string;
    selectedServices: number[];
    selectedSubReddits: number[];
    onReset: () => void;
}

interface Post {
    id: string;
    site: string;
    title: string;
    text: string;
}

const CampaignContentAdditionPostsContainer: React.FC<CampaignContentAdditionPostsContainerProps> = ({ campaignId, userId, topic, goal, selectedServices, selectedSubReddits, onReset }) => {
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
    const [showPostTOS, setShowPostTOS] = useState(false);
    const [showAddPostMenu, setShowAddPostMenu] = useState(false);

    const handleDelete = (id: string) => {
        setPosts(posts.filter((post) => post.id !== id));
    };

    const handleSave = (id: string, newTitle: string, newText: string) => {
        setPosts(
            posts.map((post) =>
                post.id === id
                    ? { ...post, title: newTitle, text: newText }
                    : post
            )
        );
    };

    const handleShowPostTOS = () => {
        setShowPostTOS(true);
    };

    const onAgree = () => {
        setShowPostTOS(false);
    };

    const onDisagree = () => {
        setShowPostTOS(false);
    };

    const handleAddPost = () => {
        console.log("add post");
        setShowAddPostMenu(true);
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
                <PostAdditionButton onClick={handleAddPost}/>
            </div>
            { !showPostTOS && (
                <div className={styles.campaignContentAdditionPostsContainerButton}>
                    <PageButton label={"PUBLISH"} onClick={handleShowPostTOS} />
                    <PageButton label={"RESET"} onClick={onReset} />
                </div>
            )}
            {showPostTOS && (
                <div className={styles.campaignContentAdditionPostsContainerPopup}>
                    <PopupPublishTOS onAgree={onAgree} onDisagree={onDisagree} />
                </div>
            )}
            {showAddPostMenu && (
                <div className={styles.campaignContentAdditionPostsContainerPopup}>
                    <PostsAdditionPopup
                        onClose={() => setShowAddPostMenu(false)}
                        onAddPost={(post) => setPosts([...posts, post])}
                    />
                </div>
            )}
        </div>
    );
};

export default CampaignContentAdditionPostsContainer;