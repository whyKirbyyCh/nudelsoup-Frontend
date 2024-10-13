import React, {useEffect, useState} from "react";
import styles from "../../styles/components/account/accountCreationProductContainer.module.css";

interface AccountCreationProductsContainerProps {
    userId: number;
    onSubmit: () => void;
}

const AccountCreationProductsContainer: React.FC<AccountCreationProductsContainerProps> = ({ userId, onSubmit }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

    }, []);

    if (loading) {
        return <div className={styles.loading}>Loading product details...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error}</div>;
    }


    return(
        <div>hi</div>
    );
};

export default AccountCreationProductsContainer;