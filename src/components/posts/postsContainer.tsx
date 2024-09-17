import React, { useState } from "react";
import styles from "../../styles/components/posts/postsContainer.module.css";
import PageButtonSmall from "@/components/page/PageButtonSmall";

interface PostsContainerProps {
    id: number;
    site: string;
    title: string;
    text: string;
    onDelete: (id: number) => void;
    onSave: (id: number, newTitle: string, newText: string) => void;
}

const PostsContainer: React.FC<PostsContainerProps> = ({
                                                           id,
                                                           title,
                                                           text,
                                                           site,
                                                           onDelete,
                                                           onSave,
                                                       }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedText, setEditedText] = useState(text);

    const handleEditClick = () => {
        if (isEditing) {
            onSave(id, editedTitle, editedText);
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    };

    const handleDeleteClick = () => {
        onDelete(id);
    };

    return (
        <div className={styles.postsContainer}>
            <div className={styles.postsContainerSite}>{site}</div>
            <div className={styles.postsContainerTitle}>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                ) : (
                    title
                )}
            </div>
            <div className={styles.postsContainerText}>
                {isEditing ? (
                    <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                    />
                ) : (
                    text
                )}
            </div>
            <div className={styles.postsContainerButtons}>
                <PageButtonSmall
                    label={isEditing ? "SAVE" : "EDIT"}
                    onClick={handleEditClick}
                />
                {!isEditing && (
                    <PageButtonSmall label="DELETE" onClick={handleDeleteClick} />
                )}
            </div>
        </div>
    );
};

export default PostsContainer;
