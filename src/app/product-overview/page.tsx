"use client";

import React from "react";
import styles from "./product-overviewPage.module.css";
import Header from "@/components/header/header";
import PageTitle from "@/components/page/pageTitle";
import ProductOverviewPageContainer from "@/components/product/productOverviewPageContainer";
import ProductAdditionPopup from "@/components/product/productAdditionPopup";

interface Product {
    title: string;
    svgSrc: number;
    description: string;
    id: number;
}

export default function Page() {
    const [showAddProductMenu, setShowAddProductMenu] = React.useState(false);
    const [products, setProducts] = React.useState<Product[]>([
        { title: "Product 1", svgSrc: 0, description: "This is product 1", id: 1 },
        { title: "Product 2", svgSrc: 0, description: "This is product 2", id: 2 },
        { title: "Product 3", svgSrc: 0, description: "This is product 3", id: 3 },
        { title: "Product 4", svgSrc: 0, description: "This is product 4", id: 4 },
    ]);

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
