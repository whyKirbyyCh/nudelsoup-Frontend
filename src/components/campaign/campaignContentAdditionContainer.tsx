import React, { useState } from "react";
import styles from "../../styles/components/campaign/campaignContentAdditionContainer.module.css";
import PageButton from "@/components/page/pageButton";
import PageButtonSmall from "@/components/page/PageButtonSmall";
import ServicesSelectionContainer from "@/components/services/servicesSelectionContainer";

interface CampaignContentContainerProps {
    campaignId: string;
}

const CampaignContentAdditionContainer: React.FC<CampaignContentContainerProps> = ({ campaignId }) => {
    const [hasContentBeenCreated, setHasContentBeenCreated] = useState(false);
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
    const [selectedServices, setSelectedServices] = useState<number[]>([]);

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

    return (
        <div className={styles.campaignContentAdditionContainer}>
            <div className={styles.campaignContentAdditionTitle}>
                CREATE NEW CONTENT FOR THIS CAMPAIGN
            </div>
            <div className={styles.campaignContentAddition}>
                <div className={styles.campaignContentAdditionBody}>
                    <div>TOPIC:</div>
                    <div>GOAL:</div>
                    <div className={styles.campaignContentAdditionContainerBox}>
                        <div className={styles.label}>SITES:</div>
                        <div className={styles.value}>
                            <div className={styles.campaignContentSelectionbuttons}>
                                <PageButtonSmall label={"ALL"} onClick={selectAllServices} />
                                <PageButtonSmall label={"SELECTION"} onClick={selectNoServices} />
                                <PageButtonSmall label={"NONE"} onClick={selectNoServices} />
                            </div>
                            <ServicesSelectionContainer
                                services={services}
                                selectedServices={selectedServices}
                                onSelectionChange={setSelectedServices}
                            />
                        </div>
                    </div>
                    <div>REMARKS:</div>
                </div>
                {!hasContentBeenCreated && (
                    <div className={styles.campaignContentAdditionContainerButtons}>
                        <PageButton label={"RESET INPUT"} onClick={resetContent} />
                        <PageButton label={"CREATE YOUR OWN POSTS"} onClick={createContent} />
                        <PageButton label={"GENERATE POSTS"} onClick={generateContent} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CampaignContentAdditionContainer;
