import React from "react";
import styles from "../../styles/components/campaign/campaignContentArchiveContainer.module.css";

interface CampaignContentArchiveContainerProps {
    campaignId: string
} 

const CampaignContentArchiveContainer: React.FC<CampaignContentArchiveContainerProps> = ({ campaignId}) => {
    return (
        <div className={styles.campaignContentArchiveContainer}>
            <div className={styles.campaignContentContainerTitle}>
                {campaignId}
            </div>
        </div>
    );
};

export default CampaignContentArchiveContainer