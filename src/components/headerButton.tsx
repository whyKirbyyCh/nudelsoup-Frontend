import React from "react";
import Link from "next/link";
import styles from "../styles/components/headerButton.module.css";

interface HeaderButtonProps {
    label: string;
    href: string;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ label, href }) => {
    return (
        <Link href={href} className={styles.button}>
            {label}
        </Link>
    );
};

export default HeaderButton;