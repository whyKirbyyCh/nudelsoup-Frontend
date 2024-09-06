import React from "react";
import Link from "next/link";
import styles from "../../styles/components/pageButton.module.css";

interface PageButtonProps {
    label: string;
    href: string;
}

const PageButton: React.FC<PageButtonProps> = ({ label, href }) => {
    return (
        <div className={styles.buttonWrapper}>
            <Link href={href} className={styles.button}>
                {label}
            </Link>
        </div>

    );
}

export default PageButton