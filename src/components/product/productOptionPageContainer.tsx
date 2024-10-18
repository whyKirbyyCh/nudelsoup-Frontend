import React, { useEffect, useState } from "react";
import styles from "../../styles/components/product/productOptionPageContainer.module.css";
import CampaignOverviewPageContainer from "@/components/campaign/campaignOverviewPageContainer";
import ProductDetailsContainer from "@/components/product/productDetailsContainer";
import CampaignAdditionPopupInProduct from "@/components/campaign/campaignAdditionPopupInProduct";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useRouter } from "next/navigation";

interface Campaign {
    userId: string;
    productId: string;
    productTitle: string;
    campaignId: string;
    title: string;
    targetAudience: string;
    campaignType: string;
    campaignGoal: string;
    startDate: string;
    stillActive: boolean;
    svgSrc: number;
    additionalFields?: Record<string, any>;
}

interface ProductOptionPageContainerProps {
    productId: string;
}

const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return undefined;
};

const ProductOptionPageContainer: React.FC<ProductOptionPageContainerProps> = ({ productId }) => {
    const [activeTab, setActiveTab] = useState("DETAILS");
    const [showAddCampaignMenu, setShowAddCampaignMenu] = useState(false);
    const [currentCampaigns, setCurrentCampaigns] = useState<Campaign[]>([]);
    const router = useRouter();
    const [userId, setUserId] = useState<string>("");

    const handleAddCampaign = (newCampaign: Campaign) => {
        setCurrentCampaigns([...currentCampaigns, newCampaign]);
    };

    const addButtonClick = () => {
        setShowAddCampaignMenu(!showAddCampaignMenu);
        console.log("add campaign");
    };

    useEffect(() => {
        const token = getCookie("authToken");

        if (!token) {
            router.push("/login");
        } else {
            const decodedToken = jwt.decode(token) as JwtPayload | null;
            if (!decodedToken || typeof decodedToken !== "object" || !decodedToken.userId) {
                router.push("/login");
            } else {
                setUserId(decodedToken.userId as string);
            }
        }
    }, [router]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await fetch(`/api/campaignDetails/campaignDetailsProductId?productId=${productId}`);
                if (!response.ok) {
                    return;
                }
                const data = await response.json();
                setCurrentCampaigns(data.campaigns || []);
            } catch (error) {
                setCurrentCampaigns([]);
            }
        };

        fetchCampaigns().then();
    }, [productId]);

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
