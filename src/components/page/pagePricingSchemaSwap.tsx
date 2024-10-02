import React, { useState } from "react";
import styles from "../../styles/components/pagePricingSchemaSwap.module.css";

interface pagePricingSchemaSwapProps {
    selectorFunction: () => void
    labelLeft?: string;
    labelRight?: string;
    showText?: boolean
    defaultState?: boolean;
}

const PagePricingSchemaSwap: React.FC<pagePricingSchemaSwapProps> = ({ selectorFunction, labelRight = "YEARLY", labelLeft = "MONTHLY", showText = true, defaultState = false,  }) => {
    const [isChecked, setIsChecked] = useState(defaultState);

    const handleToggle = () => {
        setIsChecked(!isChecked);
        selectorFunction();
    };
    return (
        <div>
            <div className={styles.toggleWrapper}>
                {showText && <div className={styles.planText}>CHOOSE YOUR PLAN:</div>}
                <span className={`${styles.toggleLabel} ${styles.monthly}`}>{labelLeft}</span>
                <label className={styles.switch}>
                    <input type="checkbox" checked={isChecked} onChange={handleToggle}/>
                    <span className={styles.slider}></span>
                </label>
                <span className={`${styles.toggleLabel} ${styles.yearly}`}>{labelRight}</span>
            </div>
        </div>
    );
};

export default PagePricingSchemaSwap