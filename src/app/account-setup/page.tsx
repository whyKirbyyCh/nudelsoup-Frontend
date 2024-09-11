import React from "react";
import Header from "@/components/header/header";
import styles from "@/app/page.module.css";

export default function Page() {
    return (
        <div>
            <div className={styles.header}>
                <Header iconSize={"large"} navOptions={[]} fontSizeVariant={"large"}/>
            </div>
        </div>
    );
}