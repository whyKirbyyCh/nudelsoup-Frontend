import React from "react";
import styles from "../../styles/components/pagePriceOptionContainer.module.css";
import PageButton from "@/components/page/pageButton";
import PageSVGElement from "@/components/page/pageSVGElement";

interface PagePriceOptionBoxProps {
    title: string;
    text: string;
    onClick1?: () => void;
    onClick2?: () => void;
    buttonText1: string;
    buttonText2: string;
    priceOption: number
}


const PagePriceOptionBox: React.FC<PagePriceOptionBoxProps> = ({ title, text, buttonText1,buttonText2 , onClick1, onClick2, priceOption }) => {
    return (
        <div className={styles.priceOptionBox}>
            <div className={styles.priceOptionBoxTitle}>
                {title}
            </div>
            <div className={styles.priceOptionBoxContent}>
                <div className={styles.priceOptionBoxText}>
                    {text}
                </div>
                <div className={styles.priceSVG}>
                    {priceOption === 1 && <PageSVGElement svgSrc={"price-option-one.svg"}/>}
                    {priceOption === 2 && <PageSVGElement svgSrc={"price-option-two.svg"}/>}
                    {priceOption === 3 && <PageSVGElement svgSrc={"price-option-three.svg"}/>}
                </div>
                <div className={styles.priceOptionBoxButton}>
                    <PageButton label={buttonText2} onClick={onClick2}/>
                    <PageButton label={buttonText1} onClick={onClick1}/>
                </div>
            </div>
        </div>
    );
}

export default PagePriceOptionBox;
