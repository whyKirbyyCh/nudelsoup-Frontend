"use client";

import React, { useState } from "react";
import styles from "./campaign-overviewPage.module.css";
import Header from "@/components/header/header";
import CampaignOverviewPage from "@/components/campaign/campaignOverviewPage";
import PageTitle from "@/components/page/pageTitle";
import ProductAdditionPopup from "@/components/product/productAdditionPopup";

export default function Page() {
    const [showAddProductMenu, setShowAddProductMenu] = useState(false);
    const payingCustomerNavOptions = [
        { id: 1, label: 'ORGANISATION', href: '/organisation-overview' },
        { id: 2, label: 'PRODUCTS', href: '/product-overview' },
        { id: 3, label: 'CAMPAIGNS', href: '/campaign-overview' },
        { id: 4, label: 'ANALYTICS', href: '/analytics' },
    ];

    const campaigns = [
        {
            campaignId: "123456789",
            title: "Campaign 1",
            targetAudience: "Audience A",
            campaignType: "Type X",
            campaignGoal: "Goal 1",
            startDate: "01.02.2003",
            stillActive: true,
            svgSrc: 1
        },
        {
            campaignId: "987654321",
            title: "Campaign 2",
            targetAudience: "Audience B",
            campaignType: "Type Y",
            campaignGoal: "Goal 2",
            startDate: "05.06.2007",
            stillActive: false,
            svgSrc: 1
        },
        {
            campaignId: "987654322",
            title: "Campaign 3",
            targetAudience: "Audience C",
            campaignType: "Type Z",
            campaignGoal: "Goal 1",
            startDate: "05.06.2007",
            stillActive: false,
            svgSrc: 1
        },
    ];

    const addCampaign = () => {
        setShowAddProductMenu(!showAddProductMenu);
    }

    const addButtonClick = () => {
        setShowAddProductMenu(!showAddProductMenu);
        console.log("add product")
    };

    return (
        <div className={styles.campaignOverview}>
            <div className={styles.header}>
                <Header iconSize={"large"} navOptions={payingCustomerNavOptions} fontSizeVariant={"large"} showButtons={true}/>
            </div>
            <div className={styles.campaignOverviewTitle}>
                <PageTitle title={"CAMPAIGNS"} />
            </div>
            <div className={styles.campaignOverviewContent}>
                {showAddProductMenu && (
                    <div className={styles.productOverviewPopup}>
                        <ProductAdditionPopup
                            onClose={() => setShowAddProductMenu(false)}
                            onAddProduct={console.log("add product")}
                        />
                    </div>
                )}
                <CampaignOverviewPage campaigns={campaigns} addButtonClick={addCampaign}/>
            </div>
        </div>
    );
}