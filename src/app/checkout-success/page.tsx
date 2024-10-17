"use client";
//

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/header";
import PageTitle from "@/components/page/pageTitle";
import styles from "./checout-sucessPage.module.css"
import PurchaseConfirmationEmail from "@/components/mail/purchaseConfirmationEmail";

export default function Page() {
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [sessionId, setSessionId] = useState<string | null>(null);
    const router = useRouter();
    const effectRan = useRef(false);

    const payingCustomerNavOptions = [
        { id: 1, label: "ORGANISATION", href: "/organisation-overview" },
        { id: 2, label: "PRODUCTS", href: "/product-overview" },
        { id: 3, label: "CAMPAIGNS", href: "/campaign-overview" },
        { id: 4, label: "ANALYTICS", href: "/analytics" },
    ];

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const session_id = searchParams.get("session_id") ?? "";

        if (effectRan.current || !session_id) return;

        setSessionId(session_id);

        const checkSessionAndFetchData = async () => {
            if (!session_id) {
                router.push("/pricing");
                return;
            }

            try {
                const response = await fetch(`/api/userDetails/userEmailByCheckoutSession?sessionId=${session_id}`);

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
                    const htmlMail = PurchaseConfirmationEmail({ name: 'Tim' });

                    await fetch("/api/email/sendEmail", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            from: "hello@nudelsoup.com",
                            to: sessionData.email,
                            subject: "Welcome to Our Service!",
                            html: htmlMail,
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

        checkSessionAndFetchData().then();

        effectRan.current = true;
    }, [router]);

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
