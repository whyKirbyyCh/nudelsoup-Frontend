import React, { useState, useEffect } from "react";
import styles from "../../styles/components/posts/postsContainer.module.css";
import PageButtonSmall from "@/components/page/PageButtonSmall";

interface PostsContainerProps {
    id: number;
    site: string;
    title: string;
    text: string;
    onDelete?: (id: number) => void;
    onSave?: (id: number, newTitle: string, newText: string) => void;
}

const PostsContainer: React.FC<PostsContainerProps> = ({id, title, text, site, onDelete, onSave}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedText, setEditedText] = useState(text);

    useEffect(() => {
        setEditedTitle(title);
    }, [title]);

    useEffect(() => {
        setEditedText(text);
    }, [text]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        if (onSave) {
            onSave(id, editedTitle, editedText);
        }
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setEditedTitle(title);
        setEditedText(text);
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        if (onDelete) {
            onDelete(id);
        }
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
                        className={styles.postsContainerTitleInput}
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
                        className={styles.postsContainerTitleTextarea}
                    />
                ) : (
                    text
                )}
            </div>
            <div className={styles.postsContainerButtons}>
                {isEditing ? (
                    onSave && (
                        <>
                            <PageButtonSmall label="SAVE" onClick={handleSaveClick} />
                            <PageButtonSmall label="CANCEL" onClick={handleCancelClick} />
                        </>
                    )
                ) : (
                    <>
                        {onSave && <PageButtonSmall label="EDIT" onClick={handleEditClick} />}
                        {onDelete && <PageButtonSmall label="DELETE" onClick={handleDeleteClick} />}
                    </>
                )}
            </div>
        </div>
    );
};

export default PostsContainer;
