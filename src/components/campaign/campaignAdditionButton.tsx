"use client";

import React from "react";
import styles from "../../styles/components/campaign/campaignAdditionButton.module.css";
import Image from "next/image";


interface CampaignAdditionButtonProps {
    onClick: () => void;
}

const CampaignAdditionButton: React.FC<CampaignAdditionButtonProps> = ({ onClick }) => {
    return (
        <div className={styles.campaignAdditionButton} onClick={onClick} role={"button"} tabIndex={0} aria-label={"add campaign"}>
            <Image
                src={"/add-product.svg"}
                alt={"add campaign"}
                className={styles.campaignAdditionIcon}
            />
        </div>
    );
};

export default CampaignAdditionButton;