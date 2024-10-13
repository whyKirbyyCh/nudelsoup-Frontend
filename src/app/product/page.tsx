"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./productPage.module.css";
import ProductOptionPageContainer from "@/components/product/productOptionPageContainer";
import Header from "@/components/header/header";
import PageTitle from "@/components/page/pageTitle";

export default function Page() {
    const router = useRouter();
    const [productId, setProductId] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("PRODUCT");

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get("id") || "";
        const productTitle = searchParams.get("title") || "PRODUCT";

        if (id === "") {
            router.push("/product-overview");
        } else if (!productTitle || productTitle === "PRODUCT") {
            router.push("/product-overview");
        } else {
            setProductId(id);
            setTitle(productTitle);
        }
    }, [router]);

    const payingCustomerNavOptions = [
        { id: 1, label: "ORGANISATION", href: "/organisation-overview" },
        { id: 2, label: "PRODUCTS", href: "/product-overview" },
        { id: 3, label: "CAMPAIGNS", href: "/campaign-overview" },
        { id: 4, label: "ANALYTICS", href: "/analytics" },
    ];

    const campaigns = [
        {
            userId: "123456789",
            productId: "123456789",
            campaignId: "123456789",
            productTitle: "Product 1",
            title: "Campaign 1",
            targetAudience: "Audience A",
            campaignType: "Type X",
            campaignGoal: "Goal 1",
            startDate: "01.02.2003",
            stillActive: true,
            svgSrc: 1,
        },
    ];

    if (productId === null) {
        return <div>Loading...</div>;
    }

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
                <PageTitle title={title} size={4} />
            </div>
            <div className={styles.productContent}>
                <ProductOptionPageContainer productId={productId} campaigns={campaigns} />
            </div>
        </div>
    );
}
