"use client";

import React, { useEffect, useState } from "react";
import styles from "./postPage.module.css";
import Header from "@/components/header/header";
import PageTitle from "@/components/page/pageTitle";
import { useRouter } from "next/navigation";
import PostOverviewContainer from "@/components/posts/postOverviewContainer";

export default function Page() {
    const router = useRouter();
    const [postId, setPostId] = useState<number | null>(null);
    const payingCustomerNavOptions = [
        { id: 1, label: "ORGANISATION", href: "/organisation-overview" },
        { id: 2, label: "PRODUCTS", href: "/product-overview" },
        { id: 3, label: "CAMPAIGNS", href: "/campaign-overview" },
        { id: 4, label: "ANALYTICS", href: "/analytics" },
    ];

    useEffect(() => {
        // Ensure the following code only runs on the client
        const searchParams = new URLSearchParams(window.location.search);
        const id = Number(searchParams.get("id")) || -1;

        if (id === -1) {
            setTimeout(() => {
                router.back();
            }, 5000);
            router.back();
        } else {
            setPostId(id); // Set the postId after fetching the query parameter
        }
    }, [router]);

    if (postId === null) {
        return <div>Loading...</div>; // Suspense fallback
    }

    return (
        <div className={styles.postContainer}>
            <div className={styles.postHeader}>
                <Header
                    iconSize="large"
                    navOptions={payingCustomerNavOptions}
                    fontSizeVariant="large"
                    showButtons={true}
                />
            </div>
            <div className={styles.postPageTitle}>
                <PageTitle title={"Post Title"} size={4} />
            </div>
            <div className={styles.postContent}>
                <div className={styles.postMainBody}>
                    <PostOverviewContainer postId={postId} />
                </div>
            </div>
        </div>
    );
}
