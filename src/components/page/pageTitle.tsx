import React from "react";
import styles from "../../styles/components/pageTitle.module.css";

interface PageTitleProps {
    title: string
}

const PageTitle: React.FC<PageTitleProps> = ({ title}) => {
    return (
        <div className={styles.pageTitleWrapper}>
            <div className={styles.pageTitleText}>{title}</div>
        </div>
    );
};

export default PageTitle;