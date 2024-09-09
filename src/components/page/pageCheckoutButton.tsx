// PageCheckoutButton.tsx
import React from "react";
import Link from "next/link";
import styles from "../../styles/components/pageButton.module.css";

interface PageCheckoutButtonProps {
    label: string;
    href?: string;
    onClick?: () => void;
    isDisabled?: boolean;
}

const PageCheckoutButton: React.FC<PageCheckoutButtonProps> = ({
                                                                   label,
                                                                   href,
                                                                   onClick,
                                                                   isDisabled = false,
                                                               }) => {
    return (
        <div className={styles.buttonWrapper}>
            {href ? (
                <Link
                    href={href}
                    className={`${styles.button} ${isDisabled ? styles.disabled : ""}`}
                    onClick={(e) => {
                        if (isDisabled) {
                            e.preventDefault();
                            if (onClick) onClick();
                        }
                    }}
                >
                    {label}
                </Link>
            ) : (
                <button
                    onClick={(e) => {
                        if (isDisabled) {
                            e.preventDefault();
                            if (onClick) onClick();
                        } else {
                            onClick && onClick();
                        }
                    }}
                    className={`${styles.button} ${isDisabled ? styles.disabled : ""}`}
                    disabled={isDisabled}
                >
                    {label}
                </button>
            )}
        </div>
    );
};

export default PageCheckoutButton;
