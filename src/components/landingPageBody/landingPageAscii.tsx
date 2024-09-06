import React from "react";
import styles from "../../styles/components/landingPageAscii.module.css";

const LandingPageAscii: React.FC = () => {
    return (
        <div className={styles.asciiWrapper}>
            <img
                src="/landing-page-ascii.svg"
                alt="landing page ascii"
                className={styles.ascii}
            />
        </div>
    );
}

export default LandingPageAscii