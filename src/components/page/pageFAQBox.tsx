"use client";

import React, { useState } from "react";
import styles from "../../styles/components/pageFAQBox.module.css";

interface PageFAQBoxProps {
    question: string;
    answer: string;
}

const PageFAQBox: React.FC<PageFAQBoxProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className={`${styles.faqBox} ${isOpen ? styles.open : ''}`} onClick={toggleOpen}>
            <div className={styles.questionWrapper}>
                <h3 className={styles.question}>{question}</h3>
                <span className={styles.toggleIcon}>{isOpen ? '−' : '+'}</span>
            </div>
            {isOpen && (
                <div className={styles.answer}>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

export default PageFAQBox;
