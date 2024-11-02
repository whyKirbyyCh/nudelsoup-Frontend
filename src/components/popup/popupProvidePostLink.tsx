import React from "react";
import styles from "../../styles/components/popup/popupProvidePostLink.module.css";
import PageButton from "@/components/page/pageButton";

interface PopupProvidePostLinkProps {
    onSave: (link: string) => void;
    onClose: () => void;
    site: string;
}

const PopupProvidePostLink: React.FC<PopupProvidePostLinkProps> = ({ onSave, onClose, site}) => {
    const [link, setLink] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const triggerSave = () => {
        if (link === "") {
            setErrorMessage("Please provide a link");
            return;
        }
        onSave(link);
    }
    return(
        <div className={styles.popupProvidePostLink}>
            <div className={styles.popupProvidePostLinkContent}>
                <div className={styles.popupProvidePostLinkTitle}>
                    PLEASE PROVIDE A LINK FOR YOUR {site} POST
                </div>
                <div className={styles.popupProvidePostLinkBody}>
                    <div className={styles.popupProvidePostLinkBodyText}>
                        Please make sure that the link you provide is to the actual post and not just your feed!
                    </div>
                    <div className={styles.popupProvidePostLinkBodyInput}>
                        <label>LINK:</label>
                        <input
                            type="text"
                            value={link}
                            placeholder={"Please provide a link"}
                            onChange={(e) => setLink(e.target.value)}
                            className={styles.popupProvidePostLinkBodyInputField}
                        />
                    </div>
                    <div className={styles.popupProvidePostLinkError}>
                        {errorMessage}
                    </div>
                </div>
                <div className={styles.popupProvidePostLinkButtons}>
                    <PageButton label={"SAVE" } onClick={triggerSave}/>
                    <PageButton label={"CLOSE"} onClick={onClose}/>
                </div>
            </div>
        </div>
    );
};

export default PopupProvidePostLink;


