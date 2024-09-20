import React from "react";
import styles from "../../styles/components/posts/postsAdditionPopup.module.css";
import PageButtonSmall from "@/components/page/PageButtonSmall";
import PageButton from "@/components/page/pageButton";

interface Post {
    id: string;
    site: string;
    title: string;
    text: string;
}

interface PostsAdditionPopupProps {
    onClose: () => void;
    onAddPost: (newPost: Post) => void;
}

const PostsAdditionPopup: React.FC<PostsAdditionPopupProps> = ({ onClose, onAddPost }) => {
    const [site, setSite] = React.useState("select");
    const [title, setTitle] = React.useState("");
    const [text, setText] = React.useState("");

    const isFormValid =
        site !== "" && site !== "select" &&
        title !== "" &&
        text !== "";

    const hashTitle = (title: string) => {
        let hash = 0;
        for (let i = 0; i < title.length; i++) {
            hash = hash * 31 + title.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash);
    };

    const handleSubmit = () => {
        if (!isFormValid) {
            return;
        }

        const newPostId = `${hashTitle(title)}${Date.now().toString()}`;
        onAddPost({ id: newPostId, site, title, text });
        onClose();
    };

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <div className={styles.popupContentTitle}>ADD A POST</div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.formGroup}>
                        <label>PAGE:</label>
                        <select
                            value={site}
                            onChange={(e) => setSite(e.target.value)}
                            required
                        >
                            <option value="select">Select Page</option>
                            <option value="Page 1">PAGE 1</option>
                            <option value="Page 2">PAGE 2</option>
                            <option value="Page 3">PAGE 3</option>
                            <option value="Page 4">PAGE 4</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>TITLE:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>TEXT:</label>

                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <PageButton label={"SAVE"} onClick={handleSubmit} />
                        <PageButton label={"EXIT"} onClick={onClose} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostsAdditionPopup;
