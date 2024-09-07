import React from "react";
import styles from "./registryPage.module.css";
import Header from "@/components/header/header";
import PageRegisterBox from "@/components/page/pageRegisterBox";

export default function Page() {
    const navOptions = [
        { id: 1, label: 'REVIEWS', href: '/reviews' },
        { id: 2, label: 'FAQ', href: '/faq' },
        { id: 3, label: 'PRICING', href: '/pricing' },
        { id: 4, label: 'CONTACT', href: '/contact' },
    ];

    return (
        <div className={styles.register}>
            <Header iconSize={"large"} navOptions={navOptions} fontSizeVariant={"large"} showButtons={true}/>
            <div className={styles.registerContentWrapper}>
                <PageRegisterBox/>
            </div>
            <div className={styles.decorativeCircle}></div>
            <div className={styles.decorativeCircle2}></div>
        </div>
    );
}
