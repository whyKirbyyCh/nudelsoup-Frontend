import React from "react";
import styles from "../../styles/components/account/accountConnectionContainer.module.css";
import {string} from "prop-types";

interface AccountConnectionContainerProps {
    userId: string;
    onSubmit: () => void;
}

const AccountConnectionContainer: React.FC<AccountConnectionContainerProps> = ({ userId, onSubmit }) => {
    return(
        <div>hi</div>
    );
}

export default AccountConnectionContainer