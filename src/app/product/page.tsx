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

    const campaigns = [
        {
            campaignId: "123456789",
            title: "Campaign 1",
            targetAudience: "Audience A",
            campaignType: "Type X",
            campaignGoal: "Goal 1",
            startDate: "01.02.2003",
            stillActive: true,
        },
        {
            campaignId: "987654321",
            title: "Campaign 2",
            targetAudience: "Audience B",
            campaignType: "Type Y",
            campaignGoal: "Goal 2",
            startDate: "05.06.2007",
            stillActive: false,
        },
        {
            campaignId: "987654321",
            title: "Campaign 3",
            targetAudience: "Audience C",
            campaignType: "Type Z",
            campaignGoal: "Goal 3",
            startDate: "05.06.2087",
            stillActive: true,
        },
    ];

    const addButtonClick = () => {
        console.log("add product")
    };

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
                <ProductOptionPageContainer productId={id} campaigns={campaigns} addButtonClick={addButtonClick}/>
            </div>
        </div>
    );
}
