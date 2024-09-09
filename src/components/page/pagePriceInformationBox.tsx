import React from "react";
import styles from "../../styles/components/pagePriceInformationBox.module.css";

interface PagePriceInformationBoxProps {
    title: string;
    text: string;
}

const PagePriceInformationBox: React.FC<PagePriceInformationBoxProps> = ({ title, text }) => {
    return (
        <div className={styles.priceOptionBox}>
            <div className={styles.priceOptionBoxTitle}>
                {title}
            </div>
            <div className={styles.priceOptionBoxContent}>
                <div className={styles.priceOptionBoxText}>
                    {text}
                </div>
            </div>
        </div>
    );
}

export default PagePriceInformationBox;
