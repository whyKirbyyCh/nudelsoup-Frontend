import React from "react";
import styles from "../../styles/components/headerIcon.module.css";
import Image from "next/image";

interface HeaderIconProps {
    size?: 'small' | 'large';
}

const HeaderIcon: React.FC<HeaderIconProps> = ({ size = "large" }) => {
    const iconSizeClass = `header-${size}`;
    const iconStyleClasses = `${styles.iconWrapper} ${styles[iconSizeClass]}`;

    return (
        <div className={iconStyleClasses}>
            <Image
                src="/nudelsoup_logo_with_text.svg"
                alt="nudelsoup logo"
                className={styles.icon}
            />
        </div>
    );
};

export default HeaderIcon;