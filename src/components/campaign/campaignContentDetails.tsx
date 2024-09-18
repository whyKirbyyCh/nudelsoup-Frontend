import React from "react";
import styles from "../../styles/components/campaign/campaignContentDetails.module.css";

interface CampaignContentDetailsProps {
    campaignId: string;
}

const CampaignContentDetails: React.FC<CampaignContentDetailsProps> = ({ campaignId}) => {
    return (
        <div className={styles.campaignContentDetailsContainer}>
            Test
        </div>
    );
};

export default CampaignContentDetails