"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { loadStripe } from "@stripe/stripe-js";

import styles from "./pricingPage.module.css";
import Header from "@/components/header/header";
import PageTitle from "@/components/page/pageTitle";
import PagePricingBox from "@/components/page/pagePricingBox";
import PagePricingSchemaSwap from "@/components/page/pagePricingSchemaSwap";

//should work now

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
    throw new Error("Stripe public key is not set in environment variables");
}

const stripePromise = loadStripe(stripePublicKey);

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
    const [isYearlySelected, setIsYearlySelected] = useState(false);

    useEffect(() => {
        const updateAuthCookie = async () => {
            try {
                const response = await fetch("/api/cookies/updateAuthCookie", {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    console.error("Failed to update auth cookie");
                } else {
                    const data = await response.json();
                    console.log(data.message);
                }
            } catch (error) {
                console.error("Error updating auth cookie:", error);
            }
        };

        updateAuthCookie();
    }, []);

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
            makePaymentRequest(selectedOption).then();
        }
    };

    const schemaChange = () => {
        setIsYearlySelected(!isYearlySelected)
    }

    const getCustomerEmail = async (userId: string) => {
        try {
            const response = await fetch(`/api/userDetails/userEmailById?userId=${userId}`);
            if (!response.ok) {
                return
            }
            const data = await response.json();
            return data.email;
        } catch (error) {
            console.error("Error fetching customer email:", error);
            setErrorMessage("There was an error retrieving customer email.");
            return null;
        }
    };

    const makePaymentRequest = async (option: number) => {
        console.log("Payment request sent");

        try {
            const token = getCookie("authToken");

            if (!token) {
                setErrorMessage("User is not authenticated. Please log in.");
                router.push("/login");
                return;
            }

            const decodedToken = jwt.decode(token) as JwtPayload | null;

            if (!decodedToken || typeof decodedToken !== "object" || !decodedToken.userId) {
                setErrorMessage("Invalid token or missing userId");
                router.push("/login");
                return;
            }

            if (decodedToken.isPayingCustomer) {
                setErrorMessage(
                    "Account already has an active subscription. Please go to Settings to change or cancel your plan."
                );
                //return;
            }

            const customerEmail = await getCustomerEmail(decodedToken.userId);
            if (!customerEmail) {
                return;
            }

            let priceId;
            if (isYearlySelected) {
                if (option === 1) priceId = "price_1Q2QBj08drlwCs6aDl3flY9N";
                else if (option === 2) priceId = "price_1Q2Q9O08drlwCs6aHJFwQMKc";
                else if (option === 3) priceId = "price_1Q1UEn08drlwCs6aFmwjFxJI";
            } else {
                if (option === 1) priceId = "price_1Q1TW908drlwCs6ax12Ghvy6";
                else if (option === 2) priceId = "price_1Q1TWT08drlwCs6aGgJQRbuk";
                else if (option === 3) priceId = "price_1Q1TWi08drlwCs6aJEvcKVCK";
            }

            if (!priceId) {
                setErrorMessage("Invalid pricing option selected");
                return;
            }

            const response = await fetch("/api/stripeCheckoutSession", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    priceId,
                    email: customerEmail,
                }),
            });

            if (!response.ok) {
                setErrorMessage("Failed to create checkout session");
                return;
            }

            const { sessionId } = await response.json();

            const stripe = await stripePromise;
            if (stripe) {
                const { error } = await stripe.redirectToCheckout({ sessionId });
                if (error) {
                    console.error("Stripe Checkout error:", error);
                    setErrorMessage("Please refresh the page!");
                }
            }
        } catch (error) {
            console.error("Error during payment request:", error);
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
                    <PageTitle title={"CHOOSE YOUR MEAL SIZE*"} size={4}/>
                    <div className={styles.pricingBoxSubtitle}>*if you are still hungry you can always order more</div>
                </div>
                <div className={styles.pricingSwapContainer}>
                    <PagePricingSchemaSwap selectorFunction={schemaChange}/>
                </div>

                <div className={styles.pricingContent}>
                    {!isYearlySelected &&
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
                    }
                    {isYearlySelected &&
                        <PagePricingBox
                            title1={"DINNER FOR ONE"}
                            text1={"This is yearly text"}
                            title2={"FAMILY SIZED MEAL"}
                            text2={"This is yearly text"}
                            title3={"DELUXE PARTY BUFFET"}
                            text3={"This is yearly text"}
                            buttonText1={"SELECT"}
                            buttonText2={"SELECT"}
                            buttonText3={"SELECT"}
                            onClick1={selectOption1}
                            onClick2={selectOption2}
                            onClick3={selectOption3}
                            isButtonDisabled={selectedOption === -1}
                            onCheckoutError={handleCheckoutError}
                            onCheckoutSuccess={handleCheckout}
                            yearly1={true}
                            yearly2={true}
                            yearly3={true}
                        />
                    }
                    {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                    {selectedOption === 1 && <div className={styles.decorativeCircle}></div>}
                    {selectedOption === 2 && <div className={styles.decorativeCircle2}></div>}
                    {selectedOption === 3 && <div className={styles.decorativeCircle3}></div>}
                </div>
            </div>
        </div>
    );
}
