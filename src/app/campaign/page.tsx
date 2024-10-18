"use client";

import React, { useEffect, useState } from "react";
import styles from "./campaignPage.module.css";
import { useRouter } from "next/navigation";
import Header from "@/components/header/header";
import PageTitle from "@/components/page/pageTitle";
import CampaignOptionPageContainer from "@/components/campaign/campaignOptionPageContainer";
import jwt, {JwtPayload} from "jsonwebtoken";

const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return undefined;
};

export default function Page() {
    const router = useRouter();
    const [campaignId, setCampaignId] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("CAMPAIGN");
    const [userId, setUserId] = useState<string>("");

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get("id") || "";
        const campaignTitle = searchParams.get("title") || "CAMPAIGN";

        if (id === "") {
            router.push("/campaign-overview");
        } else if (!campaignTitle || campaignTitle === "CAMPAIGN") {
            router.push("/campaign-overview");
        } else {
            setCampaignId(id);
            setTitle(campaignTitle);
        }

        const token = getCookie("authToken");

        if (!token) {
            router.push("/login");
        } else {
            const decodedToken = jwt.decode(token) as JwtPayload | null;
            if (!decodedToken || typeof decodedToken !== "object" || !decodedToken.userId) {
                router.push("/login");
            } else {
                setUserId(decodedToken.userId);
            }
        }

    }, [router]);

    const payingCustomerNavOptions = [
        { id: 1, label: "ORGANISATION", href: "/organisation-overview" },
        { id: 2, label: "PRODUCTS", href: "/product-overview" },
        { id: 3, label: "CAMPAIGNS", href: "/campaign-overview" },
        { id: 4, label: "ANALYTICS", href: "/analytics" },
    ];

    if (campaignId === null) {
        return <div>Loading...</div>;
    }

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
                <PageTitle title={title} size={4} />
            </div>
            <div className={styles.campaignContent}>
                <CampaignOptionPageContainer campaignId={campaignId} userId={userId} />
            </div>
        </div>
    );
}
