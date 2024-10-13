import React from "react";
import styles from "../../styles/components/landingPageGraphic.module.css";
import Image from "next/image";

const LandingPageGraphic: React.FC = () => {
    return (
        <div className={styles.graphicWrapper}>
            <Image
                src="/landing_page_image.svg"
                alt="landing page graphic"
                className={styles.graphic}
            />
        </div>
    );
}

export default LandingPageGraphic