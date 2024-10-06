import React, { useEffect, useState } from "react";
import styles from "../../styles/components/account/accountOverviewContainer.module.css";
import PageButton from "@/components/page/pageButton";

interface AccountOverviewContainerProps {
    userId: string;
}

interface AccountDetails {
    userId: string;
    email?: string;
    username?: string;
    isVerified?: boolean;
    priceId?: string;
    createdAt?: string;
    subscriptionEndDate?: string;
    subscriptionStartDate?: string;
}

interface Detail {
    label: string;
    value: string;
}

const AccountOverviewContainer: React.FC<AccountOverviewContainerProps> = ({userId}) => {
    const [accountDetails, setAccountDetails] = useState<AccountDetails>({
        userId: userId.toString(),
    });
    const [activeTab, setActiveTab] = useState("DETAILS");
    const [details, setDetails] = useState<Detail[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedDetails, setEditedDetails] = useState<Detail[]>([]);
    const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");
    const [errorMessageUsername, setErrorMessageUsername] = useState<string>("");

    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [passwordSuccess, setPasswordSuccess] = useState<string>("");
    const [cancelSubscriptionError, setCancelSubscriptionError] = useState<string>("");
    const [cancelSubscriptionSuccess, setCancelSubscriptionSuccess] = useState<string>("");

    useEffect(() => {
        if (
            !userId ||
            userId.trim() === "" ||
            userId === "undefined" ||
            userId === "null"
        ) {
            return;
        }

        const fetchAccountDetails = async () => {
            try {
                const response = await fetch(
                    `/api/userDetails/userDetailsByUserId?userId=${userId}`,
                    {
                        method: "GET",
                    }
                );

                const result = await response.json();

                if (response.ok) {
                    const accountData: AccountDetails = {
                        userId: result.userId,
                        email: result.email,
                        username: result.username,
                        isVerified: result.isVerified,
                        priceId: result.priceId,
                        createdAt: result.createdAt,
                        subscriptionEndDate: result.subscriptionEndDate,
                        subscriptionStartDate: result.subscriptionStartDate,
                    };
                    setAccountDetails(accountData);

                    const initialDetails: Detail[] = [
                        { label: "USERNAME", value: accountData.username || "" },
                        { label: "EMAIL", value: accountData.email || "" },
                        {
                            label: "IS VERIFIED",
                            value: accountData.isVerified ? "Yes" : "No",
                        },
                        {
                            label: "PLAN",
                            value: getPlanName(accountData.priceId),
                        },
                        {
                            label: "CREATED AT",
                            value: accountData.createdAt
                                ? formatDate(accountData.createdAt)
                                : "",
                        },
                        {
                            label: "SUBSCRIPTION START DATE",
                            value: accountData.subscriptionStartDate
                                ? formatDate(accountData.subscriptionStartDate)
                                : "",
                        },
                        {
                            label: "SUBSCRIPTION END DATE",
                            value: accountData.subscriptionEndDate
                                ? formatDate(accountData.subscriptionEndDate)
                                : "",
                        },
                    ];

                    setDetails(initialDetails);
                } else {
                    console.log(`Error: ${result.message}`);
                    return;
                }
            } catch (error) {
                return;
            }
        };

        fetchAccountDetails().then();
    }, [userId]);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const first = date.getDate().toString().padStart(2, "0");
        const second = (date.getMonth() + 1).toString().padStart(2, "0");
        const third = date.getFullYear().toString();

        return `${first}.${second}.${third}`;
    };

    const getPlanName = (priceId: string | undefined): string => {
        const planMapping: { [key: string]: string } = {
            price_1Q2QBj08drlwCs6aDl3flY9N: "DINNER FOR ONE - YEARLY",
            price_1Q2Q9O08drlwCs6aHJFwQMKc: "FAMILY SIZED MEAL - YEARLY",
            price_1Q1UEn08drlwCs6aFmwjFxJI: "DELUXE PARTY BUFFET - YEARLY",
            price_1Q1TW908drlwCs6ax12Ghvy6: "DINNER FOR ONE - MONTHLY",
            price_1Q1TWT08drlwCs6aGgJQRbuk: "FAMILY SIZED MEAL - MONTHLY",
            price_1Q1TWi08drlwCs6aJEvcKVCK: "DELUXE PARTY BUFFET - MONTHLY",
        };

        return priceId && planMapping[priceId]
            ? planMapping[priceId]
            : "Unknown plan, please contact support!";
    };

    const toggleEditMode = () => {
        setIsEditMode(true);
        setEditedDetails(JSON.parse(JSON.stringify(details)));
    };

    const toggleSave = async () => {
        const updatedUsername = editedDetails.find(detail => detail.label === 'USERNAME')?.value || '';
        const updatedEmail = editedDetails.find(detail => detail.label === 'EMAIL')?.value || '';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(updatedEmail)) {
            setErrorMessageEmail("Please enter a valid email address");
            return;
        } else {
            setErrorMessageEmail("");
        }

        if (!updatedUsername || updatedUsername.trim() === "") {
            setErrorMessageUsername("Please enter a username");
            return;
        } else {
            setErrorMessageUsername("");
        }

        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!usernameRegex.test(updatedUsername)) {
            setErrorMessageUsername("Username can only contain letters and numbers");
            return;
        } else {
            setErrorMessageUsername("");
        }

        try {
            if (!userId || userId.trim() === "" || userId === "undefined" || userId === "null") {
                console.log("Error: userId is undefined or null");
                return;
            }

            setAccountDetails(prevDetails => ({
                ...prevDetails,
                username: updatedUsername,
                email: updatedEmail,
            }));

            const payload = {
                userId: userId,
                username: updatedUsername,
                email: updatedEmail,
            };

            const response = await fetch(`/api/userDetails/userSetDetails`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setIsEditMode(false);
                setErrorMessageEmail("");
                setErrorMessageUsername("");
                setDetails(editedDetails);
            } else if (response.status === 409) {
                setErrorMessageUsername("Username is already taken.");
            } else if (response.status === 408) {
                setErrorMessageEmail("Email is already taken.");
            } else {
                return
            }
        } catch (error) {
            return
        }
    };

    const toggleCancel = () => {
        setIsEditMode(false);
        setEditedDetails([]);
        setErrorMessageEmail("");
        setErrorMessageUsername("");
    };

    const handleDetailChange = (index: number, newValue: string) => {
        const updatedDetails = [...editedDetails];
        updatedDetails[index].value = newValue;
        setEditedDetails(updatedDetails);
    };

    const handlePasswordChange = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError("All fields are required.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
            return;
        }

        if (newPassword.length > 20) {
            setPasswordError("Password must be less than 20 characters long.");
            return;
        }

        const hasNumber = /\d/.test(newPassword);
        if (!hasNumber) {
            setPasswordError("Password must contain at least one number.");
            return;
        }

        try {
            const payload = {
                userId: userId,
                oldPassword: currentPassword,
                newPassword: newPassword,
            };

            const response = await fetch(`/api/userDetails/userChangePassword`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setPasswordError("");
                setPasswordSuccess("Password changed successfully.");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                setPasswordError("Failed to change password. Please try again.");
            }
        } catch (error) {
            setPasswordError("An error occurred. Please try again.");
        }
    };

    const handlePasswordInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
        setter(value);
        setPasswordError("");
    };

    const handleCancelSubscription = async () => {
        try {
            const payload = {
                userId: userId,
            }

            const response = await fetch(`/api/subscription/subscriptionCancel`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setCancelSubscriptionSuccess("Subscription canceled successfully.");
                const data = await response.json();

                const email = data.email;

                try {
                    await fetch("/api/email/sendEmail", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            from: "goodbye@nudelsoup.com",
                            to: email,
                            subject: "Your Nudelsoup subscription has been canceled",
                            html: "<div>Thank you for your trust!</div>",
                        }),
                    });
                } catch (error) {
                    setCancelSubscriptionError("Failed to send email. Please contact support: support@nudelsoup.com if you need a bill");
                }
            } else {
                setCancelSubscriptionError("Failed to cancel subscription. Please try again or contact support: support@nudelsoup.com");
            }
        } catch (error) {

        }
    }

    const displayedDetails = isEditMode ? editedDetails : details;

    return (
        <div className={styles.accountOverviewContainer}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === "DETAILS" ? styles.active : ""}`}
                    onClick={() => setActiveTab("DETAILS")}
                >
                    DETAILS
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "ACTIONS" ? styles.active : ""}`}
                    onClick={() => setActiveTab("ACTIONS")}
                >
                    ACTIONS
                </button>
            </div>

            {activeTab === "DETAILS" && (
                <div className={styles.tabContent}>
                    <div className={styles.accountName}>{accountDetails.username} DETAILS</div>
                    {displayedDetails.map((detail, index) => (
                        <div
                            key={index}
                            className={`${styles.accountDetail} ${((detail.label === "USERNAME" && errorMessageUsername) || (detail.label === "EMAIL" && errorMessageEmail)) ? styles.alignStart : ""}`}
                        >
                            <div className={styles.label}>{detail.label}:</div>
                            {isEditMode && (detail.label === "USERNAME" || detail.label === "EMAIL") ? (
                                <>
                                    <div className={styles.inputContainer}>
                                        <input
                                            type="text"
                                            value={detail.value}
                                            onChange={(e) => handleDetailChange(index, e.target.value)}
                                            className={styles.valueInput}
                                        />
                                        {detail.label === "USERNAME" && errorMessageUsername && (
                                            <div className={styles.errorMessage}>{errorMessageUsername}</div>
                                        )}
                                        {detail.label === "EMAIL" && errorMessageEmail && (
                                            <div className={styles.errorMessage}>{errorMessageEmail}</div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className={styles.value}>{detail.value}</div>
                            )}
                        </div>
                    ))}

                    <div className={styles.buttonsContainer}>
                        {isEditMode ? (
                            <>
                                <PageButton label="SAVE" onClick={toggleSave}/>
                                <PageButton label="CANCEL" onClick={toggleCancel}/>
                            </>
                        ) : (
                            <PageButton label="EDIT" onClick={toggleEditMode}/>
                        )}
                    </div>
                </div>
            )}

            {activeTab === "ACTIONS" && (
                <div className={styles.tabContent}>
                    <div className={styles.changePasswordContainer}>
                        <div className={styles.actionTitle}>CHANGE YOUR PASSWORD</div>
                        <div className={styles.accountDetail}>
                            <div className={styles.label}>CURRENT:</div>
                            <input
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => handlePasswordInputChange(setCurrentPassword, e.target.value)}
                                className={styles.valueInput}
                            />
                        </div>
                        <div className={styles.accountDetail}>
                            <div className={styles.label}>NEW:</div>
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => handlePasswordInputChange(setNewPassword, e.target.value)}
                                className={styles.valueInput}
                            />
                        </div>
                        <div className={styles.accountDetail}>
                            <div className={styles.label}>REPEAT:</div>
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => handlePasswordInputChange(setConfirmPassword, e.target.value)}
                                className={styles.valueInput}
                            />
                        </div>
                        {passwordError && (
                            <div className={styles.errorMessage}>{passwordError}</div>
                        )}
                        {passwordSuccess && (
                            <div className={styles.successMessage}>{passwordSuccess}</div>
                        )}
                        <PageButton label="CHANGE PASSWORD" onClick={handlePasswordChange}/>
                    </div>
                    <div className={styles.changePasswordContainer}>
                        <div className={styles.actionTitle}>CANCEL YOUR SUBSCRIPTION</div>
                        <div className={styles.infoText}>
                            Once you cancel your subscription, you will be able to access your account and use nudelsoup
                            until the end of your current subscription.
                            <br/><br/>
                            After the end of your subscription, your data will be saved but you will no longer be able
                            to access your account. If you decide to subscribe again, you will have access to everything
                            as before.
                            <br/><br/>
                            You can, as long as you are subscribed, export all the data your account has access to,
                            under the analytics tab.
                            <br/><br/>
                            If you have any feedback, suggestions or questions, please contact support:
                            support@nudelsoup.com
                            <br/><br/>
                            Thank you for using nudelsoup. - nudelsoup dev team
                        </div>
                        {cancelSubscriptionError && (
                            <div className={styles.errorMessage}>{cancelSubscriptionError}</div>
                        )}
                        {cancelSubscriptionSuccess && (
                            <div className={styles.successMessage}>{cancelSubscriptionSuccess}</div>
                        )}
                        <PageButton label="CANCEL SUBSCRIPTION" onClick={handleCancelSubscription}/>
                    </div>
                    <div className={styles.changePasswordContainer}>
                        <div className={styles.actionTitle}>CHANGE YOUR SUBSCRIPTION</div>
                    </div>
                    <div className={styles.changePasswordContainer}>
                        <div className={styles.actionTitle}>DELETE YOUR ACCOUNT</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountOverviewContainer;