import React from "react";
import styles from "../../styles/components/landingPageTryDemo.module.css";
import Image from "next/image";

const LandingPagePrice: React.FC = () => {
    return (
        <div className={styles.demoWrapper}>
            <Image
                src="/try-our-demo.svg"
                alt="try our demo"
                className={styles.demo}
            />
        </div>
    );
}

export default LandingPagePrice