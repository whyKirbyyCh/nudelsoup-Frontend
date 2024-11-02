import React from "react";
import styles from "../../styles/components/popup/popupConnect.module.css";
import PageButton from "@/components/page/pageButton";

interface PopupPublishTOSProps {
    onAgree: () => void;
    onDisagree: () => void;
}

const PopupConnect: React.FC<PopupPublishTOSProps> = ({ onAgree, onDisagree}) => {
    return(
        <div className={styles.popupPublishTOS}>
            <div className={styles.popupPublishTOSContent}>
                <div className={styles.popupPublishTOSTitle}>
                    CONNECTING POSTS TO YOUR NUDELSOUP ACCOUNT
                </div>
                <div className={styles.popupPublishTOSBody}>
                    By pressing the "CONNECT" button, our system will try and find all open posts on their respective
                    social-media sites and connect them to your nudelsoup account for analytics tracking.<br/><br/>

                    Before doing so, make sure you have posted all the open posts on the corresponding sites. If not,
                    delete the ones you didn't post. <br/><br/>
                    If something does not work as expected or there are any issues you will be notified. If this happens
                    you can either press "CONNECT" again or you can go to the post in question and click on the
                    "CONNECT" button of the post. You then will be asked to provide a
                    link to the post. Make sure that its a link of the actual post and not just your feed.
                </div>
                <div className={styles.popupPublishTOSButtons}>
                    <PageButton label={"CONNECT" } onClick={onAgree}/>
                    <PageButton label={"CLOSE"} onClick={onDisagree}/>
                </div>
            </div>
        </div>
    );
};

export default PopupConnect;


