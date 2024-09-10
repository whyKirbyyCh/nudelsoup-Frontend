"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../../styles/components/header.module.css";
import HeaderIcon from "./headerIcon";
import HeaderButton from "./headerButton";

interface NavOption {
    id: number;
    label: string;
    href: string;
}

interface HeaderProps {
    iconSize?: "small" | "large";
    navOptions: NavOption[];
    fontSizeVariant?: "small" | "large";
    showButtons?: boolean;
}

const Header: React.FC<HeaderProps> = ({iconSize = "large", navOptions, fontSizeVariant = "small", showButtons = true,}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const headerSizeClass = `header-${fontSizeVariant}`;
    const headerClasses = `${styles.header} ${styles[headerSizeClass]}`;
    const router = useRouter();

    useEffect(() => {
        const checkAuthCookie = () => {
            const cookie = document.cookie
                .split("; ")
                .find((row) => row.startsWith("authToken="));
            if (cookie) {
                setIsAuthenticated(true);
            }
        };

        checkAuthCookie();
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        document.cookie = "authToken=; Max-Age=0; path=/;";
        setIsAuthenticated(false);

        setTimeout(() => {
            router.push("/");
        }, 0);
    };

    return (
        <header className={headerClasses}>
            <div className={styles.logo}>
                <Link href="/">
                    <HeaderIcon size={iconSize} />
                </Link>
            </div>
            <nav className={styles.nav}>
                <ul className={`${styles.navList} ${menuOpen ? styles.open : ""}`}>
                    {navOptions.map((item) => (
                        <li key={item.id} className={styles.navItem}>
                            <Link href={item.href} className={styles.navLink}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                {showButtons && (
                    <ul className={styles.navButtons}>
                        {isAuthenticated ? (
                            <>
                                <li className={styles.navButton}>
                                    <HeaderButton label="ACCOUNT" href="/account-overview" />
                                </li>
                                <li className={styles.navButton}>
                                    <HeaderButton label="LOG OUT" onClick={handleLogout} />
                                </li>
                            </>
                        ) : (
                            <>
                                <li className={`${styles.navButton} ${styles.demoButton}`}>
                                    <HeaderButton label="TRY DEMO" href="/demo" />
                                </li>
                                <li className={styles.navButton}>
                                    <HeaderButton label="LOG IN" href="/login" />
                                </li>
                            </>
                        )}
                    </ul>
                )}
                <button className={styles.hamburger} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
        </header>
    );
};

export default Header;
