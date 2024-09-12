import React from "react";
import styles from "./reviewsPage.module.css";
import Header from "@/components/header/header";
import PageTitle from "@/components/page/pageTitle";
import ReviewPageContainer from "@/components/review/reviewPageContainer";

export default function ReviewsPage() {
    const navOptions = [
        { id: 1, label: 'FAQ', href: '/faq' },
        { id: 2, label: 'PRICING', href: '/pricing' },
        { id: 3, label: 'CONTACT', href: '/contact' },
    ];

    return (
        <div className={styles.reviewsPage}>
            <div className={styles.header}>
                <Header iconSize={"large"} navOptions={navOptions} fontSizeVariant={"large"} showButtons={true} />
            </div>
            <div className={styles.reviewPageContent}>
                <div className={styles.reviewPageTitle}>
                    <PageTitle title={"OUR REVIEWS"}/>
                </div>
                <div className={styles.reviewPageMainContent}>
                    <ReviewPageContainer/>
                </div>
            </div>
        </div>
    );
}