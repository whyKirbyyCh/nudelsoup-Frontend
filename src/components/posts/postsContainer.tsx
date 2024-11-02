import React, { useState, useEffect } from "react";
import styles from "../../styles/components/posts/postsContainer.module.css";
import PageButtonSmall from "@/components/page/PageButtonSmall";
import { useRouter } from "next/navigation";

interface PostsContainerProps {
    id: string;
    site: string;
    title: string;
    text: string;
    onDelete?: (id: string) => void;
    onSave?: (id: string, newTitle: string, newText: string) => void;
    onConnect?: (id: string) => void;
    allowNavigation?: boolean;
}

const PostsContainer: React.FC<PostsContainerProps> = ({id, title, text, site, onDelete, onSave, onConnect, allowNavigation = false}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedText, setEditedText] = useState(text);
    const router = useRouter();

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

    const handleConnectClick = () => {
        if (onConnect) {
            onConnect(id);
        }
    };

    const handleNavigate = () => {
        console.log("navigate to post", id);
        router.push(`/post?id=${id}`);
    }

    const handleNoNavigation = () => {
        return;
    }

    return (
        <div className={`${styles.postsContainer} ${allowNavigation ? styles.clickable : ""}`} onClick={allowNavigation ? handleNavigate : handleNoNavigation} role={"button"} tabIndex={0} aria-label={"post"}>
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
                        {onConnect && <PageButtonSmall label="CONNECT" onClick={handleConnectClick} />}
                        {onDelete && <PageButtonSmall label="DELETE" onClick={handleDeleteClick} />}
                    </>
                )}
            </div>
        </div>
    );
};

export default PostsContainer;
