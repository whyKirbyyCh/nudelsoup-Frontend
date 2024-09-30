import React from "react";
import styles from "../../styles/components/pagePricingSchemaSwap.module.css";

interface pagePricingSchemaSwapProps {
    selectorFunction: () => void
}

const PagePricingSchemaSwap: React.FC<pagePricingSchemaSwapProps> = ({ selectorFunction }) => {
    return (
        <div>
            <div className={styles.toggleWrapper}>
                <div className={styles.planText}>CHOOSE YOUR PLAN:</div>
                <span className={`${styles.toggleLabel} ${styles.monthly}`}>MONTHLY</span>
                <label className={styles.switch}>
                    <input type="checkbox" onChange={selectorFunction}/>
                    <span className={styles.slider}></span>
                </label>
                <span className={`${styles.toggleLabel} ${styles.yearly}`}>YEARLY</span>
            </div>
        </div>
    );
};

export default PagePricingSchemaSwap