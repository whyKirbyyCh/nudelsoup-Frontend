import React from "react"
import styles from  "../../styles/components/landingPageInfoBox.module.css";

interface LandingPageInfoBoxProps {
    title: string
    text: string
}

const LandingPageInfoBox: React.FC<LandingPageInfoBoxProps> = ({ title, text }) => {
    return (
        <div className={styles.infoBox}>
            <div className={styles.infoBoxTitle}>
                {title}
            </div>
            <div className={styles.infoBoxText}>
                {text}
            </div>
        </div>
    )
}

export default LandingPageInfoBox