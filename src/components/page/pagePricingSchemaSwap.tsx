import React, { useState } from "react";
import styles from "../../styles/components/pagePricingSchemaSwap.module.css";

interface PagePricingSchemaSwapProps {
    selectorFunction: () => void;
    labelLeft?: string;
    labelRight?: string;
    showText?: boolean;
    defaultState?: boolean;
    labelSize?: string;
    labelWeight?: string;
}

const PagePricingSchemaSwap: React.FC<PagePricingSchemaSwapProps> = ({selectorFunction, labelRight = "YEARLY", labelLeft = "MONTHLY", showText = true, defaultState = false, labelSize, labelWeight}) => {
    const [isChecked, setIsChecked] = useState(defaultState);

    const handleToggle = () => {
        setIsChecked(!isChecked);
        selectorFunction();
    };

    const labelStyle = {
        ...(labelSize ? { fontSize: labelSize } : {}),
        ...(labelWeight ? { fontWeight: labelWeight } : {}),
    };

    return (
        <div>
            <div className={styles.toggleWrapper}>
                {showText && <div className={styles.planText}>CHOOSE YOUR PLAN:</div>}
                <span
                    className={`${styles.toggleLabel} ${styles.monthly}`}
                    style={Object.keys(labelStyle).length ? labelStyle : undefined} // Apply style only if labelSize/Weight is provided
                >
          {labelLeft}
        </span>
                <label className={styles.switch}>
                    <input type="checkbox" checked={isChecked} onChange={handleToggle} />
                    <span className={styles.slider}></span>
                </label>
                <span
                    className={`${styles.toggleLabel} ${styles.yearly}`}
                    style={Object.keys(labelStyle).length ? labelStyle : undefined} // Apply style only if labelSize/Weight is provided
                >
          {labelRight}
        </span>
            </div>
        </div>
    );
};

export default PagePricingSchemaSwap;
