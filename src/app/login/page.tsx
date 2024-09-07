import React from "react";
import styles from "./loginPage.module.css";
import Header from "@/components/header/header";
import PageLoginBox from "@/components/page/pageLoginBox";

export default function Page() {
    const navOptions = [
        { id: 1, label: 'REVIEWS', href: '/reviews' },
        { id: 2, label: 'FAQ', href: '/faq' },
        { id: 3, label: 'PRICING', href: '/pricing' },
        { id: 4, label: 'CONTACT', href: '/contact' },
    ];

    return (
        <div className={styles.login}>
            <Header iconSize={"large"} navOptions={navOptions} fontSizeVariant={"large"} showButtons={true}/>
            <div className={styles.loginContentWrapper}>
                <PageLoginBox/>
            </div>
            <div className={styles.decorativeCircle}></div>
            <div className={styles.decorativeCircle2}></div>
        </div>
    );
}
