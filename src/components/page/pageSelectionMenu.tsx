import React from "react";
import styles from "../../styles/components/pageSelectionMenu.module.css";

interface PageSelectionMenuProps {
    options: { id: number; name: string }[];
    onSelection: (option: string) => void;
}

const PageSelectionMenu: React.FC<PageSelectionMenuProps> = ({ options, onSelection }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelection(event.target.value);
    };

    return (
        <div className={styles.pageSelectionMenu}>
            <select className={styles.dropdown} onChange={handleChange} defaultValue="">
                <option value="" disabled>
                    SELECTION
                </option>
                {options.map((option) => (
                    <option key={option.id} value={option.name}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default PageSelectionMenu;
