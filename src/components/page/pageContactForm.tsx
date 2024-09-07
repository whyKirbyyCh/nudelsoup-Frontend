import React from "react";
import PageTextField from "@/components/page/pageTextField";
import PageMessageField from "@/components/page/pageMessageField";
import PageButton from "@/components/page/pageButton";
import styles from "../../styles/components/pageContactForm.module.css";

const PageContactForm: React.FC = () => {
    return (
        <div className={styles.contactBox}>
            <div className={styles.contactTitle}>
                CONTACT FORM
            </div>
            <div className={styles.contactBoxItem}>
                <div className={styles.contactBoxItemName}>
                    EMAIL:
                </div>
                <PageTextField placeholder={"Enter your email"}/>
            </div>
            <div className={styles.contactBoxItem}>
                <div className={styles.contactBoxItemName}>
                    NAME:
                </div>
                <PageTextField placeholder={"Enter your name"}/>
            </div>
            <div className={styles.contactBoxItem2}>
                <div className={styles.contactBoxItemName}>
                    Message:
                </div>
                <PageMessageField placeholder={"Enter your message"}/>
            </div>
            <div className={styles.contactBoxItemButton}>
                <PageButton label={"SEND"} href={"/send"}/>
            </div>
        </div>
    );
};

export default PageContactForm;