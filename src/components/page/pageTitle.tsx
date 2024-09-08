import React from "react";
import styles from "../../styles/components/pageTitle.module.css";

interface PageTitleProps {
    title: string;
    size?: number; // Size in em
}

const PageTitle: React.FC<PageTitleProps> = ({ title, size }) => {
    return (
        <div className={styles.pageTitleWrapper}>
            <div className={styles.pageTitleText} style={{ fontSize: size ? `${size}em` : undefined }}>
                {title}
            </div>
        </div>
    );
};

export default PageTitle;
