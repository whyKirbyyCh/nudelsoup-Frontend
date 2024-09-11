"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

import styles from "./pricingPage.module.css";
import Header from "@/components/header/header";
import PageTitle from "@/components/page/pageTitle";
import PagePricingBox from "@/components/page/pagePricingBox";

const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return undefined;
};

export default function Page() {
    const router = useRouter();
    const navOptions = [
        { id: 1, label: "REVIEWS", href: "/reviews" },
        { id: 2, label: "FAQ", href: "/faq" },
        { id: 3, label: "CONTACT", href: "/contact" },
    ];
    const [selectedOption, setSelectedOption] = useState(-1);
    const [errorMessage, setErrorMessage] = useState("");

    const selectOption1 = () => {
        setSelectedOption(1);
        setErrorMessage("");
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
        setErrorMessage("Please select one of the options before proceeding to checkout");
    };

    const handleCheckout = () => {
        setErrorMessage("");
        if (selectedOption === -1) {
            setErrorMessage("Please select one of the options before proceeding to checkout");
        } else {
            makePaymentRequest().then();
        }
    };

    //TODO: make it that user has to create account before moving to checkout if ot logged in
    const makePaymentRequest = async () => {
        console.log("Payment request sent");

        try {
            const token = getCookie("authToken");
            if (!token) {
                setErrorMessage("User is not authenticated. Please log in.");
                return;
            }

            const decodedToken = jwt.decode(token) as JwtPayload | null;

            if (!decodedToken || typeof decodedToken !== "object" || !decodedToken.userId) {
                setErrorMessage("Invalid token or missing userId");
                return;
            }

            const userId = decodedToken.userId as string;
            const response = await fetch("/api/userPayed", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: userId, isPayingCustomer: true }),
            });

            if (!response.ok) {
                if (response.headers.get("content-type")?.includes("application/json")) {
                    const errorData = await response.json();
                    setErrorMessage(errorData.message || "There was an error with your payment!");
                } else {
                    setErrorMessage("There was an error with your payment!");
                }
                return;
            }

            router.push("/account-setup");
        } catch (error) {
            console.error("Error updating payment status:", error);
            setErrorMessage("There was an error with your payment!");
        }
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
                        onCheckoutSuccess={handleCheckout}
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
