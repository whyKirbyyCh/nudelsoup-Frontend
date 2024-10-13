"use client";

import React, { useEffect } from "react";
import styles from "./organisation-overviewPage.module.css";
import Header from "@/components/header/header";
import PageTitle from "@/components/page/pageTitle";
import OrganisationOverviewContainer from "@/components/organisation/organisationOverviewContainer";
import { useRouter } from "next/navigation";
import jwt, {JwtPayload} from "jsonwebtoken";

const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return undefined;
};

//TODO: add a tab with all the social media account etc. Where new ones can be generated etc. or deleted
export default function Page() {
    const [userId, setUserId] = React.useState<string>("");
    const router = useRouter();
    const payingCustomerNavOptions = [
        { id: 1, label: "ORGANISATION", href: "/organisation-overview" },
        { id: 2, label: "PRODUCTS", href: "/product-overview" },
        { id: 3, label: "CAMPAIGNS", href: "/campaign-overview" },
        { id: 4, label: "ANALYTICS", href: "/analytics" },
    ];

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
    }, [router]);

    return (
        <div className={styles.organisationOverviewContainer}>
            <div>
                <Header
                    iconSize="large"
                    navOptions={payingCustomerNavOptions}
                    fontSizeVariant="large"
                    showButtons={true}
                />
            </div>
            <div className={styles.organisationOverviewPageTitle}>
                <PageTitle title="YOUR ORGANISATION" size={4}/>
            </div>
            <div className={styles.organisationOverviewContent}>
                <OrganisationOverviewContainer userId={userId}/>
            </div>
        </div>
    );
}