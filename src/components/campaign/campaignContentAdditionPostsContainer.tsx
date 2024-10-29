import React, { useState } from "react";
import styles from "../../styles/components/campaign/campaignContentAdditionPostsContainer.module.css";
import PostsContainer from "@/components/posts/postsContainer";
import PageButton from "@/components/page/pageButton";
import PopupPublishTOS from "@/components/popup/popupPublishTOS";
import PostAdditionButton from "@/components/posts/postAdditionButton";
import PostsAdditionPopup from "@/components/posts/postsAdditionPopup";

interface CampaignContentAdditionPostsContainerProps {
    posts: Post[];
    onReset: () => void;
    onDelete: (id: string) => void;
    onSave: (id: string, newTitle: string, newText: string) => void;
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

interface Post {
    id: string;
    site: string;
    title: string;
    text: string;
}

const CampaignContentAdditionPostsContainer: React.FC<CampaignContentAdditionPostsContainerProps> = ({ posts, onReset, onSave, onDelete, setPosts }) => {
    const [showAddPostMenu, setShowAddPostMenu] = useState(false);



    const handleAddPost = () => {
        console.log("add post");
        setShowAddPostMenu(true);
    };

    const handleConnect = () => {
        console.log("connect");
    }

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
                        onDelete={onDelete}
                        onSave={onSave}
                    />
                ))}
                <PostAdditionButton onClick={handleAddPost}/>
            </div>
            <div className={styles.campaignContentAdditionPostsContainerButton}>
                <PageButton label={"CONNECT"} onClick={handleConnect} />
                <PageButton label={"RESET"} onClick={onReset} />
            </div>
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