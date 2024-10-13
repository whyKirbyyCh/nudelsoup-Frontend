import React from "react";
import Link from "next/link";
import styles from "../../styles/components/PageButtonSmall.module.css"

interface PageButtonSmallProps {
    label: string;
    href?: string;
    onClick?: () => void;
}

const PageButtonSmall: React.FC<PageButtonSmallProps> = ({ label, href, onClick }) => {
    return (
        <div className={styles.buttonSmallWrapper}>
            {href ? (
                <Link href={href} className={styles.buttonSmall}>
                    {label}
                </Link>
            ) : (
                <button onClick={onClick} className={styles.buttonSmall}>
                    {label}
                </button>
            )}
        </div>
    );
};

export default PageButtonSmall;
