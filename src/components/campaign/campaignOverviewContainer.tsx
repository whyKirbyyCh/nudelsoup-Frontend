import React from "react";
import styles from "../../styles/components/campaign/campaignOverviewContainer.module.css";

interface CampaignOverviewContainerProps {
    campaignId: string;
    title: string;
    targetAudience: string;
    campaignType: string;
    campaignGoal: string;
    startDate: string;
    stillActive: boolean;
}

const CampaignOverviewContainer : React.FC<CampaignOverviewContainerProps> = ({ campaignId, title, targetAudience, campaignType, startDate, stillActive, campaignGoal }) => {
    return (
        <div className={styles.campaignOverviewContainer}>
            <div className={styles.campaignOverviewTitle}>
                {title}
            </div>
            <div className={styles.campaignOverviewContent}>
                <div className={styles.campaignOverviewStartDate}>
                    STARTED: {startDate}
                </div>
                <div className={styles.campaignOverviewTargetAudience}>
                    CUSTOMER: {targetAudience}
                </div>
                <div className={styles.campaignOverviewCampaignType}>
                    TYPE: {campaignType}
                </div>
                <div className={styles.campaignOverviewCampaignGoal}>
                    GOAL: {campaignGoal}
                </div>
                <div className={styles.campaignOverviewStillActive}>
                    STATUS: {stillActive ? "Running" : "Closed"}
                </div>
            </div>
        </div>
    );
};

export default CampaignOverviewContainer;