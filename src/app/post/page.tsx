"use client";

import React, {useEffect} from "react";
import styles from "./postPage.module.css";
import Header from "@/components/header/header";
import PageTitle from "@/components/page/pageTitle";
import { useSearchParams, useRouter } from "next/navigation";
import PostOverviewContainer from "@/components/posts/postOverviewContainer";

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = Number(searchParams?.get("id")) || -1;

    const payingCustomerNavOptions = [
        { id: 1, label: "ORGANISATION", href: "/organisation-overview" },
        { id: 2, label: "PRODUCTS", href: "/product-overview" },
        { id: 3, label: "CAMPAIGNS", href: "/campaign-overview" },
        { id: 4, label: "ANALYTICS", href: "/analytics" },
    ];

    useEffect(() => {
        if (id === -1) {
            setTimeout(() => {
                router.back();
            }, 5000);
            router.back();
        }
    }, [router, id]);

    return (
        <div className={styles.postContainer}>
            <div className={styles.postHeader}>
                <Header iconSize="large" navOptions={payingCustomerNavOptions} fontSizeVariant="large"
                        showButtons={true}/>
            </div>
            <div className={styles.postPageTitle}>
                <PageTitle title={"Post Title"} size={4}/>
            </div>
            <div className={styles.postContent}>
                <div className={styles.postMainBody}>
                    <PostOverviewContainer postId={id}/>
                </div>
            </div>
        </div>
    );
};