"use client";

import React, { useState } from "react";
import styles from "../../styles/components/account/accountCreationContainer.module.css";
import PageButton from "@/components/page/pageButton";

const AccountCreationContainer = () => {
    const [selectedOption, setSelectedOption] = useState(0);

    const selectOptionNext = () => {
        setSelectedOption((selectedOption + 1) % 6);
    };

    const selectOptionBack = () => {
        setSelectedOption((selectedOption - 1 + 6) % 6);
    };

    const saveAndExit = () => {
        // Save and exit functionality
    };

    const handleSelectOption = (index : number) => {
        setSelectedOption(index);
    };

    return (
        <div className={styles.accountCreationContainer}>
            <div className={styles.accountCreationLeftside}>
                <div
                    className={styles.accountCreationCategoryBox1}
                    onClick={() => handleSelectOption(0)}
                >
                    {selectedOption === 0 && <div className={styles.decorativeCircle1}></div>}
                    <div className={styles.accountCreationCategoryBoxText}>ACCOUNT</div>
                </div>
                <div
                    className={styles.accountCreationCategoryBox2}
                    onClick={() => handleSelectOption(1)}
                >
                    {selectedOption === 1 && <div className={styles.decorativeCircle2}></div>}
                    <div className={styles.accountCreationCategoryBoxText}>COMPANY</div>
                </div>
                <div
                    className={styles.accountCreationCategoryBox3}
                    onClick={() => handleSelectOption(2)}
                >
                    {selectedOption === 2 && <div className={styles.decorativeCircle1}></div>}
                    <div className={styles.accountCreationCategoryBoxText}>MARKET</div>
                </div>
                <div
                    className={styles.accountCreationCategoryBox4}
                    onClick={() => handleSelectOption(3)}
                >
                    {selectedOption === 3 && <div className={styles.decorativeCircle2}></div>}
                    <div className={styles.accountCreationCategoryBoxText}>PRODUCTS</div>
                </div>
                <div
                    className={styles.accountCreationCategoryBox5}
                    onClick={() => handleSelectOption(4)}
                >
                    {selectedOption === 4 && <div className={styles.decorativeCircle1}></div>}
                    <div className={styles.accountCreationCategoryBoxText}>SETTINGS</div>
                </div>
                <div
                    className={styles.accountCreationCategoryBox6}
                    onClick={() => handleSelectOption(5)}
                >
                    {selectedOption === 5 && <div className={styles.decorativeCircle2}></div>}
                    <div className={styles.accountCreationCategoryBoxText}>NOTIFICATIONS</div>
                </div>
                <div className={styles.accountCreationCategoryButtons}>
                    <PageButton label={"BACK"} onClick={selectOptionBack} />
                    <PageButton label={"EXIT"} onClick={saveAndExit} />
                    <PageButton label={"NEXT"} onClick={selectOptionNext} />
                </div>
            </div>
            <div className={styles.accountCreationRightside}></div>
        </div>
    );
};

export default AccountCreationContainer;