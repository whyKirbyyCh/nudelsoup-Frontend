import React from "react";
import styles from "../../styles/components/account/accountCreationSavePopup.module.css";
import PageButton from "@/components/page/pageButton";

interface AccountCreationSavePopupProps {
    onClose: () => void;
    onAccept: () => void;
}

const AccountCreationSavePopup: React.FC<AccountCreationSavePopupProps> = ({onClose, onAccept}) => {
    return (
        <div className={styles.popupAgreeToTerms}>
            <div className={styles.popupAgreeToTermsTitle}>
                SAVE AND EXIT ACCOUNT SETUP
            </div>
            <div className={styles.popupAgreeToTermsText}>
                Are you sure you want to save and exit the account setup? If you did not press submit on any of your changes, they will be lost. <br/>
                You can add information later on, but the process will not be as guided as here. <br/> The more information you add, the better the results will be.
            </div>
            <div className={styles.popupAgreeToTermsButtons}>
                <PageButton label={"CONTINUE"} onClick={onAccept}/>
                <PageButton label={"BACK"} onClick={onClose}/>
            </div>
        </div>
    );
};

export default AccountCreationSavePopup;