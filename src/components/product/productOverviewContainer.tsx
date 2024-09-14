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
            setSvgLink("productIcons/ai-project-icon.svg")
        } else if (svgSrc === 2) {
            setSvgLink("productIcons/configuration-project-icon.svg")
        } else if (svgSrc === 3) {
            setSvgLink("productIcons/data-project-icon.svg")
        }else if (svgSrc === 4) {
            setSvgLink("productIcons/database-project-icon.svg")
        }else if (svgSrc === 5) {
            setSvgLink("productIcons/ecommerce-project-icon.svg")
        }else if (svgSrc === 6) {
            setSvgLink("productIcons/networking-project-icon.svg")
        } else if (svgSrc === 7) {
            setSvgLink("productIcons/video-project-icon.svg")
        }else {
            setSvgLink("/productIcons/default-project-icon.svg")
        }
    }, []);

    const goToSettings = () => {
        console.log("Go to settings")
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