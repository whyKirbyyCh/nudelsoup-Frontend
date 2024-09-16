import React from "react";
import styles from "../../styles/components/campaign/campaignContentContainer.module.css";
import CampaignContentAdditionContainer from "@/components/campaign/campaignContentAdditionContainer";
import CampaignContentArchiveContainer from "@/components/campaign/campaignContentArchiveContainer";

interface CampaignContentContainerProps {
    campaignId: string;
}

const CampaignContentContainer: React.FC<CampaignContentContainerProps> = ({ campaignId}) => {
    return (
        <div className={styles.campaignContentContainer}>
            <div className={styles.campaignContentContainerAddition}>
                <CampaignContentAdditionContainer campaignId={campaignId} />
                <CampaignContentArchiveContainer campaignId={campaignId} />
            </div>
        </div>
    );
};

export default CampaignContentContainer