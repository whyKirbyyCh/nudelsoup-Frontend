import React from "react";
import Header from "@/components/header/header";
import styles from "@/app/page.module.css";

export default function Page() {
    const navOptions = [
        { id: 1, label: 'ACCOUNT', href: '/account-overview' },
        { id: 2, label: 'ORGANISATION', href: '/products' },
        { id: 3, label: 'PRODUCTS', href: '/login' },
        { id: 4, label: 'ANALYTICS', href: '/login' },
    ]
    return (
        <div>
            <div className={styles.header}>
                <Header iconSize={"large"} navOptions={navOptions} fontSizeVariant={"large"}/>
            </div>
        </div>
    );
}