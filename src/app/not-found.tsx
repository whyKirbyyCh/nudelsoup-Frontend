"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./not-found.module.css";
import Header from "@/components/header/header";

export default function Page() {
    const router = useRouter();

    const navOptions = [
        { id: 1, label: "REVIEWS", href: "/reviews" },
        { id: 2, label: "FAQ", href: "/faq" },
        { id: 3, label: "PRICING", href: "/pricing" },
        { id: 4, label: "CONTACT", href: "/contact" },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/");
        }, 10000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className={styles.notFoundPage}>
            <div className={styles.header}>
                <Header iconSize={"large"} navOptions={navOptions} fontSizeVariant={"large"}/>
            </div>
            <img
                src="/not-found.svg"
                alt="Not Found"
                className={styles.notFoundImage}
            />
        </div>
    );
}
