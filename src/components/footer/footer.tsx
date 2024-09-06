import React from "react";
import styles from "../../styles/components/footer.module.css";

const Footer: React.FC = () => {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.footerAsciiContainer}>
                <img
                    src="/footer-ascii.svg"
                    alt="footer ascii"
                    className={styles.footerAscii}
                />
            </div>
            <div className={styles.footer}>
                <p className={styles.footerText}>© 2024. All rights reserved</p>
            </div>
        </div>
    );
}

export default Footer;