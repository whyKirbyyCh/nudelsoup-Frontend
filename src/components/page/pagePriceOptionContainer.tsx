import React from "react";
import styles from "../../styles/components/pagePriceOptionContainer.module.css";
import PageButton from "@/components/page/pageButton";

interface PagePriceOptionBoxProps {
    title: string;
    text: string;
    onClick?: () => void;
    buttonText: string;
}


const PagePriceOptionBox: React.FC<PagePriceOptionBoxProps> = ({ title, text, buttonText, onClick }) => {
    return (
        <div className={styles.priceOptionBox}>
            <div className={styles.priceOptionBoxTitle}>
                {title}
            </div>
            <div className={styles.priceOptionBoxContent}>
                <div className={styles.priceOptionBoxText}>
                    {text}
                </div>
                <div className={styles.priceOptionBoxButton}>
                    <PageButton label={buttonText} onClick={onClick}/>
                </div>
            </div>
        </div>
    );
}

export default PagePriceOptionBox;
