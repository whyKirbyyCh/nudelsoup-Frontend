"use client"

import React, {useState} from "react";
import PageTextField from "@/components/page/pageTextField";
import PageMessageField from "@/components/page/pageMessageField";
import PageCheckoutButton from "@/components/page/pageCheckoutButton";
import styles from "../../styles/components/pageContactForm.module.css";

//TODO: implement the email sending logic
const PageContactForm: React.FC = () => {
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [contactErrorMessage, setContactErrorMessage] = useState("")

    const onClick = () => {
        setContactErrorMessage("");

        if (!email || !name || !message) {
            setContactErrorMessage("Please fill out all fields.");
            return;
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setContactErrorMessage("Please enter a valid email address.");
            return;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            setContactErrorMessage("Name can only contain letters and spaces.");
            return;
        } else if (message.length < 10) {
            setContactErrorMessage("Your message seems to be too short.");
            return;
        }

        //send mail
        return
    };

    return (
        <div className={styles.contactBox}>
            <div className={styles.contactTitle}>
                CONTACT FORM
            </div>
            <div className={styles.contactBoxItem}>
                <div className={styles.contactBoxItemName}>
                    EMAIL:
                </div>
                <PageTextField placeholder={"Enter your email"} value={email} onChange={(event) => setEmail(event.target.value)}/>
            </div>
            <div className={styles.contactBoxItem}>
                <div className={styles.contactBoxItemName}>
                    NAME:
                </div>
                <PageTextField placeholder={"Enter your name"} value={name} onChange={(event) => setName(event.target.value)}/>
            </div>
            <div className={styles.contactBoxItem2}>
                <div className={styles.contactBoxItemName}>
                    Message:
                </div>
                <PageMessageField placeholder={"Enter your message"} value={message} onChange={(event) => setMessage(event.target.value)}/>
            </div>
            {contactErrorMessage && <div className={styles.errorMessage}>{contactErrorMessage}</div>}
            <div className={styles.contactBoxItemButton}>
                <PageCheckoutButton label={"SEND"} onClick={onClick}/>
            </div>
        </div>
    );
};

export default PageContactForm;