"use client";

import React, { useEffect } from "react";
import Header from "@/components/header/header";
import styles from "./account-setupPage.module.css";
import AccountCreationContainer from "@/components/account/accountCreationContainer";
import PageTitle from "@/components/page/pageTitle";
import PopupAgreeToTerms from "@/components/popup/popupAgreeToTerms";
import jwt, {JwtPayload} from "jsonwebtoken";

const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return undefined;
};

export default function Page() {
    const [agreedToTerms, setAgreedToTerms] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const payingCustomerNavOptions = [
        { id: 1, label: 'ORGANISATION', href: '/organisation-overview' },
        { id: 2, label: 'PRODUCTS', href: '/product-overview' },
        { id: 3, label: 'CAMPAIGNS', href: '/campaign-overview' },
        { id: 4, label: 'ANALYTICS', href: '/analytics' },
    ]

    useEffect(() => {
        const checkAgreedToTerms = () => {
            const token = getCookie("authToken");
            if (!token) {
                setErrorMessage("User is not authenticated. Please log in.");
                return;
            }

            const decodedToken = jwt.decode(token) as JwtPayload | null;

            if (
                !decodedToken ||
                typeof decodedToken !== "object" ||
                !decodedToken.userId
            ) {
                setErrorMessage("Invalid token or missing userId");
                return;
            }

            if (decodedToken.isAgreed) {
                setAgreedToTerms(true);
            }

        };

        checkAgreedToTerms();
    }, []);

    const handleAgreeToTerms = () => {
        setAgreedToTerms(true);
        makeAgreeToTermsRequest(true).then();
    };

    const handleDisagreeToTerms = () => {
        setAgreedToTerms(false);
        makeAgreeToTermsRequest(false).then();
    };

    const makeAgreeToTermsRequest = async (value: boolean) => {

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

            await fetch('/api/userAgreed', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId, isAgreed: value }),
            });
        } catch (error) {
            setErrorMessage("Something went wrong. Please try");
            setAgreedToTerms(false)
        }
    }

    return (
        <div>
            <div className={styles.header}>
                <Header iconSize={"large"} navOptions={payingCustomerNavOptions} fontSizeVariant={"large"}/>
            </div>
            <div className={styles.accountCreationContent}>
                <PageTitle title={"SETUP YOUR ACCOUNT"}  size={4}/>
                {agreedToTerms && <AccountCreationContainer />}
                {!agreedToTerms && <PopupAgreeToTerms title={"TERMS OF SERVICE"} text={"To continue, you need to agree to our terms and conditions. In Switzerland, data protection laws are high and we adhere to them. By agreeing, you confirm that you have read and understood our terms and conditions."} agreeToTerms={handleAgreeToTerms} disagreeToTerms={handleDisagreeToTerms} errorMessage={errorMessage} />}
            </div>
        </div>
    );
}