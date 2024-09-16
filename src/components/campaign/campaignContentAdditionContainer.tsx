import React, { useState } from "react";
import styles from "../../styles/components/campaign/campaignContentAdditionContainer.module.css";
import PageButton from "@/components/page/pageButton";
import PageButtonSmall from "@/components/page/PageButtonSmall";
import PageSelectionMenu from "@/components/page/pageSelectionMenu";
import ServicesSelectionContainer from "@/components/services/servicesSelectionContainer";
import { useRouter } from "next/navigation";

interface CampaignContentContainerProps {
    campaignId: string;
}

const CampaignContentAdditionContainer: React.FC<CampaignContentContainerProps> = ({ campaignId }) => {
    const router = useRouter();
    const [hasContentBeenCreated, setHasContentBeenCreated] = useState(false);
    const [selectedService, setSelectedService] = useState("SELECTION");
    const [selectedServices, setSelectedServices] = useState<number[]>([]);

    const services = [
        { id: 1, name: "Product Hunt" },
        { id: 2, name: "Makerlog" },
        { id: 3, name: "Product Hunt" },
        { id: 4, name: "Makerlog" },
        { id: 5, name: "devRant" },
        { id: 6, name: "dev.io" },
        { id: 7, name: "Hacker News" },
        { id: 8, name: "Spiceworks" },
        { id: 9, name: "Indie Hackers" },
        { id: 10, name: "devcord" },
        { id: 11, name: "Reddit" },
        { id: 12, name: "Twitter" },
        { id: 13, name: "Facebook" },
        { id: 14, name: "LinkedIn" },
        { id: 15, name: "GitHub" },
        { id: 16, name: "Stack Overflow" },
        { id: 17, name: "Quora" },
        { id: 18, name: "Hacker Noon" },
        { id: 19, name: "CodePen" },
    ];

    const options = [
        { id: 1, name: "SOCIAL MEDIA" },
        { id: 2, name: "DEVELOPER" },
        { id: 3, name: "CREATE CUSTOM" },
    ];

    const handleServiceChange = (option: string) => {
        switch (option) {
            case "SOCIAL MEDIA":
                setSelectedServices(
                    services
                        .filter((s) => ["Twitter", "Facebook", "LinkedIn"].includes(s.name))
                        .map((s) => s.id)
                );
                break;
            case "DEVELOPER":
                setSelectedServices(
                    services
                        .filter((s) => ["GitHub", "Stack Overflow", "CodePen"].includes(s.name))
                        .map((s) => s.id)
                );
                break;
            case "CREATE CUSTOM":
                console.log("Custom route");
                router.push("/site-selection-creation");
                break;
            default:
                break;
        }
    };

    const selectAllServices = () => {
        setSelectedServices(services.map((service) => service.id));
    };

    const selectNoServices = () => {
        setSelectedServices([]);
    };

    const createContent = () => {
        console.log("create content");
        setHasContentBeenCreated(!hasContentBeenCreated);
    };

    const generateContent = () => {
        console.log("generate content");
        setHasContentBeenCreated(!hasContentBeenCreated);
    };

    const resetContent = () => {
        console.log("reset content");
        setSelectedServices([]);
    };

    const handleSpecificServiceSelect = (serviceName: string) => {
        if (serviceName === "Twitter") {
            console.log("Twitter has been selected! Performing a specific action...");
        }
        if (serviceName === "Facebook") {
            console.log("Facebook has been selected! Trigger another action...");
        }
    };

    return (
        <div className={styles.campaignContentAdditionContainer}>
            <div className={styles.campaignContentAdditionTitle}>
                CREATE NEW CONTENT FOR THIS CAMPAIGN
            </div>
            <div className={styles.campaignContentAddition}>
                <div className={styles.campaignContentAdditionBody}>
                    <div className={styles.label}>TOPIC:</div>
                    <div className={styles.value}>[Your input or content for topic]</div>

                    <div className={styles.label}>GOAL:</div>
                    <div className={styles.value}>[Your input or content for goal]</div>

                    <div className={styles.label}>SITES:</div>
                    <div className={styles.valueSelection}>
                        <div className={styles.campaignContentSelectionButtons}>
                            <PageButtonSmall label={"ALL"} onClick={selectAllServices} />
                            <PageSelectionMenu options={options} onSelection={handleServiceChange} />
                            <PageButtonSmall label={"NONE"} onClick={selectNoServices} />
                        </div>
                        <ServicesSelectionContainer
                            services={services}
                            selectedServices={selectedServices}
                            onSelectionChange={setSelectedServices}
                            onServiceSelect={handleSpecificServiceSelect}
                        />
                    </div>

                    <div className={styles.label}>REMARKS:</div>
                    <div className={styles.value}>[Your input or content for remarks]</div>
                </div>
                {!hasContentBeenCreated && (
                    <div className={styles.campaignContentAdditionContainerButtons}>
                        <PageButton label={"RESET INPUT"} onClick={resetContent} />
                        <PageButton label={"CREATE YOUR OWN POSTS"} onClick={createContent} />
                        <PageButton label={"GENERATE POSTS"} onClick={generateContent} />
                    </div>
                )}
                {hasContentBeenCreated && <div>The posts will appear here</div>}
            </div>
        </div>
    );
};

export default CampaignContentAdditionContainer;
