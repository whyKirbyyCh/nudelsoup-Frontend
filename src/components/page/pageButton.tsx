import React from "react";
import Link from "next/link";
import styles from "../../styles/components/pageButton.module.css";

interface PageButtonProps {
    label: string;
    href?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PageButton: React.FC<PageButtonProps> = ({ label, href, onClick }) => {
    return (
        <div className={styles.buttonWrapper}>
            {href ? (
                <Link href={href} className={styles.button}>
                    {label}
                </Link>
            ) : (
                <button onClick={onClick} className={styles.button}>
                    {label}
                </button>
            )}
        </div>
    );
};

export default PageButton;
