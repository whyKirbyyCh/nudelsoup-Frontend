import React from "react";
import styles from "./organisation-overviewPage.module.css";
import Header from "@/components/header/header";

export default function Page() {
    const payingCustomerNavOptions = [
        { id: 1, label: "ORGANISATION", href: "/organisation-overview" },
        { id: 2, label: "PRODUCTS", href: "/product-overview" },
        { id: 3, label: "CAMPAIGNS", href: "/campaign-overview" },
        { id: 4, label: "ANALYTICS", href: "/analytics" },
    ];

    return (
        <div className={styles.container}>
            <div>
                <Header iconSize="large" navOptions={payingCustomerNavOptions} fontSizeVariant="large" showButtons={true}/>
            </div>
        </div>
    );
}