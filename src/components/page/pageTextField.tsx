"use client";

import React from "react";
import styles from "../../styles/components/pageTextField.module.css";
import {placeholder} from "@babel/types";

interface PageTextFieldProps {
    placeholder?: string;
}

const PageTextField: React.FC<PageTextFieldProps> = ({ placeholder = "Enter your email" }) => {
    return (
        <div className={styles.textField}>
            <input
                type="text"
                placeholder={placeholder}
                className={styles.textInput}
            />
        </div>
    );
};

export default PageTextField;
