import React from "react";
import styles from "./page.module.css";
import Header from "@/components/header/header";
import PageRegisterBox from "@/components/page/pageRegisterBox";

export default function Page() {
    return (
        <div className={styles.register}>
            <Header iconSize={"small"} navOptions={[]} fontSizeVariant={"small"} showButtons={false}/>
            <div className={styles.contentWrapper}>
                <PageRegisterBox/>
            </div>
            <div className={styles.decorativeCircle}></div>
            <div className={styles.decorativeCircle2}></div>
        </div>
    );
}
