import React from "react";
import styles from "../styles/components/landingPageTitle.module.css";

interface LandingPageTitleProps {
    titlePart1: string
    titlePart2: string
    subTitle?: string
}

const LandingPageTitle: React.FC<LandingPageTitleProps> = ({ titlePart1, titlePart2, subTitle }) => {
    return (
        <div className={styles.pageTitleWrapper}>
            <div className={styles.pageTitleText1}>{titlePart1}</div>
            <div className={styles.pageTitleText2}>{titlePart2 + "*"}</div>
            <div className={styles.subTitle}>{subTitle}</div>
        </div>
    );
};

export default LandingPageTitle;