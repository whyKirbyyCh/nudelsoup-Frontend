import React, { useState } from "react";
import styles from "../../styles/components/pageRegisterBox.module.css";
import PageTextField from "@/components/page/pageTextField";
import PagePasswordField from "@/components/page/pagePasswordField";

const PageRegisterBox: React.FC = () => {

    return (
        <div className={styles.registerBox}>
            <div className={styles.registerTitle}>
                REGISTER
            </div>
            <div className={styles.registerBoxItem}>
                <div className={styles.registerBoxItemName}>
                    EMAIL:
                </div>
                <PageTextField placeholder={"Enter your email"}/>
            </div>
            <div className={styles.registerBoxItem}>
                <div className={styles.registerBoxItemName}>
                    USERNAME:
                </div>
                <PageTextField placeholder={"Enter your username"}/>
            </div>
            <div className={styles.registerBoxItem}>
                <div className={styles.registerBoxItemName}>
                    PASSWORD:
                </div>
                <PagePasswordField placeholder={"Enter your password"}/>
            </div>
            <div className={styles.registerBoxItem}>
                <div className={styles.registerBoxItemName}>
                    CONFIRM:
                </div>
                <PagePasswordField placeholder={"Confirm your password"}/>
            </div>
        </div>
    );
};

export default PageRegisterBox;
