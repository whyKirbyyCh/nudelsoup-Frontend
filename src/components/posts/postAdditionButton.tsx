"use client";

import React from "react";
import styles from "../../styles/components/posts/postsAdditionButton.module.css";


interface PostAdditionButtonProps {
    onClick: () => void;
}

const PostAdditionButton: React.FC<PostAdditionButtonProps> = ({ onClick }) => {
    return (
        <div className={styles.postAdditionButton} onClick={onClick} role={"button"}>
            <img
                src={"/add-product.svg"}
                alt={"add post"}
                className={styles.postAdditionIcon}
            />
        </div>
    );
};

export default PostAdditionButton;