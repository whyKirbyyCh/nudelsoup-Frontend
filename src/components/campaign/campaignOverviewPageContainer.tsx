"use client";

import React from "react";
import styles from "../../styles/components/campaign/campaignOverviewPageContainer.module.css";
import CampaignOverviewContainer from "@/components/campaign/campaignOverviewContainer";
import CampaignAdditionButton from "@/components/campaign/campaignAdditionButton";
interface Campaign {
    campaignId: string;
    title: string;
    targetAudience: string;
    campaignType: string;
    campaignGoal: string;
    startDate: string;
    stillActive: boolean;
}

interface CampaignOverviewPageContainerProps {
    productId: string;
    campaigns: Campaign[];
    addButtonClick: () => void;
}

const CampaignOverviewPageContainer: React.FC<CampaignOverviewPageContainerProps> = ({ productId, campaigns , addButtonClick }) => {
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
                    />
                ))}
                <CampaignAdditionButton key="campaign-addition-button" onClick={addButtonClick} />
            </div>
        </div>
    );
};

export default CampaignOverviewPageContainer;
