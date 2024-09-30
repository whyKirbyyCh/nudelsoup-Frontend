"use client";

import React, {useState} from "react";
import styles from "../../styles/components/pagePricingBox.module.css";
import PagePriceOptionBox from "../page/pagePriceOptionContainer";
import PageCheckoutButton from "@/components/page/pageCheckoutButton";
import PagePriceInformationBox from "@/components/page/pagePriceInformationBox";

interface PagePricingBoxProps {
    title1: string;
    text1: string;
    onClick1: () => void;
    buttonText1: string;

    title2: string;
    text2: string;
    onClick2: () => void;
    buttonText2: string;

    title3: string;
    text3: string;
    onClick3: () => void;
    buttonText3: string;

    isButtonDisabled: boolean;
    onCheckoutError: () => void;
    onCheckoutSuccess: () => void;
}

const PagePricingBox: React.FC<PagePricingBoxProps> = ({title1, text1, onClick1, buttonText1, title2, text2, onClick2, buttonText2, title3, text3, onClick3, buttonText3, isButtonDisabled, onCheckoutError, onCheckoutSuccess}) => {
    const[moreInfo, setMoreInfo] = useState(-1);

    const moreInfo1 = () => {
        setMoreInfo(1);
    }

    const moreInfo2 = () => {
        setMoreInfo(2);
    }

    const moreInfo3 = () => {
        setMoreInfo(3);
    }


    const lessInfo = () => {
        setMoreInfo(-1);
    }

    const lessInfo1 = () => {
        setMoreInfo(-1);
        onClick1();
    }

    const lessInfo2 = () => {
        setMoreInfo(-1);
        onClick2();
    }

    const lessInfo3 = () => {
        setMoreInfo(-1);
        onClick3();
    }

    return (
        <div className={styles.pricingBox}>
            <div className={styles.pricingBoxContent}>
                {moreInfo === -1 &&
                <div className={styles.pricingBoxContainer}>
                    <PagePriceOptionBox title={title1} text={text1} buttonText1={buttonText1} onClick1={onClick1} buttonText2={"MORE INFO"} onClick2={moreInfo1} priceOption={1}/>
                    <PagePriceOptionBox title={title2} text={text2} buttonText1={buttonText2} onClick1={onClick2} buttonText2={"MORE INFO"} onClick2={moreInfo2} priceOption={2}/>
                    <PagePriceOptionBox title={title3} text={text3} buttonText1={buttonText3} onClick1={onClick3} buttonText2={"MORE INFO"} onClick2={moreInfo3} priceOption={3}/>
                </div>}
                {moreInfo === 1 &&
                    <div className={styles.pricingBoxContainer}>
                        <PagePriceOptionBox title={title1} text={text1} buttonText1={buttonText1} onClick1={lessInfo1} buttonText2={"LESS INFO"} onClick2={lessInfo} priceOption={1}/>
                        <PagePriceInformationBox title={"OUR 'DINNER FOR ONE' OPTION EXPLAINED"} text={"this is text"}/>
                    </div>}
                {moreInfo === 2 &&
                    <div className={styles.pricingBoxContainer}>
                        <PagePriceOptionBox title={title2} text={text2} buttonText1={buttonText2} onClick1={lessInfo2} buttonText2={"LESS INFO"} onClick2={lessInfo} priceOption={2}/>
                        <PagePriceInformationBox title={"OUR 'FAMILY SIZED MEAL' OPTION EXPLAINED"} text={"this is text"}/>
                    </div>}
                {moreInfo === 3 &&
                    <div className={styles.pricingBoxContainer}>
                        <PagePriceOptionBox title={title3} text={text3} buttonText1={buttonText3} onClick1={lessInfo3} buttonText2={"LESS INFO"} onClick2={lessInfo} priceOption={3}/>
                        <PagePriceInformationBox title={"OUR 'DELUXE PARTY BUFFET' OPTION EXPLAINED"} text={"this is text"}/>
                    </div>}
                <div className={styles.pricingBoxButton}>
                    <PageCheckoutButton label={"TO CHECKOUT"} onClick={isButtonDisabled ? onCheckoutError : onCheckoutSuccess} />
                </div>
            </div>
        </div>
    );
};

export default PagePricingBox;
