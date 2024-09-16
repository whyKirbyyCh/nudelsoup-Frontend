import React from "react";
import styles from "../../styles/components/campaign/campaignContentAdditionContainer.module.css";

interface CampaignContentContainerProps {
    campaignId: string
}

const CampaignContentAdditionContainer: React.FC<CampaignContentContainerProps> = ({ campaignId}) => {
    return (
        <div className={styles.campaignContentAdditionContainer}>
            <div className={styles.campaignContentAddition}>
                {campaignId}
            </div>
        </div>
    );
};

export default CampaignContentAdditionContainer