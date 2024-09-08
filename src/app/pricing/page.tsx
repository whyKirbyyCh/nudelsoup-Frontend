import React from "react";
import styles from "./pricingPage.module.css";
import Header from "@/components/header/header";
import PageTitle from "@/components/page/pageTitle";

export default function Page() {
    const navOptions = [
        { id: 1, label: 'REVIEWS', href: '/reviews' },
        { id: 2, label: 'FAQ', href: '/faq' },
        { id: 3, label: 'CONTACT', href: '/contact' },
    ]

    return (
        <div className={styles.container}>
            <Header iconSize={"large"} navOptions={navOptions} fontSizeVariant={"large"} showButtons={true} />
            <div className={styles.pricingContentWrapper}>
                <div className={styles.pricingContentTitle}>
                    <PageTitle title={"CHOOSE YOUR MEAL SIZE*"}  size={4}/>
                </div>
                <div className={styles.pricingContent}>
                </div>
            </div>
        </div>
    )
}

