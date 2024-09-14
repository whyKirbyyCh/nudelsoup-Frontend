"use client";

import React from "react";
import styles from "../../styles/components/product/productOverviewPageContainer.module.css";
import ProductOverviewContainer from "@/components/product/productOverviewContainer";
import ProductAdditionButton from "@/components/product/productAdditionButton";

interface Product {
    title: string;
    svgSrc: number;
    description: string;
    id: number;
}

interface ProductOverviewPageContainerProps {
    products: Product[];
    addButtonClick: () => void;
}

const ProductOverviewPageContainer: React.FC<ProductOverviewPageContainerProps> = ({ products, addButtonClick }) => {
    return (
        <div className={styles.productOverviewPageContainer}>
            <div className={styles.products}>
                {products.map((product, index) => (
                    <ProductOverviewContainer
                        key={index}
                        title={product.title}
                        svgSrc={product.svgSrc}
                        description={product.description}
                        id={product.id}
                    />
                ))}
                <ProductAdditionButton key="product-addition-button" onClick={addButtonClick}/>
            </div>
        </div>
    );
};

export default ProductOverviewPageContainer;
