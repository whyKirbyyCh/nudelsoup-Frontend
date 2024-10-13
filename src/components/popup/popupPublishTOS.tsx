import React from "react";
import styles from "../../styles/components/popup/popupPublishTOS.module.css";
import PageButton from "@/components/page/pageButton";

interface PopupPublishTOSProps {
    onAgree: () => void;
    onDisagree: () => void;
}

const PopupPublishTOS: React.FC<PopupPublishTOSProps> = ({ onAgree, onDisagree}) => {
    return(
        <div className={styles.popupPublishTOS}>
            <div className={styles.popupPublishTOSContent}>
                <div className={styles.popupPublishTOSTitle}>
                    TITLE
                </div>
                <div className={styles.popupPublishTOSBody}>
                    BODY
                </div>
                <div className={styles.popupPublishTOSButtons}>
                    <PageButton label={"AGREE" } onClick={onAgree}/>
                    <PageButton label={"DISAGREE"} onClick={onDisagree}/>
                </div>
            </div>
        </div>
    );
};

export default PopupPublishTOS;


