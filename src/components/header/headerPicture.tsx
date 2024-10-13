import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/components/headerPicture.module.css";
import PageButton from "@/components/page/pageButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function HeaderPicture() {
    const router = useRouter();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleImageClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsDropdownVisible((prev) => !prev);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsDropdownVisible(false);
        }
    };

    useEffect(() => {
        if (isDropdownVisible) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isDropdownVisible]);

    const handleLogout = () => {
        document.cookie = "authToken=; Max-Age=0; path=/;";
        setIsDropdownVisible(false);
        router.push("/");

        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    return (
        <div className={styles.pictureContainer} ref={dropdownRef}>
            <Image
                className={styles.picture}
                src="/header-picture.svg"
                alt="Header picture"
                onClick={handleImageClick}
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
            />
            {isDropdownVisible && (
                <div className={styles.dropdown}>
                    <ul>
                        <li><Link href="/account-overview">ACCOUNT</Link></li>
                        <li><Link href="/settings">SETTINGS</Link></li>
                        <li><Link href="/billing">BILLING</Link></li>
                        <li><Link href="/seo">SEO</Link></li>
                        <li><Link href="/resources">RESOURCES</Link></li>
                        <li><PageButton label={"LOG OUT"} onClick={handleLogout} /></li>
                    </ul>
                </div>
            )}
        </div>
    );
}
