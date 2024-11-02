"use client";

import React, { useState, useEffect } from "react";
import styles from "./campaign-overviewPage.module.css";
import Header from "@/components/header/header";
import CampaignOverviewPage from "@/components/campaign/campaignOverviewPage";
import PageTitle from "@/components/page/pageTitle";
import CampaignAdditionPopup from "@/components/campaign/campaignAdditionPopup";
import jwt, {JwtPayload} from "jsonwebtoken";
import { useRouter } from "next/navigation";

const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return undefined;
};

interface Campaign {
    campaignId: string;
    userId: string;
    productId: string;
    productTitle: string;
    title: string;
    targetAudience: string;
    campaignType: string;
    campaignGoal: string;
    startDate: string;
    stillActive: boolean;
    svgSrc: number;
    additionalFields?: Record<string, any>;
}

export default function Page() {
    const [showAddCampaignMenu, setShowAddCampaignMenu] = useState(false);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [userId, setUserId] = useState<string>("");
    const router = useRouter();

    const payingCustomerNavOptions = [
        { id: 1, label: "ORGANISATION", href: "/organisation-overview" },
        { id: 2, label: "PRODUCTS", href: "/product-overview" },
        { id: 3, label: "CAMPAIGNS", href: "/campaign-overview" },
        { id: 4, label: "ANALYTICS", href: "/analytics" },
    ];

    useEffect(() => {
        const token = getCookie("authToken");

        if (!token) {
            router.push("/login");
        } else {
            const decodedToken = jwt.decode(token) as JwtPayload | null;
            if (!decodedToken || typeof decodedToken !== "object" || !decodedToken.userId) {
                router.push("/login");
            } else {
                setUserId(decodedToken.userId as string);
            }
        }
    }, [router]);

    useEffect(() => {
        if (!userId) return;

        const fetchCampaigns = async () => {
            try {
                const response = await fetch(`/api/campaignDetails/campaignAllCampaignsOverviewPage?userId=${userId}`);
                if (!response.ok) {
                    return
                }
                const data = await response.json();
                setCampaigns(
                    data.campaigns.map((campaign: any) => ({
                        ...campaign,
                        campaignId: campaign._id,
                    }))
                );
            } catch (err) {
                return
            }
        };

        fetchCampaigns().then();
    }, [userId]);


    const addButtonClick = () => {
        setShowAddCampaignMenu(!showAddCampaignMenu);
    };

    return (
        <div className={styles.campaignOverview}>
            <div className={styles.header}>
                <Header
                    iconSize={"large"}
                    navOptions={payingCustomerNavOptions}
                    fontSizeVariant={"large"}
                    showButtons={true}
                />
            </div>
            <div className={styles.campaignOverviewTitle}>
                <PageTitle title={"YOUR CAMPAIGNS"} size={4} />
            </div>
            <div className={styles.campaignOverviewContent}>
                {showAddCampaignMenu && (
                    <div className={styles.campaignOverviewPopup}>
                        <CampaignAdditionPopup
                            userId={userId}
                            onClose={() => setShowAddCampaignMenu(false)}
                            onAddCampaign={(newCampaign: Campaign) => {
                                setCampaigns([...campaigns, newCampaign]);
                            }}
                        />
                    </div>
                )}
                <CampaignOverviewPage
                    campaigns={campaigns}
                    addButtonClick={addButtonClick}
                />
            </div>
        </div>
    );
}
