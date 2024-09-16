import React from "react";
import styles from "../../styles/components/campaign/campaignContentContainer.module.css";

interface CampaignContentArchiveContainerProps {
    campaignId: string
} 

const CampaignContentArchiveContainer: React.FC<CampaignContentArchiveContainerProps> = ({ campaignId}) => {
    return (
        <div className={styles.campaignContentContainer}>
            <div className={styles.campaignContentContainerTitle}>
                {campaignId}
            </div>
        </div>
    );
};

export default CampaignContentArchiveContainer