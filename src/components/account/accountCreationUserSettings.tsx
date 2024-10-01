import React, {useState} from "react";
import styles from "../../styles/components/account/accountCreationMarketContainer.module.css";

interface AccountCreationUserSettingsProps {
    userId: number;
    onSubmit: () => void;
}

const AccountCreationUserSettings: React.FC<AccountCreationUserSettingsProps> = ({}) => {
    const [loading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);

    if (loading) {
        return <div className={styles.loading}>Account Settings are being loaded...</div>
    }

    if (error){
        return <div className={styles.error}>{error}</div>
    }

    return(
        <div className={styles.userSettingsContainer}>
            HI
        </div>
    );
};

export default AccountCreationUserSettings