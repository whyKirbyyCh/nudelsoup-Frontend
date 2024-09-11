"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

import styles from "../../styles/components/pageRegisterBox.module.css";
import PageTextField from "@/components/page/pageTextField";
import PagePasswordField from "@/components/page/pagePasswordField";
import PageButton from "@/components/page/pageButton";

const PageRegisterBox: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
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

    const handleRegisterClick = async () => {
        setPasswordErrorMessage("");
        setEmailErrorMessage("");
        setUsernameErrorMessage("");
        setApiErrorMessage("");

        if (!email || email.trim() === "") {
            setEmailErrorMessage("Please enter an email address");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailErrorMessage("Please enter a valid email address");
            return;
        }

        if (!username || username.trim() === "") {
            setUsernameErrorMessage("Please enter a username");
            return;
        }

        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!usernameRegex.test(username)) {
            setUsernameErrorMessage("Username can only contain letters and numbers");
            return;
        }

        if (password !== confirmPassword) {
            setPasswordErrorMessage("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setPasswordErrorMessage("Password must be at least 8 characters long");
            return;
        }

        if (password.length > 20) {
            setPasswordErrorMessage("Password must be less than 20 characters long");
            return;
        }

        const hasNumber = /\d/.test(password);
        if (!hasNumber) {
            setPasswordErrorMessage("Password must contain at least one number");
            return;
        }

        try {
            await makeRequest();

        } catch (error) {
            setApiErrorMessage("There was an error registering your account. Please try again.");
        }

    };

    const makeRequest = async () => {
        try {
            const response = await fetch("/api/userRegister", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                if (response.headers.get("content-type")?.includes("application/json")) {
                    return;
                } else {
                    setApiErrorMessage("There was an error registering your account. Please try again.");
                }
                return;
            }

            router.push("/pricing");
        } catch (error) {
            setApiErrorMessage("There was an error registering your account. Please try again.");
        }
    };

    return (
        <div className={styles.registerBox}>
            <div className={styles.registerTitle}>
                REGISTER
            </div>
            <div className={styles.registerBoxItem}>
                <div className={styles.registerBoxItemName}>
                    EMAIL:
                </div>
                <PageTextField placeholder={"Enter your email"} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={styles.registerBoxItem}>
                <div className={styles.registerBoxItemName}>
                    USERNAME:
                </div>
                <PageTextField placeholder={"Enter your username"} value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className={styles.registerBoxItem}>
                <div className={styles.registerBoxItemName}>
                    PASSWORD:
                </div>
                <PagePasswordField placeholder={"Enter your password"} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={styles.registerBoxItem}>
                <div className={styles.registerBoxItemName}>
                    CONFIRM:
                </div>
                <PagePasswordField placeholder={"Confirm your password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className={styles.registerBoxItemButton}>
                <PageButton label={"REGISTER"} onClick={handleRegisterClick} />
            </div>
            <div className={styles.registerBoxItemError}>
                {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
                {emailErrorMessage && <p>{emailErrorMessage}</p>}
                {usernameErrorMessage && <p>{usernameErrorMessage}</p>}
                {apiErrorMessage && <p>{apiErrorMessage}</p>}
            </div>
            <div className={styles.registerBoxItemLink}>
                <Link href={"login"} className={styles.loginLink}>
                    ALREADY HAVE AN ACCOUNT? LOGIN HERE!
                </Link>
            </div>
        </div>
    );
};

export default PageRegisterBox;
