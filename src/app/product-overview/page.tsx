import React from "react";
import styles from "./product-overviewPage.module.css";
import Header from "@/components/header/header";
import PageTitle from "@/components/page/pageTitle";

export default function Page() {
    const payingCustomerNavOptions = [
        { id: 1, label: 'ORGANISATION', href: '/organisation-overview' },
        { id: 2, label: 'PRODUCTS', href: '/product-overview' },
        { id: 3, label: 'CAMPAIGNS', href: '/campaign-overview' },
        { id: 4, label: 'ANALYTICS', href: '/analytics' },
    ]

    return (
        <div className={styles.productOverview}>
            <div>
                <Header iconSize={"large"} navOptions={payingCustomerNavOptions} fontSizeVariant={"large"} showButtons={true}/>
            </div>
            <div className={styles.productOverviewTitle }>
                <PageTitle title={"PRODUCT OVERVIEW"} size={4}/>
            </div>
            <div className={styles.productOverviewContent}>
                PRODUCT OVERVIEW CONTENT HERE
            </div>
        </div>
    );
}