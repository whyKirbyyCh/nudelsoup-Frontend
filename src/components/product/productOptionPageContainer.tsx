import React, { useState } from "react";
import styles from "../../styles/components/product/productOptionPageContainer.module.css";
import CampaignOverviewPageContainer from "@/components/campaign/campaignOverviewPageContainer";

interface ProductOptionPageContainerProps {
    productId: string
}

const ProductOptionPageContainer: React.FC<ProductOptionPageContainerProps> = ({productId}) => {
    const [activeTab, setActiveTab] = useState("DETAILS");

    return (
        <div className={styles.productOptionPageContainer}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === "DETAILS" ? styles.active : ""}`}
                    onClick={() => setActiveTab("DETAILS")}
                >
                    DETAILS
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "CAMPAIGNS" ? styles.active : ""}`}
                    onClick={() => setActiveTab("CAMPAIGNS")}
                >
                    CAMPAIGNS
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "ANALYTICS" ? styles.active : ""}`}
                    onClick={() => setActiveTab("ANALYTICS")}
                >
                    ANALYTICS
                </button>
            </div>
            {activeTab === "DETAILS" &&
                <div className={styles.tabContent}>
                    DETAILS
                </div>
            }
            {activeTab === "CAMPAIGNS" &&
                <div className={styles.tabContent}>
                    <CampaignOverviewPageContainer productId={productId}/>
                </div>
            }
            {activeTab === "ANALYTICS" &&
                <div className={styles.tabContent}>
                    ANALYTICS
                </div>
            }
        </div>
    );
};

export default ProductOptionPageContainer;
