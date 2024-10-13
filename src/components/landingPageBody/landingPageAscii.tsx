import React from "react";
import styles from "../../styles/components/landingPageAscii.module.css";
import Image from "next/image";

const LandingPageAscii: React.FC = () => {
    return (
        <div className={styles.asciiWrapper}>
            <Image
                src="/landing-page-ascii.svg"
                alt="landing page ascii"
                className={styles.ascii}
            />
        </div>
    );
}

export default LandingPageAscii