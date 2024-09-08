"use client";

import React from "react";
import styles from "../../styles/components/pageTextField.module.css";

interface PageTextFieldProps {
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PageTextField: React.FC<PageTextFieldProps> = ({ placeholder = "Enter your email", value, onChange }) => {
    return (
        <div className={styles.textField}>
            <input
                type="text"
                placeholder={placeholder}
                className={styles.textInput}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default PageTextField;
