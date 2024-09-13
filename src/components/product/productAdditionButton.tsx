"use client";

import React from "react";
import styles from "../../styles/components/product/productAdditionButton.module.css";


interface ProductAdditionButtonProps {
    onClick: () => void;
}

const ProductAdditionButton: React.FC<ProductAdditionButtonProps> = ({ onClick }) => {
    return (
        <div className={styles.productAdditionButton} onClick={onClick}>
            <img
                src={"/add-product.svg"}
                alt={"add product"}
                className={styles.productAdditionIcon}
            />
        </div>
    );
};

export default ProductAdditionButton;