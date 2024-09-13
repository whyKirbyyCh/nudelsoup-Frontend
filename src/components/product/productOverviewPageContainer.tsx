import React from "react";
import styles from "../../styles/components/product/productOverviewPageContainer.module.css";
import PageButton from "@/components/page/pageButton";
import ProductOverviewContainer from "@/components/product/productOverviewContainer";

const ProductOverviewPageContainer: React.FC = () => {
    return (
        <div className={styles.productOverviewPageContainer}>
            <div className={styles.products}>
                <ProductOverviewContainer title={"Product 1"} svgSrc={0} description={"This is product 1"}/>
                <ProductOverviewContainer title={"Product 2"} svgSrc={0} description={"This is product 2"}/>
                <ProductOverviewContainer title={"Product 3"} svgSrc={0} description={"This is product 3"}/>
            </div>
            <div className={styles.button}>
            </div>
        </div>
    );
}

export default ProductOverviewPageContainer