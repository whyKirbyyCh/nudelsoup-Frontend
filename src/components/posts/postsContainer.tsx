import React from "react";
import styles from "../../styles/components/posts/postsContainer.module.css";

interface PostsContainerProps {
    title: string;
    text: string;
}

const PostsContainer: React.FC<PostsContainerProps> = ({ title, text }) => {
    return (
        <div className={styles.postsContainer}>
            <h1>{title}</h1>
            <p>{text}</p>
        </div>
    );
};

export default PostsContainer;