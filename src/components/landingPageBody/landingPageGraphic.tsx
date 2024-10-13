import React from "react";
import styles from "../../styles/components/landingPageGraphic.module.css";

const LandingPageGraphic: React.FC = () => {
    return (
        <div className={styles.graphicWrapper}>
            <img
                src="/landing_page_image.svg"
                alt="landing page graphic"
                className={styles.graphic}
            />
        </div>
    );
}

export default LandingPageGraphic