import React, { useState } from "react";
import styles from "../../styles/components/account/accountDeletionPopup.module.css";
import PageButton from "@/components/page/pageButton";

interface AccountDeletionPopupProps {
    onAccept: (userPW: string) => void
    onCancel: () => void
    errorMessage?: string
    setErrorMessage: (errorMessage: string) => void
}

const AccountDeletionPopup: React.FC<AccountDeletionPopupProps> = ({onAccept, onCancel, errorMessage, setErrorMessage}) => {
    const [userPW, setUserPW] = useState<string>("");
    const [userPW2, setUserPW2] = useState<string>("");
    const [confirmationPhrase, setConfirmationPhrase] = useState<string>("");
    const [showPasswordBox, setShowPasswordBox] = useState<boolean>(false);
    const [errorMessageIntern, setErrorMessageIntern] = useState<string>("");

    const onConfirmationPhraseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmationPhrase(e.target.value);
        setErrorMessageIntern("");
    }

    const checkConfirmationPhrase = () => {
        if (confirmationPhrase === "I CONFIRM THAT I WANT TO DELETE MY ACCOUNT") {
            setShowPasswordBox(true);
        } else {
            setErrorMessageIntern("Incorrect confirmation phrase");
        }
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserPW(e.target.value);
        setErrorMessageIntern("");
        setErrorMessage("");
    }

    const onPasswordChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserPW2(e.target.value);
        setErrorMessageIntern("");
        setErrorMessage("");
    }

    const onAcceptClick = () => {
        if (!showPasswordBox) {
            return;
        }
        if (confirmationPhrase === "I CONFIRM THAT I WANT TO DELETE MY ACCOUNT") {
            setShowPasswordBox(true);
        } else {
            setErrorMessageIntern("Incorrect confirmation phrase");
            return
        }

        if (userPW.length < 8) {
            setErrorMessage("Password must be at least 8 characters long");
            return
        } else if (userPW.length > 20) {
            setErrorMessage("Password must be less than 20 characters long");
            return
        }

        if (userPW2.length < 8) {
            setErrorMessage("Password must be at least 8 characters long");
            return
        } else if (userPW2.length > 20) {
            setErrorMessage("Password must be less than 20 characters long");
            return
        }

        if (userPW !== userPW2) {
            setErrorMessage("Passwords do not match");
            return
        }

        onAccept(userPW);
    }

    return (
        <div className={styles.accountDeletionPopup}>
            <div className={styles.accountDeletionPopupTitle}>
                YOU ARE ABOUT TO DELETE YOUR ACCOUNT
            </div>
            <div className={styles.accountDeletionPopupText}>
                Are you sure you want to delete your account? <br/>
                This action cannot be undone.
                <br/><br/>
                Please type the following confirmation phrase below to confirm:
                <br/>
                I CONFIRM THAT I WANT TO DELETE MY ACCOUNT
            </div>
            <div>
                <div className={styles.accountDeletionPopupInput}>
                    <input
                        type="text"
                        placeholder="Write the confirmation phrase here"
                        value={confirmationPhrase}
                        onChange={(e) => onConfirmationPhraseChange(e)}
                        className={styles.valueInput}
                    />
                    <PageButton label={"CONFIRM"} onClick={checkConfirmationPhrase}/>
                </div>
                <div>
                    {errorMessageIntern &&
                        <div className={styles.accountDeletionPopupErrorMessage}>{errorMessageIntern}</div>}
                </div>
            </div>

            {showPasswordBox && <div>
                <div className={styles.accountDeletionPopupInputPW}>
                    <input
                        type="text"
                        placeholder="Enter your password"
                        value={userPW}
                        onChange={(e) => onPasswordChange(e)}
                        className={styles.valueInput}
                    />
                    <input
                        type="text"
                        placeholder="Confirm your password"
                        value={userPW2}
                        onChange={(e) => onPasswordChange2(e)}
                        className={styles.valueInput}
                    />
                </div>
                <div>
                    {errorMessage && <div className={styles.accountDeletionPopupErrorMessage}>{errorMessage}</div>}
                </div>
            </div>}
            <div className={styles.accountDeletionPopupButtons}>
                <PageButton label={"DELETE"} onClick={onAcceptClick}/>
                <PageButton label={"CANCEL"} onClick={onCancel}/>
            </div>
        </div>
    );
}

export default AccountDeletionPopup