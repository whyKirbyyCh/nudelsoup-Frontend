"use client";

import React from "react";
import styles from "../../styles/components/pageMessageField.module.css";

interface PageMessageFieldProps {
    placeholder?: string;
}

const PageMessageField: React.FC<PageMessageFieldProps> = ({ placeholder = "Enter your email" }) => {
    return (
        <div className={styles.messageField}>
            <textarea
                placeholder={placeholder}
                className={styles.messageInput}
            />
        </div>
    );
};

export default PageMessageField;
