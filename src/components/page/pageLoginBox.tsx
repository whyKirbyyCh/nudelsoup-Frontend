import React from "react";
import styles from "../../styles/components/pageLoginBox.module.css";
import PageTextField from "@/components/page/pageTextField";
import PagePasswordField from "@/components/page/pagePasswordField";
import PageButton from "@/components/page/pageButton";
import Link from "next/link";


const PageLoginBox: React.FC = () => {
    return (
        <div className={styles.loginBox}>
            <div className={styles.loginTitle}>
                LOGIN
            </div>
            <div className={styles.loginBoxItem}>
                <div className={styles.loginBoxItemName}>
                    EMAIL/USERNAME:
                </div>
                <PageTextField placeholder={"Enter your email"}/>
            </div>
            <div className={styles.loginBoxItem}>
                <div className={styles.loginBoxItemName}>
                    PASSWORD:
                </div>
                <PagePasswordField placeholder={"Enter your password"}/>
            </div>
            <div className={styles.loginBoxItemButton}>
                <PageButton label={"LOGIN"} href={"/account"}/>
            </div>
            <div className={styles.loginBoxItemLink}>
                <Link href={"register"} className={styles.loginLink}>
                    DON'T HAVE AN ACCOUNT? REGISTER HERE!
                </Link>
            </div>

        </div>
    );
};

export default PageLoginBox;