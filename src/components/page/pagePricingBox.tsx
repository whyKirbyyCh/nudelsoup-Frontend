import React from "react";
import styles from "../../styles/components/pagePricingBox.module.css";
import PagePriceOptionBox from "../page/pagePriceOptionContainer";
import PageCheckoutButton from "@/components/page/pageCheckoutButton";

interface PagePricingBoxProps {
    title1: string;
    text1: string;
    onClick1?: () => void;
    buttonText1: string;

    title2: string;
    text2: string;
    onClick2?: () => void;
    buttonText2: string;

    title3: string;
    text3: string;
    onClick3?: () => void;
    buttonText3: string;

    isButtonDisabled: boolean;
    onCheckoutError: () => void;
}

const PagePricingBox: React.FC<PagePricingBoxProps> = ({
                                                           title1,
                                                           text1,
                                                           onClick1,
                                                           buttonText1,
                                                           title2,
                                                           text2,
                                                           onClick2,
                                                           buttonText2,
                                                           title3,
                                                           text3,
                                                           onClick3,
                                                           buttonText3,
                                                           isButtonDisabled,
                                                           onCheckoutError,
                                                       }) => {
    return (
        <div className={styles.pricingBox}>
            <div className={styles.pricingBoxContent}>
                <div>
                    <div className={styles.pricingBoxSubtitle}>*if you are still hungry you can always order more</div>
                </div>
                <div className={styles.pricingBoxContainer}>
                    <PagePriceOptionBox title={title1} text={text1} buttonText={buttonText1} onClick={onClick1} />
                    <PagePriceOptionBox title={title2} text={text2} buttonText={buttonText2} onClick={onClick2} />
                    <PagePriceOptionBox title={title3} text={text3} buttonText={buttonText3} onClick={onClick3} />
                </div>
                <div className={styles.pricingBoxButton}>
                    <PageCheckoutButton label={"TO CHECKOUT"} onClick={isButtonDisabled ? onCheckoutError : undefined} />
                </div>
            </div>
        </div>
    );
};

export default PagePricingBox;
