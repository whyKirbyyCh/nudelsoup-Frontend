"use client";

import React from "react";
import styles from "../../styles/components/pageMessageField.module.css";

interface PageMessageFieldProps {
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PageMessageField: React.FC<PageMessageFieldProps> = ({ placeholder = "Enter your email", value, onChange }) => {
    return (
        <div className={styles.messageField}>
            <textarea
                placeholder={placeholder}
                className={styles.messageInput}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default PageMessageField;
