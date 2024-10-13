import React from "react";
import styles from "../../styles/components/landingPageAscii.module.css";
import Image from "next/image";

const LandingPagePrice: React.FC = () => {
    return (
        <div className={styles.priceWrapper}>
            <Image
                src="/landing-page-price.svg"
                alt="landing page price"
                className={styles.price}
            />
        </div>
    );
}

export default LandingPagePrice