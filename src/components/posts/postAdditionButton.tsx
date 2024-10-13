"use client";

import React from "react";
import styles from "../../styles/components/posts/postsAdditionButton.module.css";
import Image from "next/image";


interface PostAdditionButtonProps {
    onClick: () => void;
}

const PostAdditionButton: React.FC<PostAdditionButtonProps> = ({ onClick }) => {
    return (
        <div className={styles.postAdditionButton} onClick={onClick} role={"button"} tabIndex={0} aria-label={"add post"}>
            <Image
                src={"/add-product.svg"}
                alt={"add post"}
                className={styles.postAdditionIcon}
            />
        </div>
    );
};

export default PostAdditionButton;