"use client";

import React, { useState } from "react";
import styles from "../../styles/components/pagePasswordField.module.css";
import Image from "next/image";

interface PagePasswordFieldProps {
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PagePasswordField: React.FC<PagePasswordFieldProps> = ({ placeholder = "Enter your password", value, onChange}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className={styles.passwordField}>
            <input
                type={passwordVisible ? "text" : "password"}
                placeholder={placeholder}
                className={styles.passwordInput}
                value={value}
                onChange={onChange}
            />
            <button
                type="button"
                className={styles.toggleButton}
                onClick={togglePasswordVisibility}
                aria-label={passwordVisible ? "Hide password" : "Show password"}
            >
                {passwordVisible ? (
                    <Image
                        src="/eye-closed.svg"
                        alt="Hide password"
                        className={styles.icon}
                    />
                ) : (
                    <Image
                        src="/eye-open.svg"
                        alt="Show password"
                        className={styles.icon}
                    />
                )}
            </button>
        </div>
    );
};

export default PagePasswordField;
