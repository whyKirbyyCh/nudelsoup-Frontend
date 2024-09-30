"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/header/header";
import PageTitle from "@/components/page/pageTitle";
import styles from "./checout-sucessPage.module.css"

export default function Page() {
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const effectRan = useRef(false);

    const payingCustomerNavOptions = [
        { id: 1, label: 'ORGANISATION', href: '/organisation-overview' },
        { id: 2, label: 'PRODUCTS', href: '/product-overview' },
        { id: 3, label: 'CAMPAIGNS', href: '/campaign-overview' },
        { id: 4, label: 'ANALYTICS', href: '/analytics' },
    ];

    const sessionId = searchParams?.get("session_id") ?? "";

    useEffect(() => {
        if (effectRan.current) return;

        const checkSessionAndFetchData = async () => {
            if (!sessionId) {
                router.push("/pricing");
                return;
            }

            try {
                const response = await fetch(`/api/userDetails/userEmailByCheckoutSession?sessionId=${sessionId}`);

                if (!response.ok) {
                    setErrorMessage("Failed to retrieve session data.");
                    console.log(response);
                    return;
                }

                const sessionData = await response.json();

                if (sessionData.email) {
                    setEmail(sessionData.email);

                    await fetch("/api/userPayed", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userEmail: sessionData.email, isPayingCustomer: true }),
                    });

                    console.log("Email: ", sessionData.email);

                    await fetch("/api/email/sendEmail", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            to: sessionData.email,
                            subject: "Welcome to Our Service!",
                            html: "<div>Thank you for your purchase!</div>",
                        }),
                    });

                    setTimeout(() => {
                        router.push("/account-setup");
                    }, 7000);
                } else {
                    setErrorMessage("No email found in session data.");
                }

            } catch (error) {
                console.error("Error fetching session details:", error);
                setErrorMessage("There was an error with your payment.");
            }
        };

        checkSessionAndFetchData();

        effectRan.current = true; // Mark effect as run

    }, [router, sessionId]);

    return (
        <div className={styles.checkoutPage}>
            <div className={styles.checkoutPageHeader}>
                <Header
                    navOptions={payingCustomerNavOptions}
                    fontSizeVariant={"large"}
                    showButtons={true}
                    disableNavigation={false}
                    iconSize={"large"}
                />
            </div>
            <div className={styles.checkoutPageTitle}>
                <PageTitle title={"THANK YOU FOR YOUR PURCHASE"} size={4} />
            </div>
            <img
                src="/checkout-sucess.svg"
                alt="Success"
                className={styles.checkoutPageSVG}
            />
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}
