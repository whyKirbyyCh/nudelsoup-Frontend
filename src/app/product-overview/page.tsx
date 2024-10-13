"use client";

import React, { useEffect } from "react";
import styles from "./product-overviewPage.module.css";
import Header from "@/components/header/header";
import PageTitle from "@/components/page/pageTitle";
import ProductOverviewPageContainer from "@/components/product/productOverviewPageContainer";
import ProductAdditionPopup from "@/components/product/productAdditionPopup";
import jwt, {JwtPayload} from "jsonwebtoken";
import { useRouter } from "next/navigation";

interface Product {
    title: string;
    svgSrc: number;
    description: string;
    id: string;
}

const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return undefined;
};

export default function Page() {
    const [showAddProductMenu, setShowAddProductMenu] = React.useState(false);
    const [userId, setUserId] = React.useState<string>("-1");
    const [products, setProducts] = React.useState<Product[]>([]); // Initialize with an empty array
    const router = useRouter();

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

        const getProducts = async () => {
            if (userId === "-1") return;

            try {
                const response = await fetch(`/api/productDetails/productDetailsOverviewPage?userId=${userId}`);
                if (!response.ok) {
                    console.error("Failed to fetch products");
                    return;
                }

                const data = await response.json();
                const fetchedProducts = data.products.map((product: any) => ({
                    title: product.productTitle,
                    svgSrc: product.productIcon,
                    description: product.productDescription,
                    id: product.productId,
                }));

                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        getProducts().then();

    }, [userId, router]);

    const payingCustomerNavOptions = [
        { id: 1, label: "ORGANISATION", href: "/organisation-overview" },
        { id: 2, label: "PRODUCTS", href: "/product-overview" },
        { id: 3, label: "CAMPAIGNS", href: "/campaign-overview" },
        { id: 4, label: "ANALYTICS", href: "/analytics" },
    ];

    const addButtonClick = () => {
        setShowAddProductMenu(!showAddProductMenu);
        console.log("add product");
    };

    return (
        <div className={styles.productOverview}>
            <div>
                <Header
                    iconSize="large"
                    navOptions={payingCustomerNavOptions}
                    fontSizeVariant="large"
                    showButtons={true}
                />
            </div>
            <div className={styles.productOverviewTitle}>
                <PageTitle title="YOUR PRODUCTS" size={4} />
            </div>
            <div className={styles.productOverviewContent}>
                {showAddProductMenu && (
                    <div className={styles.productOverviewPopup}>
                        <ProductAdditionPopup
                            onClose={() => setShowAddProductMenu(false)}
                            onAddProduct={(newProduct: Product) => setProducts([...products, newProduct])}
                            userId={userId}
                        />
                    </div>
                )}
                <ProductOverviewPageContainer
                    products={products}
                    addButtonClick={addButtonClick}
                />
            </div>
        </div>
    );
}
