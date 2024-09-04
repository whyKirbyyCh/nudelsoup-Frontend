import React from "react";
import Link from "next/link";
import styles from "../styles/components/header.module.css";
import HeaderIcon from "./headerIcon";

interface NavOption {
    id: number;
    label: string;
    href: string;
}

interface HeaderProps {
    iconSize?: number;
    navOptions: NavOption[];
    fontSizeVariant?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ iconSize = 8, navOptions, fontSizeVariant = "small"}) => {

    const headerSizeClass = `header-${fontSizeVariant}`;
    const headerClasses = `${styles.header} ${styles[headerSizeClass]}`;

    return (
        <header className={headerClasses}>
            <div className={styles.logo}>
                <Link href="/">
                    <HeaderIcon size={iconSize}/>
                </Link>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    {navOptions.map((item) => (
                        <li key={item.id} className={styles.navItem}>
                            <Link href={item.href} className={styles.navLink}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;