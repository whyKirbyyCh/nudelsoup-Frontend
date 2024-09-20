import React, { useState } from "react";
import styles from "../../styles/components/posts/postOverviewContainer.module.css"
import PageButton from "@/components/page/pageButton";

interface PostOverviewContainerProps{
    postId: number;
}

const PostOverviewContainer: React.FC<PostOverviewContainerProps> = ({ postId }) => {
    const [activeTab, setActiveTab] = useState("DETAILS / ACTIONS");

    const handleDelete = () => {
        console.log("Delete post", postId);
    }

    const handleNavigate = () => {
        console.log("navigate to post", postId);
    }

    return (
        <div className={styles.postOverviewContainer}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === "DETAILS / ACTIONS" ? styles.active : ""}`}
                    onClick={() => setActiveTab("DETAILS / ACTIONS")}
                >
                    DETAILS / ACTIONS
                </button>
            </div>
            {activeTab === "DETAILS / ACTIONS" &&
                <div className={styles.postOverviewDetails}>
                    <div className={styles.valueBox}>
                        <div className={styles.valueLabel}>PAGE:</div>
                        <div className={styles.valueInput}>some page</div>
                    </div>
                    <div className={styles.valueBox}>
                        <div className={styles.valueLabel}>TITLE:</div>
                        <div className={styles.valueInput}>some title</div>
                    </div>
                    <div className={styles.valueBox}>
                        <div className={styles.valueLabel}>TEXT:</div>
                        <div className={styles.valueInputText}>some text</div>
                    </div>
                    <div className={styles.valueBox}>
                        <div className={styles.valueLabel}>DATE:</div>
                        <div className={styles.valueInput}>some date</div>
                    </div>
                    <div className={styles.postOverviewButtons}>
                        <PageButton label={"VISIT POST"} onClick={handleNavigate}/>
                        <PageButton label={"DELETE POST"} onClick={handleDelete}/>
                    </div>
                </div>
            }
        </div>
    );
};

export default PostOverviewContainer