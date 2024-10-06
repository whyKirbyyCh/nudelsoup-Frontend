"use client";

import React, { useEffect } from "react";
import styles from "./account-overviewPage.module.css";
import Header from "@/components/header/header";
import PageTitle from "@/components/page/pageTitle";
import AccountOverviewContainer from "@/components/account/accountOverviewContainer";
import jwt, {JwtPayload} from "jsonwebtoken";
import { useRouter } from "next/navigation";

const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return undefined;
};

export default function Page() {
    const [userId, setUserId] = React.useState<string>("");
    const router = useRouter();
    const payingCustomerNavOptions = [
        { id: 1, label: 'ORGANISATION', href: '/organisation-overview' },
        { id: 2, label: 'PRODUCTS', href: '/product-overview' },
        { id: 3, label: 'CAMPAIGNS', href: '/campaign-overview' },
        { id: 4, label: 'ANALYTICS', href: '/analytics' },
    ]

    useEffect(() => {
        const token = getCookie("authToken");
        if (!token) {
            router.push("/login");
        } else {
            const decodedToken = jwt.decode(token) as JwtPayload | null;
            if (!decodedToken || typeof decodedToken !== "object" || !decodedToken.userId) {
                router.push("/login");
            } else {
                setUserId(decodedToken.userId as string);
            }
        }
    }, []);

    return (
        <div>
            <div>
                <Header iconSize={"large"} navOptions={payingCustomerNavOptions} fontSizeVariant={"large"}/>
            </div>
            <div className={styles.accountOverviewContainer}>
                <div className={styles.accountOverviewTitle}>
                    <PageTitle title={"YOUR ACCOUNT"} size={4}/>
                </div>
                <div className={styles.accountOverviewContent}>
                    <AccountOverviewContainer userId={userId}/>
                </div>
            </div>
        </div>
    );
}