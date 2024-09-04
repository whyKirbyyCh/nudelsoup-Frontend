import React from "react";
import Image from "next/image";
import styles from "../styles/components/headerIcon.module.css";

interface HeaderIconProps {
    size?: number;
}

const HeaderIcon: React.FC<HeaderIconProps> = ({ size = 8 }) => {
    return (
        <div className={styles.iconWrapper} style={{ width: `${size}em`, height: `${size}em` }}>
            <Image
                src="/nudelsoup_logo_with_text.svg"
                alt="nudelsoup logo"
                width={size}
                height={size}
                className={styles.icon}
            />
        </div>
    );
};

export default HeaderIcon;