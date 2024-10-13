"use client";

import React, {useEffect} from "react";
import styles from "./campaignPage.module.css";
import {useRouter, useSearchParams} from "next/navigation";
import Header from "@/components/header/header";
import PageTitle from "@/components/page/pageTitle";
import CampaignOptionPageContainer from "@/components/campaign/campaignOptionPageContainer";

// should have details, content/message for the posts etc. and analytics and product details tabs

export default function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams?.get("id") || "";
    const title = searchParams?.get("title") ?? "CAMPAIGN";

    useEffect(() => {
        if (id === "") {
            router.push("/campaign-overview");
        } else if (!title || title === "CAMPAIGN") {
            router.push("/campaign-overview");
        }
    }, [id, router, title]);

    const payingCustomerNavOptions = [
        { id: 1, label: 'ORGANISATION', href: '/organisation-overview' },
        { id: 2, label: 'PRODUCTS', href: '/product-overview' },
        { id: 3, label: 'CAMPAIGNS', href: '/campaign-overview' },
        { id: 4, label: 'ANALYTICS', href: '/analytics' },
    ];

    return (
        <div className={styles.campaignContainer}>
            <div className={styles.campaignHeader}>
                <Header
                    iconSize="large"
                    navOptions={payingCustomerNavOptions}
                    fontSizeVariant="large"
                    showButtons={true}
                />
            </div>
            <div className={styles.campaignTitle}>
                <PageTitle title={title} size={4}/>
            </div>
            <div className={styles.campaignContent}>
                <CampaignOptionPageContainer campaignId={id} />
            </div>
        </div>
    );
}