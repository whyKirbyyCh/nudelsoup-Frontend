"use client";

import React, { useEffect } from "react";
import styles from "../../styles/components/product/productOverviewContainer.module.css";

interface ProductOverviewContainerProps {
    svgSrc: number;
    title: string;
    description: string;
}

const ProductOverviewContainer: React.FC<ProductOverviewContainerProps> = ({ svgSrc, title, description}) => {
    const [svgLink, setSvgLink] = React.useState("/productIcons/default-project-icon.svg");

    useEffect(() => {
        if (svgSrc === 0) {
            setSvgLink("/productIcons/default-project-icon.svg")
        } else if (svgSrc === 1) {
            setSvgLink("")
        } else if (svgSrc === 2) {
            setSvgLink("")
        }
    }, []);

    const goToSettings = () => {
        console.log("go to settings")
    }

    return (
        <div className={styles.productOverviewContainer} onClick={goToSettings}>
            <div className={styles.productOverviewIconBackground}>
                <img
                    src={svgLink}
                    alt={title}
                    className={styles.productOverviewIcon}
                />
            </div>
            <div className={styles.productOverviewContent}>
                <div className={styles.productOverviewTitle}>
                    {title}
                </div>
                <div className={styles.productOverviewDescription}>
                    {description}
                </div>
            </div>
        </div>
    )
}

export default ProductOverviewContainer