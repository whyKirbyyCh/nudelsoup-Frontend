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
    const [seesDifferentNav, setSeesDifferentNav] = useState(false);
    const headerSizeClass = `header-${fontSizeVariant}`;
    const headerClasses = `${styles.header} ${styles[headerSizeClass]}`;
    const router = useRouter();

    useEffect(() => {
        const checkAuthStatus = () => {
            const authCookie = document.cookie
                .split("; ")
                .find((row) => row.startsWith("authToken="));
            if (authCookie) {
                setIsAuthenticated(true);
                setSeesDifferentNav(true);
            }
        };

        checkAuthStatus();
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        document.cookie = "authToken=; Max-Age=0; path=/;";
        document.cookie = "seesDifferentNav=; Max-Age=0; path=/;";
        setIsAuthenticated(false);
        setSeesDifferentNav(false);

        setTimeout(() => {
            router.push("/");
        }, 0);
    };

    const payingCustomerNavOptions = [
        { id: 1, label: 'ORGANISATION', href: '/organisation-overview' },
        { id: 2, label: 'PRODUCTS', href: '/product-overview' },
        { id: 3, label: 'ANALYTICS', href: '/analytics' },
        { id: 4, label: 'SEO', href: '/seo' },
        { id: 5, label: 'RESOURCES', href: '/resources' },
    ]

    const displayedNavOptions = isAuthenticated && seesDifferentNav ? payingCustomerNavOptions : navOptions;

    return (
        <header className={headerClasses}>
            <div className={styles.logo}>
                <Link href="/">
                    <HeaderIcon size={iconSize} />
                </Link>
            </div>
            <nav className={styles.nav}>
                <ul className={`${styles.navList} ${menuOpen ? styles.open : ""}`}>
                    {displayedNavOptions.map((item) => (
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
                                    <HeaderButton label="SETTINGS" href="/settings" />
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
