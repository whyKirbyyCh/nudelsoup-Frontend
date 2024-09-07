import React from "react";
import styles from "./contactPage.module.css";
import Header from "@/components/header/header";
import PageContactForm from "@/components/page/pageContactForm";

export default function Page() {
    const navOptions = [
        { id: 1, label: 'REVIEWS', href: '/reviews' },
        { id: 2, label: 'FAQ', href: '/faq' },
        { id: 3, label: 'PRICING', href: '/pricing' },
    ]

    return (
        <div className={styles.contact}>
            <Header iconSize={"large"} navOptions={navOptions} fontSizeVariant={"large"} showButtons={true}/>
            <div className={styles.contactContentWrapper}>
                <PageContactForm/>
            </div>
            <div className={styles.decorativeCircle}></div>
            <div className={styles.decorativeCircle2}></div>
            <div className={styles.decorativeCircle3}></div>
        </div>

    );
}