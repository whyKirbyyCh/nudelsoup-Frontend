import React, { useEffect } from "react";
import styles from "../../styles/components/campaign/campaignAdditionPopup.module.css";
import PageButton from "@/components/page/pageButton";
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

interface Product {
    productId: string;
    productTitle: string;
}

interface CampaignAdditionPopupInProductProps {
    onClose: () => void;
    onAddCampaign: (newCampaign: Campaign) => void;
    productId: string;
    userId: string;
}

const CampaignAdditionPopupInProduct: React.FC<CampaignAdditionPopupInProductProps> = ({
                                                                         onClose,
                                                                         onAddCampaign,
                                                                         productId,
                                                                         userId,
                                                                     }) => {
    const [title, setTitle] = React.useState("");
    const [svgSrc, setSvgSrc] = React.useState<number | null>(0);
    const [targetAudience, setTargetAudience] = React.useState("");
    const [campaignType, setCampaignType] = React.useState("social");
    const [campaignGoal, setCampaignGoal] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const router = useRouter();
    const [products, setProducts] = React.useState<Product[]>([]);

    const isFormValid =
        title !== "" &&
        svgSrc !== null &&
        targetAudience !== "" &&
        campaignType !== "" &&
        campaignGoal !== "" &&
        startDate !== "";

    const campaignIcons = [
        { id: 0, href: "campaignIcons/default-project-icon.svg" },
        { id: 1, href: "campaignIcons/ai-project-icon.svg" },
        { id: 2, href: "campaignIcons/configuration-project-icon.svg" },
        { id: 3, href: "campaignIcons/data-project-icon.svg" },
        { id: 4, href: "campaignIcons/database-project-icon.svg" },
        { id: 5, href: "campaignIcons/ecommerce-project-icon.svg" },
        { id: 6, href: "campaignIcons/networking-project-icon.svg" },
        { id: 7, href: "campaignIcons/video-project-icon.svg" },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `/api/productDetails/productIdAndTitleByUserId?userId=${userId}`
                );
                if (!response.ok) {
                    console.error("Error fetching products:", response.statusText);
                    return;
                }
                const data = await response.json();
                setProducts(data.products || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts().then();
    }, [userId]);

    const handleSubmit = async () => {
        if (!isFormValid || svgSrc === null) {
            return;
        }

        const hashTitle = (title: string) => {
            let hash = 0;
            for (let i = 0; i < title.length; i++) {
                hash = hash * 31 + title.charCodeAt(i);
                hash = hash & hash;
            }
            return Math.abs(hash);
        };

        const newCampaignId = `${hashTitle(title)}${Date.now().toString()}`;

        const newCampaign: Campaign = {
            userId: userId,
            productId: productId,
            productTitle: products.find(product => product.productId === productId)?.productTitle || "",
            campaignId: newCampaignId,
            title,
            svgSrc,
            targetAudience,
            campaignType,
            campaignGoal,
            startDate,
            stillActive: true,
            additionalFields: {},
        };

        try {
            const response = await fetch(
                "/api/campaignDetails/campaignSetNewCampaign",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newCampaign),
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log("Campaign added:", data);
                onAddCampaign(newCampaign);
                onClose();
            } else {
                const errorData = await response.json();
                console.error("Error adding campaign:", errorData.message);
            }
        } catch (error) {
            console.error("Error adding campaign:", error);
        }
    };

    const directToCustom = () => {
        router.push("/campaign-creation");
    };

    const addProduct = () => {
        router.push("/product-overview");
    };

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <div className={styles.popupContentTitle}>ADD A CAMPAIGN</div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.formGroup}>
                        <label>CAMPAIGN TITLE:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>ICON:</label>
                        <div className={styles.iconGrid}>
                            {campaignIcons.map((icon) => (
                                <img
                                    key={icon.id}
                                    src={`/${icon.href}`}
                                    alt={`Icon ${icon.id}`}
                                    className={`${styles.icon} ${
                                        svgSrc === icon.id ? styles.selectedIcon : ""
                                    }`}
                                    onClick={() => setSvgSrc(icon.id)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label>TARGET AUDIENCE:</label>
                        <input
                            type="text"
                            value={targetAudience}
                            onChange={(e) => setTargetAudience(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>CAMPAIGN TYPE:</label>
                        <select
                            value={campaignType}
                            onChange={(e) => setCampaignType(e.target.value)}
                            required
                        >
                            <option value="social">SOCIAL</option>
                            <option value="email">EMAIL</option>
                            <option value="ads">ADS</option>
                            <option value="other">OTHER</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>CAMPAIGN GOAL:</label>
                        <input
                            type="text"
                            value={campaignGoal}
                            onChange={(e) => setCampaignGoal(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>START DATE:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <PageButton label={"SAVE"} onClick={handleSubmit} />
                        <PageButton label={"CUSTOMISE"} onClick={directToCustom} />
                        <PageButton label={"ADD PRODUCT"} onClick={addProduct} />
                        <PageButton label={"EXIT"} onClick={onClose} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CampaignAdditionPopupInProduct;
