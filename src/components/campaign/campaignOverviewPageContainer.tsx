import React from "react";
import styles from "../../styles/components/campaign/campaignOverviewContainer.module.css";

interface CampaignOverviewPageContainerProps {
    productId: string;
}

const CampaignOverviewPageContainer : React.FC<CampaignOverviewPageContainerProps> = ({productId}) => {
    return (
        <div className={styles.campaignOverviewPageContainer}>
            {productId}
        </div>
    );
};

export default CampaignOverviewPageContainer;