"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../../styles/components/pageLoginBox.module.css";
import PageTextField from "@/components/page/pageTextField";
import PagePasswordField from "@/components/page/pagePasswordField";
import PageButton from "@/components/page/pageButton";
import { jwtDecode } from "jwt-decode";

const PageLoginBox: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [apiErrorMessage, setApiErrorMessage] = useState("");

    interface JwtPayload {
        userId: string;
        username: string;
        isAdmin: boolean;
        isPayingCustomer: boolean;
        exp: number;
    }

    useEffect(() => {
        const checkAuthCookie = async () => {
            const cookie = document.cookie.split("; ").find(row => row.startsWith("authToken="));
            if (cookie) {
                const token = cookie.split("=")[1];
                try {
                    const decodedToken = jwtDecode<JwtPayload>(token);
                    if (decodedToken.isPayingCustomer) {
                        router.push("/account-overview");
                    } else {
                        router.push("/pricing");
                    }
                } catch (error) {
                    console.error("Failed to decode token", error);
                    router.push("/login");
                }
            }
        };

        checkAuthCookie().then();
    }, [router]);

    const handleLoginClick = async () => {
        setEmailErrorMessage("");
        setApiErrorMessage("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailErrorMessage("Please enter a valid email address.");
            return;
        }

        await makeRequest();
    };

    const makeRequest = async () => {
        try {
            const response = await fetch("/api/userLogin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "same-origin",
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");

                if (contentType?.includes("application/json")) {
                    const data = await response.json();
                    switch (response.status) {
                        case 400:
                            setApiErrorMessage("Invalid input. Please check your login details.");
                            break;
                        case 401:
                            setApiErrorMessage("Invalid credentials. Please check your password.");
                            break;
                        case 403:
                            setApiErrorMessage("Your account is not authorized to access this resource.");
                            break;
                        case 404:
                            setEmailErrorMessage("User not found. Please check your email.");
                            break;
                        case 500:
                            setApiErrorMessage("Server error. Please try again later.");
                            break;
                        case 503:
                            setApiErrorMessage("Service is temporarily unavailable. Please try again later.");
                            break;
                        default:
                            setApiErrorMessage(data.message || "An unexpected error occurred.");
                    }
                } else {
                    setApiErrorMessage("An unexpected error occurred. Please try again.");
                }
                return;
            }

            router.push("/account-overview");
        } catch (error) {
            setApiErrorMessage("An unexpected error occurred while processing your request.");
        }
    };

    return (
        <div className={styles.loginBox}>
            <div className={styles.loginTitle}>LOGIN</div>
            <div className={styles.loginBoxItem}>
                <div className={styles.loginBoxItemName}>EMAIL:</div>
                <PageTextField
                    placeholder={"Enter your email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={styles.loginBoxItem}>
                <div className={styles.loginBoxItemName}>PASSWORD:</div>
                <PagePasswordField
                    placeholder={"Enter your password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={styles.loginBoxItemButton}>
                <PageButton label={"LOGIN"} onClick={handleLoginClick} />
            </div>
            <div className={styles.loginBoxItemError}>
                {emailErrorMessage && <p>{emailErrorMessage}</p>}
                {apiErrorMessage && <p>{apiErrorMessage}</p>}
            </div>
            <div className={styles.loginBoxItemLink}>
                <Link href={"register"} className={styles.loginLink}>
                    DON&apos;T HAVE AN ACCOUNT? REGISTER HERE!
                </Link>
            </div>
        </div>
    );
};

export default PageLoginBox;
