import React, {useState} from "react";
import styles from "../../styles/components/campaign/campaignOverviewPage.module.css";
import CampaignContentContainer from "@/components/campaign/campaignContentContainer";

interface CampaignOptionPageContainerProps {
    campaignId: string;
}

const CampaignOptionPageContainer: React.FC<CampaignOptionPageContainerProps> = ({ campaignId}) => {
    const [activeTab, setActiveTab] = useState("DETAILS");

    return (
        <div className={styles.campaignPage}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === "DETAILS" ? styles.active : ""}`}
                    onClick={() => setActiveTab("DETAILS")}
                >
                    DETAILS
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "CONTENT" ? styles.active : ""}`}
                    onClick={() => setActiveTab("CONTENT")}
                >
                    CONTENT
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "ANALYTICS" ? styles.active : ""}`}
                    onClick={() => setActiveTab("ANALYTICS")}
                >
                    ANALYTICS
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "PRODUCT DETAILS" ? styles.active : ""}`}
                    onClick={() => setActiveTab("PRODUCT DETAILS")}
                >
                    PRODUCT DETAILS
                </button>
            </div>
            {activeTab === "DETAILS" && <div>DETAILS</div>}
            {activeTab === "CONTENT" && <div className={styles.campaignContentTab}><CampaignContentContainer campaignId={campaignId}/></div>}
            {activeTab === "ANALYTICS" && <div>ANALYTICS</div>}
            {activeTab === "PRODUCT DETAILS" && <div>PRODUCT DETAILS</div>}
        </div>
    );
};

export default CampaignOptionPageContainer;