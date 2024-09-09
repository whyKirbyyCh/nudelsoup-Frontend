"use client"

import React, { useState } from "react";
import styles from "./pricingPage.module.css";
import Header from "@/components/header/header";
import PageTitle from "@/components/page/pageTitle";
import PagePricingBox from "@/components/page/pagePricingBox";

export default function Page() {
    const navOptions = [
        { id: 1, label: "REVIEWS", href: "/reviews" },
        { id: 2, label: "FAQ", href: "/faq" },
        { id: 3, label: "CONTACT", href: "/contact" },
    ];
    const [selectedOption, setSelectedOption] = useState(-1);
    const [errorMessage, setErrorMessage] = useState("");

    const selectOption1 = () => {
        setSelectedOption(1);
        setErrorMessage(""); // Clear error message when selecting an option
    };

    const selectOption2 = () => {
        setSelectedOption(2);
        setErrorMessage("");
    };

    const selectOption3 = () => {
        setSelectedOption(3);
        setErrorMessage("");
    };

    const handleCheckoutError = () => {
        setErrorMessage("Please select a one of the options before proceeding to checkout");
        console.log("Please select a one of the options first");
    };

    return (
        <div className={styles.container}>
            <Header
                iconSize={"large"}
                navOptions={navOptions}
                fontSizeVariant={"large"}
                showButtons={true}
            />
            <div className={styles.pricingContentWrapper}>
                <div className={styles.pricingContentTitle}>
                    <PageTitle title={"CHOOSE YOUR MEAL SIZE*"} size={4} />
                </div>
                <div className={styles.pricingContent}>
                    <PagePricingBox
                        title1={"DINNER FOR ONE"}
                        text1={"This is text"}
                        title2={"FAMILY SIZED MEAL"}
                        text2={"This is text"}
                        title3={"DELUXE PARTY BUFFET"}
                        text3={"This is text"}
                        buttonText1={"SELECT"}
                        buttonText2={"SELECT"}
                        buttonText3={"SELECT"}
                        onClick1={selectOption1}
                        onClick2={selectOption2}
                        onClick3={selectOption3}
                        isButtonDisabled={selectedOption === -1}
                        onCheckoutError={handleCheckoutError}
                    />
                    {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                    {selectedOption === 1 && <div className={styles.decorativeCircle}></div>}
                    {selectedOption === 2 && <div className={styles.decorativeCircle2}></div>}
                    {selectedOption === 3 && <div className={styles.decorativeCircle3}></div>}
                </div>
            </div>
        </div>
    );
}
