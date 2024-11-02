import React, { useState } from "react";
import styles from "../../styles/components/campaign/campaignContentAdditionPostsContainer.module.css";
import PostsContainer from "@/components/posts/postsContainer";
import PageButton from "@/components/page/pageButton";
import PopupConnect from "@/components/popup/popupConnect";
import PopupProvidePostLink from "@/components/popup/popupProvidePostLink";
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
    const [showConnectPopup, setShowConnectPopup] = useState(false);
    const [showConnectIndividualPopup, setShowConnectIndividualPopup] = useState(false);
    const [connectionPostId, setConnectionPostId] = useState<string | null>(null);

    const handleAddPost = () => {
        console.log("add post");
        setShowAddPostMenu(true);
    };

    const handleConnectPost = (id: string) => {
        setConnectionPostId(id);
        setShowConnectIndividualPopup(true);
    }

    const closeConnectPost = () => {
        setConnectionPostId(null);
        setShowConnectIndividualPopup(false);
    }

    const saveConnectPost = (link: string) => {
        // TODO: check and then save the link
        console.log("connect post", connectionPostId);
        setShowConnectIndividualPopup(false);
        setConnectionPostId(null);

    }

    const handleConnect= () => {
        console.log("connect");
        setShowConnectPopup(false);
    }

    const resetPosts = () => {
        setPosts([]);
        onReset();
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
                        onConnect={handleConnectPost}
                        allowNavigation={false}
                    />
                ))}
                <PostAdditionButton onClick={handleAddPost}/>
            </div>
            <div className={styles.campaignContentAdditionPostsContainerButton}>
                <PageButton label={"CONNECT"} onClick={() => setShowConnectPopup(true)} />
                <PageButton label={"RESET"} onClick={resetPosts} />
            </div>
            {showAddPostMenu && (
                <div className={styles.campaignContentAdditionPostsContainerPopup}>
                    <PostsAdditionPopup
                        onClose={() => setShowAddPostMenu(false)}
                        onAddPost={(post) => setPosts([...posts, post])}
                    />
                </div>
            )}
            {showConnectPopup && (
                <div className={styles.campaignContentAdditionPostsContainerPopup}>
                    <PopupConnect
                        onAgree={handleConnect}
                        onDisagree={() => setShowConnectPopup(false)}
                    />
                </div>
            )}
            {showConnectIndividualPopup && (
                <div className={styles.campaignContentAdditionPostsContainerPopup}>
                    <PopupProvidePostLink
                        onSave={saveConnectPost}
                        onClose={closeConnectPost}
                        site={posts.find((post) => post.id === connectionPostId)?.site || ""}
                    />
                </div>
            )}
        </div>
    );
};

export default CampaignContentAdditionPostsContainer;