"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const checkSessionAndFetchData = async () => {
            const sessionId = searchParams?.get("session_id") ?? "";

            if (!sessionId || sessionId === "") {
                router.push("/pricing");
                return;
            }

            try {
                const response = await fetch(`/api/userDetails/userEmailByCheckoutSession?sessionId=${sessionId}`);

                if (!response.ok) {
                    setErrorMessage("Failed to retrieve session data.");
                    console.log(response)
                    return;
                }

                const sessionData = await response.json();

                if (sessionData.email) {
                    setEmail(sessionData.email);
                    if (sessionData.email) {
                        setEmail(sessionData.email);

                        await fetch("/api/userPayed", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ userEmail: sessionData.email, isPayingCustomer: true }),
                        });

                        setTimeout(() => {
                            router.push("/account-setup");
                        }, 7000);
                    } else {
                        setErrorMessage("No email found in session data.");
                    }
                } else {
                    setErrorMessage("No email found in session data.");
                }

            } catch (error) {
                console.error("Error fetching session details:", error);
                setErrorMessage("There was an error with your payment.");
            }
        };

        checkSessionAndFetchData().then();

    }, [router, searchParams]);

    return (
        <div>
        </div>
    );
}
