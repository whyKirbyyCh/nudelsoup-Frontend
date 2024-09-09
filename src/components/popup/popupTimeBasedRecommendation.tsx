import React, { useState, useEffect } from "react";
import styles from "../../styles/components/popup/popupTimeBasedRecommendation.module.css";

interface PopupTimeBasedRecommendationProps {
    title: string;
    text: string;
    time: number;
}

const PopupTimeBasedRecommendation: React.FC<PopupTimeBasedRecommendationProps> = ({ title, text, time }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, time);

        return () => clearTimeout(timer);
    }, [time]);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className={styles.popupTimeBasedRecommendation}>
            <img
                src="/popup-body.svg"
                alt="Popup Background"
                className={styles.popupImage}
            />
            <div className={styles.popupContent}>
                <button onClick={handleClose} className={styles.closeButton}>
                    &times;
                </button>
                <div className={styles.popupTimeBasedRecommendationTitle}>
                    {title}
                </div>
                <div className={styles.popupTimeBasedRecommendationText}>
                    {text}
                </div>
            </div>
        </div>
    );
};

export default PopupTimeBasedRecommendation;
