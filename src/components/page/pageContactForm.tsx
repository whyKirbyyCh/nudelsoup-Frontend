import React from "react";
import PageTextField from "@/components/page/pageTextField";
import PageMessageField from "@/components/page/pageMessageField";
import PageButton from "@/components/page/pageButton";
import styles from "../../styles/components/pageContactForm.module.css";

const PageContactForm: React.FC = () => {
    return (
        <div className={styles.loginBox}>
            <div className={styles.loginTitle}>
                CONTACT FORM
            </div>
            <div className={styles.loginBoxItem}>
                <div className={styles.loginBoxItemName}>
                    EMAIL:
                </div>
                <PageTextField placeholder={"Enter your email"}/>
            </div>
            <div className={styles.loginBoxItem}>
                <div className={styles.loginBoxItemName}>
                    NAME:
                </div>
                <PageTextField placeholder={"Enter your name"}/>
            </div>
            <div className={styles.loginBoxItem2}>
                <div className={styles.loginBoxItemName}>
                    Message:
                </div>
                <PageMessageField placeholder={"Enter your message"}/>
            </div>
            <div className={styles.loginBoxItemButton}>
                <PageButton label={"SEND"} href={"/send"}/>
            </div>
        </div>
    );
};

export default PageContactForm;