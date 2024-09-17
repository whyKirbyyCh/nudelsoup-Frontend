import React, { useState } from "react";
import styles from "../../styles/components/services/servicesFilterPosts.module.css";

const ServicesFilterPosts = () => {
    const [filterOption, setFilterOption] = useState("newest");

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterOption(event.target.value);
    };

    return (
        <div className={styles.filterContainer}>
            <select
                value={filterOption}
                onChange={handleFilterChange}
                className={styles.filterSelect}
            >
                <option value="newest">NEWEST FIRST</option>
                <option value="oldest">OLDEST FIRST</option>
                <option value="best">BEST PERFORMING</option>
                <option value="worst">WORST PERFORMING</option>
            </select>
        </div>
    );
};

export default ServicesFilterPosts;