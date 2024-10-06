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

    const [details, setDetails] = useState<Detail[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedDetails, setEditedDetails] = useState<Detail[]>([]);
    const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");
    const [errorMessageUsername, setErrorMessageUsername] = useState<string>("");

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

            const updatedUsername = editedDetails.find(detail => detail.label === 'USERNAME')?.value || '';
            const updatedEmail = editedDetails.find(detail => detail.label === 'EMAIL')?.value || '';

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

    const displayedDetails = isEditMode ? editedDetails : details;

    return (
        <div className={styles.accountOverviewContainer}>
            <div className={styles.accountName}>{accountDetails.username}</div>
            {displayedDetails.map((detail, index) => (
                <div key={index} className={styles.accountDetail}>
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
                        <PageButton label="SAVE" onClick={toggleSave} />
                        <PageButton label="CANCEL" onClick={toggleCancel} />
                    </>
                ) : (
                    <PageButton label="EDIT" onClick={toggleEditMode} />
                )}
            </div>
        </div>
    );
};

export default AccountOverviewContainer;
