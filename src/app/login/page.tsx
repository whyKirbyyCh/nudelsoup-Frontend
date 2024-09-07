import React from "react";
import styles from "./loginPage.module.css";
import Header from "@/components/header/header";
import PageLoginBox from "@/components/page/pageLoginBox";

export default function Page() {
    return (
        <div className={styles.login}>
            <Header iconSize={"small"} navOptions={[]} fontSizeVariant={"small"} showButtons={false}/>
            <div className={styles.loginContentWrapper}>
                <PageLoginBox/>
            </div>
            <div className={styles.decorativeCircle}></div>
            <div className={styles.decorativeCircle2}></div>
        </div>
    );
}
