"use client";

import React from "react";
import styles from "../../styles/components/campaign/campaignOverviewPageContainer.module.css";
import CampaignOverviewContainer from "@/components/campaign/campaignOverviewContainer";
import CampaignAdditionButton from "@/components/campaign/campaignAdditionButton";

interface Campaign {
    userId: string;
    productId: string;
    campaignId: string;
    title: string;
    targetAudience: string;
    campaignType: string;
    campaignGoal: string;
    startDate: string;
    stillActive: boolean;
    svgSrc: number;
    productTitle?: string;
}

interface CampaignOverviewPageProps {
    campaigns: Campaign[];
    addButtonClick: () => void;
}

const CampaignOverviewPage: React.FC<CampaignOverviewPageProps> = ({ campaigns , addButtonClick }) => {
    return (
        <div className={styles.campaignOverviewPageContainer}>
            <div className={styles.campaigns}>
                {campaigns.map((campaign, index) => (
                    <CampaignOverviewContainer
                        key={index}
                        campaignId={campaign.campaignId}
                        title={campaign.title}
                        targetAudience={campaign.targetAudience}
                        campaignType={campaign.campaignType}
                        campaignGoal={campaign.campaignGoal}
                        startDate={campaign.startDate}
                        stillActive={campaign.stillActive}
                        svgSrc={campaign.svgSrc}
                        productTitle={campaign.productTitle}
                    />
                ))}
                <CampaignAdditionButton key="campaign-addition-button" onClick={addButtonClick} />
            </div>
        </div>
    );
};

export default CampaignOverviewPage;
