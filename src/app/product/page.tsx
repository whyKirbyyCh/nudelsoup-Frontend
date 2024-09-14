"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./productPage.module.css";

export default function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams?.get("id");

    useEffect(() => {
        if (!id) {
            router.push("/product-overview");
        }
    }, [id, router]);

    return (
        <div className={styles.container}>
            <h1>Product Page {id || "ID not found"}</h1>
        </div>
    );
}
