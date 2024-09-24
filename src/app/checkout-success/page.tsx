"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return undefined;
};

export default function Page() {
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const updatePaymentStatus = async () => {
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

            } catch (error) {
                console.error("Error updating payment status:", error);
                setErrorMessage("There was an error with your payment!");
            }
        };

        updatePaymentStatus();
    }, [router]);

    return (
        <div>
            <h1>Payment Success</h1>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}
