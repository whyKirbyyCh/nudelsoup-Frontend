import React from "react";
import styles from "../../styles/components/popup/popupAgreeToTerms.module.css";
import PageButton from "@/components/page/pageButton";

interface PopupAgreeToTermsProps {
    text?: string
    title?: string
    agreeToTerms?: () => void
    disagreeToTerms?: () => void
    errorMessage?: string
}

const PopupAgreeToTerms: React.FC<PopupAgreeToTermsProps> = ({title, text, disagreeToTerms, agreeToTerms, errorMessage}) => {
    return (
        <div className={styles.popupAgreeToTerms}>
            <div className={styles.popupAgreeToTermsTitle}>
                {title}
            </div>
            <div className={styles.popupAgreeToTermsText}>
                {text}
                {errorMessage && <div className={styles.popupAgreeToTermsErrorMessage}>{errorMessage}</div>}
            </div>
            <div className={styles.popupAgreeToTermsButtons}>
                <PageButton label={"DISAGREE"} onClick={disagreeToTerms}/>
                <PageButton label={"AGREE"} onClick={agreeToTerms}/>
            </div>
        </div>
    );
};

export default PopupAgreeToTerms;