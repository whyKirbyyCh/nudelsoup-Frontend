import React from "react";
import Link from "next/link";
import styles from "../../styles/components/headerButton.module.css";

interface HeaderButtonProps {
    label: string;
    href?: string;
    onClick?: () => void;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ label, href = "#" , onClick}) => {
    return (
        <Link href={href} className={styles.button} onClick={onClick}>
            {label}
        </Link>
    );
};

export default HeaderButton;