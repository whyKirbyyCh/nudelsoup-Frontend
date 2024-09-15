import React from "react";
import styles from "../../styles/components/product/productDetailsContainer.module.css";

interface ProductDetailsContainerProps {
    productId: string;
}

const ProductDetailsContainer: React.FC<ProductDetailsContainerProps> = () => {
    return (
        <div className={styles.productDetailsContainer}>
            PRODUCT DETAIsLS
        </div>
    );
};

export default ProductDetailsContainer;