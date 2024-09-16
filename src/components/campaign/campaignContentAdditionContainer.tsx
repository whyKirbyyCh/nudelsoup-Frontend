import React from "react";
import styles from "../../styles/components/campaign/campaignContentContainer.module.css";

interface CampaignContentContainerProps {
    campaignId: string
}

const CampaignContentAdditionContainer: React.FC<CampaignContentContainerProps> = ({ campaignId}) => {
    return (
        <div className={styles.campaignContentAdditionContainer}>
            <div className={styles.campaignContentAdditionContainerTitle}>
                {campaignId}
            </div>
        </div>
    );
};

export default CampaignContentAdditionContainer