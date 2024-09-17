import React, { useState } from "react";
import styles from "../../styles/components/services/servicesSearchPosts.module.css";
import PageButton from "@/components/page/pageButton";

const ServicesSearchPosts = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.searchInput}
            />
            <button
                className={styles.searchInputButton}
            >
                SEARCH
            </button>
        </div>
    );
};

export default ServicesSearchPosts;