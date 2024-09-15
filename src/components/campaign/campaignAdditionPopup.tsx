import React from "react";
import styles from "../../styles/components/campaign/campaignAdditionPopup.module.css";
import PageButton from "@/components/page/pageButton";
import { useRouter } from "next/navigation";

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

interface CampaignAdditionPopupProps {
    onClose: () => void;
    onAddCampaign: (newCampaign: Campaign) => void;
}

const CampaignAdditionPopup: React.FC<CampaignAdditionPopupProps> = ({
                                                                         onClose,
                                                                         onAddCampaign,
                                                                     }) => {
    const [title, setTitle] = React.useState("");
    const [svgSrc, setSvgSrc] = React.useState<number | null>(0);
    const [targetAudience, setTargetAudience] = React.useState("");
    const [campaignType, setCampaignType] = React.useState("social");
    const [campaignGoal, setCampaignGoal] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const router = useRouter();

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

    const handleSubmit = () => {
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

        onAddCampaign({
            campaignId: newCampaignId,
            title,
            svgSrc,
            targetAudience,
            campaignType,
            campaignGoal,
            startDate,
            stillActive: true,
        });
        onClose();
    };

    const directToCustom = () => {
        router.push("/campaign-creation");
    };

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <div className={styles.popupContentTitle}>ADD A CAMPAIGN*</div>
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
                        <PageButton label={"EXIT"} onClick={onClose} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CampaignAdditionPopup;
