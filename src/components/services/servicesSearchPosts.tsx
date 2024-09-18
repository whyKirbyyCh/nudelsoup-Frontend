import React, { useState } from "react";
import styles from "../../styles/components/services/servicesSearchPosts.module.css";
import PageButton from "@/components/page/pageButton";

const ServicesSearchPosts = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        console.log("Search term:", searchTerm);
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
                onClick={handleSearchClick}
            >
                SEARCH
            </button>
        </div>
    );
};

export default ServicesSearchPosts;
