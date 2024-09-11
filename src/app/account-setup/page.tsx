"use client";

import React from "react";
import Header from "@/components/header/header";
import styles from "./account-setupPage.module.css";
import AccountCreationContainer from "@/components/account/accountCreationContainer";
import PageTitle from "@/components/page/pageTitle";
import PopupAgreeToTerms from "@/components/popup/popupAgreeToTerms";

export default function Page() {
    const [agreedToTerms, setAgreedToTerms] = React.useState(false);

    const payingCustomerNavOptions = [
        { id: 1, label: 'ORGANISATION', href: '/organisation-overview' },
        { id: 2, label: 'PRODUCTS', href: '/product-overview' },
        { id: 3, label: 'ANALYTICS', href: '/analytics' },
        { id: 4, label: 'SEO', href: '/seo' },
        { id: 5, label: 'RESOURCES', href: '/resources' },
    ]

    const handleAgreeToTerms = () => {
        setAgreedToTerms(true);
    };

    const handleDisagreeToTerms = () => {
        setAgreedToTerms(false);
    };

    return (
        <div>
            <div className={styles.header}>
                <Header iconSize={"large"} navOptions={payingCustomerNavOptions} fontSizeVariant={"large"}/>
            </div>
            <div className={styles.accountCreationContent}>
                <PageTitle title={"SETUP YOUR ACCOUNT"}  size={4}/>
                {agreedToTerms && <AccountCreationContainer />}
                {!agreedToTerms && <PopupAgreeToTerms title={"TERMS OF SERVICE"} text={"To continue, you need to agree to our terms and conditions. In Switzerland, data protection laws are high and we adhere to them. By agreeing, you confirm that you have read and understood our terms and conditions."} agreeToTerms={handleAgreeToTerms} disagreeToTerms={handleDisagreeToTerms} />}
            </div>
        </div>
    );
}