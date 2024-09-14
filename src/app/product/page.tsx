"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./productPage.module.css";
import ProductOptionPageContainer from "@/components/product/productOptionPageContainer";
import Header from "@/components/header/header";
import PageTitle from "@/components/page/pageTitle";

export default function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams?.get("id") || "";
    const title = searchParams?.get("title") ?? "PRODUCT";

    const payingCustomerNavOptions = [
        { id: 1, label: 'ORGANISATION', href: '/organisation-overview' },
        { id: 2, label: 'PRODUCTS', href: '/product-overview' },
        { id: 3, label: 'CAMPAIGNS', href: '/campaign-overview' },
        { id: 4, label: 'ANALYTICS', href: '/analytics' },
    ];

    useEffect(() => {
        if (id === "") {
            router.push("/product-overview");
        } else if (!title || title === "PRODUCT") {
            router.push("/product-overview");
        }
    }, [id, router]);

    return (
        <div className={styles.container}>
            <div className={styles.productHeader}>
                <Header
                    iconSize="large"
                    navOptions={payingCustomerNavOptions}
                    fontSizeVariant="large"
                    showButtons={true}
                />
            </div>
            <div className={styles.productTitle}>
                <PageTitle title={title} size={4}/>
            </div>
            <div className={styles.productContent}>
                <ProductOptionPageContainer productId={id}/>
            </div>
        </div>
    );
}
