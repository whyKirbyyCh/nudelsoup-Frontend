import React, { useState } from "react";
import styles from "../../styles/components/product/productOptionPageContainer.module.css";
import CampaignOverviewPageContainer from "@/components/campaign/campaignOverviewPageContainer";
import ProductDetailsContainer from "@/components/product/productDetailsContainer";
import CampaignAdditionPopupInProduct from "@/components/campaign/campaignAdditionPopupInProduct";

interface Campaign {
    campaignId: string;
    title: string;
    targetAudience: string;
    campaignType: string;
    campaignGoal: string;
    startDate: string;
    stillActive: boolean;
    svgSrc: number;
}

interface ProductOptionPageContainerProps {
    productId: string;
    campaigns: Campaign[];
}

const ProductOptionPageContainer: React.FC<ProductOptionPageContainerProps> = ({ productId, campaigns }) => {
    const [activeTab, setActiveTab] = useState("DETAILS");
    const [showAddCampaignMenu, setShowAddCampaignMenu] = useState(false);
    const [currentCampaigns, setCurrentCampaigns] = useState<Campaign[]>(campaigns); // State to manage campaigns

    const handleAddCampaign = (newCampaign: Campaign) => {
        setCurrentCampaigns([...currentCampaigns, newCampaign]);
    };

    const addButtonClick = () => {
        setShowAddCampaignMenu(!showAddCampaignMenu);
        console.log("add campaign");
    };

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
            {activeTab === "DETAILS" && (
                <div className={styles.tabContent}>
                    <ProductDetailsContainer productId={productId} />
                </div>
            )}
            {activeTab === "CAMPAIGNS" && (
                <div className={styles.tabContent}>
                    {showAddCampaignMenu && (
                        <div className={styles.campaignOverviewPopup}>
                            <CampaignAdditionPopupInProduct
                                onClose={() => setShowAddCampaignMenu(false)}
                                onAddCampaign={handleAddCampaign}
                            />
                        </div>
                    )}
                    <CampaignOverviewPageContainer
                        productId={productId}
                        campaigns={currentCampaigns}
                        addButtonClick={addButtonClick}
                    />
                </div>
            )}
            {activeTab === "ANALYTICS" && (
                <div className={styles.tabContent}>
                    ANALYTICS
                </div>
            )}
        </div>
    );
};

export default ProductOptionPageContainer;
