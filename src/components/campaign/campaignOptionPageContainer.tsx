import React, {useState} from "react";
import styles from "../../styles/components/campaign/campaignOverviewPage.module.css";
import CampaignContentAdditionContainer from "@/components/campaign/campaignContentAdditionContainer";
import CampaignContentArchiveContainer from "@/components/campaign/campaignContentArchiveContainer";

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
            <div className={styles.campaignPageContent}>
                {activeTab === "DETAILS" && <div>DETAILS</div>}
                {activeTab === "CONTENT" &&
                    <div className={styles.campaignContentTab}>
                        <CampaignContentAdditionContainer campaignId={campaignId} />
                        <CampaignContentArchiveContainer campaignId={campaignId} />
                    </div>}
                {activeTab === "ANALYTICS" && <div>ANALYTICS</div>}
                {activeTab === "PRODUCT DETAILS" && <div>PRODUCT DETAILS</div>}
            </div>
        </div>
    );
};

export default CampaignOptionPageContainer;