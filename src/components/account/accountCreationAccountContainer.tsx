import React, { useState, useEffect } from "react";
import styles from "../../styles/components/account/accountCreationAccountContainer.module.css";
import PageButton from "@/components/page/pageButton";

interface AccountCreationAccountContainerProps {
    userId: number;
    onSubmit: () => void;
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

const AccountCreationAccountContainer: React.FC<AccountCreationAccountContainerProps> = ({ userId, onSubmit }) => {
    const [accountDetails, setAccountDetails] = useState<AccountDetails>({
        userId: userId.toString(),
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAccountDetails = async () => {
            console.log(`Fetching account details for userId: ${userId}`);
            try {
                const response = await fetch(`/api/userDetails/userDetailsByUserId?userId=${userId}`, {
                    method: "GET",
                });

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
                } else {
                    setError(result.message);
                }
            } catch (error) {
                setError("Network error occurred while fetching account details.");
            } finally {
                setLoading(false);
            }
        };

        fetchAccountDetails().then();
    }, [userId]);

    const handleSubmit = async () => {
        onSubmit();
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();

        return `${day}.${month}.${year}`;
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

        return priceId && planMapping[priceId] ? planMapping[priceId] : "Unknown plan, please contact support!";
    };

    if (loading) {
        return <div className={styles.loading}>Loading account details...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error}</div>;
    }

    return (
        <div className={styles.accountInfoContainer}>
            <div className={styles.accountInfoContainerHeader}>
                <div className={styles.accountInfoContainerTitle}>ACCOUNT INFORMATION</div>
                <div className={styles.accountInfoContainerDescription}>
                    Before continuing, please make sure that all the required information is correct. If so click the
                    &quot;SUBMIT&quot; button.
                </div>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                    EMAIL:
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={accountDetails.email || ""}
                    className={styles.valueInput}
                    readOnly
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="username" className={styles.label}>
                    USERNAME:
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={accountDetails.username || ""}
                    className={styles.valueInput}
                    readOnly
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="isVerified" className={styles.label}>
                    VERIFIED:
                </label>
                <input
                    type="checkbox"
                    id="isVerified"
                    name="isVerified"
                    checked={accountDetails.isVerified || false}
                    className={styles.checkboxInput}
                    disabled
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="priceId" className={styles.label}>
                    PLAN:
                </label>
                <input
                    type="text"
                    id="priceId"
                    name="priceId"
                    placeholder="Enter price ID"
                    value={getPlanName(accountDetails.priceId)}
                    className={styles.valueInput}
                    readOnly
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="createdAt" className={styles.label}>
                    CREATED AT:
                </label>
                <input
                    type="text"
                    id="createdAt"
                    name="createdAt"
                    placeholder="Account creation date"
                    value={accountDetails.createdAt ? formatDate(accountDetails.createdAt) : ""}
                    className={styles.valueInput}
                    readOnly
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="subscriptionStartDate" className={styles.label}>
                    PLAN START DATE:
                </label>
                <input
                    type="text"
                    id="subscriptionStartDate"
                    name="subscriptionStartDate"
                    placeholder="Subscription end date"
                    value={accountDetails.subscriptionStartDate ? formatDate(accountDetails.subscriptionStartDate) : ""}
                    className={styles.valueInput}
                    readOnly
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="subscriptionEndDate" className={styles.label}>
                    PLAN END DATE:
                </label>
                <input
                    type="text"
                    id="subscriptionEndDate"
                    name="subscriptionEndDate"
                    placeholder="Subscription end date"
                    value={accountDetails.subscriptionEndDate ? formatDate(accountDetails.subscriptionEndDate) : ""}
                    className={styles.valueInput}
                    readOnly
                />
            </div>

            <div className={styles.formGroupButtons}>
                <PageButton label={"EDIT"} onClick={handleSubmit}/>
                <PageButton label={"SUBMIT"} onClick={handleSubmit}/>
            </div>
        </div>
    );
};

export default AccountCreationAccountContainer;
