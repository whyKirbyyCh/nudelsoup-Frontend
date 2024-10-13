import React, {useEffect} from "react";
import styles from "../../styles/components/campaign/campaignOverviewContainer.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CampaignOverviewContainerProps {
    campaignId: string;
    title: string;
    targetAudience: string;
    campaignType: string;
    campaignGoal: string;
    startDate: string;
    stillActive: boolean;
    svgSrc?: number;
    productTitle?: string;
}

const CampaignOverviewContainer : React.FC<CampaignOverviewContainerProps> = ({ campaignId, title, targetAudience, campaignType, startDate, stillActive, campaignGoal, svgSrc = 0, productTitle }) => {
    const [svgLink, setSvgLink] = React.useState("/campaignIcons/default-project-icon.svg");
    const [showProductName, setShowProductName] = React.useState(false);
    const router = useRouter();

    useEffect(() => {
        if (productTitle) {
            setShowProductName(true);
        } else {
            setShowProductName(false);
        }

        if (svgSrc === 0) {
            setSvgLink("/campaignIcons/default-project-icon.svg")
        } else if (svgSrc === 1) {
            setSvgLink("campaignIcons/ai-project-icon.svg")
        } else if (svgSrc === 2) {
            setSvgLink("campaignIcons/configuration-project-icon.svg")
        } else if (svgSrc === 3) {
            setSvgLink("campaignIcons/data-project-icon.svg")
        }else if (svgSrc === 4) {
            setSvgLink("campaignIcons/database-project-icon.svg")
        }else if (svgSrc === 5) {
            setSvgLink("campaignIcons/ecommerce-project-icon.svg")
        }else if (svgSrc === 6) {
            setSvgLink("campaignIcons/networking-project-icon.svg")
        } else if (svgSrc === 7) {
            setSvgLink("campaignIcons/video-project-icon.svg")
        }else {
            setSvgLink("/campaignIcons/default-project-icon.svg")
        }
    }, [productTitle, svgSrc]);

    const goToCampaign = () => {
        router.push(`/campaign?id=${campaignId}&title=${title}`);
    };

    return (
        <div className={styles.campaignOverviewContainer} onClick={goToCampaign} role={"button"} tabIndex={0} aria-label={"campaign overview"}>
            <div className={styles.campaignOverviewIconBackground}>
                <Image
                    src={svgLink}
                    alt={title}
                    className={styles.campaignOverviewIcon}
                />
            </div>
            <div className={styles.campaignOverviewTitle}>
                {title}
            </div>
            <div className={styles.campaignOverviewContent}>
                {showProductName &&
                    <div className={styles.campaignOverviewProductName}>
                        PRODUCT: {productTitle}
                    </div>
                }
                <div className={styles.campaignOverviewStartDate}>
                    STARTED: {startDate}
                </div>
                <div className={styles.campaignOverviewTargetAudience}>
                    CUSTOMER: {targetAudience}
                </div>
                <div className={styles.campaignOverviewCampaignType}>
                    TYPE: {campaignType}
                </div>
                <div className={styles.campaignOverviewCampaignGoal}>
                    GOAL: {campaignGoal}
                </div>
                <div className={styles.campaignOverviewStillActive}>
                    STATUS: {stillActive ? "Running" : "Closed"}
                </div>
            </div>
        </div>
    );
};

export default CampaignOverviewContainer;