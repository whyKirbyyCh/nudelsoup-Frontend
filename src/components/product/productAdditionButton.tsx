"use client";

import React from "react";
import styles from "../../styles/components/product/productAdditionButton.module.css";
import Image from "next/image";


interface ProductAdditionButtonProps {
    onClick: () => void;
}

const ProductAdditionButton: React.FC<ProductAdditionButtonProps> = ({ onClick }) => {
    return (
        <div className={styles.productAdditionButton} onClick={onClick} role={"button"} tabIndex={0} aria-label={"add product"}>
            <Image
                src={"/add-product.svg"}
                alt={"add product"}
                className={styles.productAdditionIcon}
            />
        </div>
    );
};

export default ProductAdditionButton;