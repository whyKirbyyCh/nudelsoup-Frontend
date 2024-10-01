"use client";

import React, {useEffect, useState} from "react";
import styles from "../../styles/components/account/accountCreationContainer.module.css";
import PageButton from "@/components/page/pageButton";
import { useRouter } from "next/navigation";
import AccountCreationOrganisationContainer from "@/components/account/accountCreationOrganisationContainer";
import AccountCreationAccountContainer from "@/components/account/accountCreationAccountContainer";
import AccountCreationProductsContainer from "@/components/account/accountCreationProductsContainer";
import AccountCreationMarketContainer from "@/components/account/accountCreationMarketContainer";
import AccountCreationUserSettings from "@/components/account/accountCreationUserSettings";
import jwt, { JwtPayload } from "jsonwebtoken";

const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return undefined;
};

const AccountCreationContainer = () => {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState(0);
    const [userId, setUserId] = useState(-1);

    useEffect(() => {
        const token = getCookie("authToken");
        if (token) {
            try {
                const decoded = jwt.decode(token) as JwtPayload;
                if (decoded && decoded.userId) {
                    setUserId(decoded.userId);
                }
            } catch (err) {
                console.error("Error decoding JWT:", err);
            }
        }
    }, []);

    const selectOptionNext = () => {
        setSelectedOption((selectedOption + 1) % 6);
    };

    const selectOptionBack = () => {
        setSelectedOption((selectedOption - 1 + 6) % 6);
    };

    const saveAndExit = () => {
        // TODO: Add the save to DB logic here
        router.push("/product-overview");
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
                    role="navigation"
                >
                    {selectedOption === 0 && <div className={styles.decorativeCircle1}></div>}
                    <div className={styles.accountCreationCategoryBoxText}>ACCOUNT</div>
                </div>
                <div
                    className={styles.accountCreationCategoryBox2}
                    onClick={() => handleSelectOption(1)}
                    role="navigation"
                >
                    {selectedOption === 1 && <div className={styles.decorativeCircle2}></div>}
                    <div className={styles.accountCreationCategoryBoxText}>COMPANY</div>
                </div>
                <div
                    className={styles.accountCreationCategoryBox3}
                    onClick={() => handleSelectOption(2)}
                    role="navigation"
                >
                    {selectedOption === 2 && <div className={styles.decorativeCircle1}></div>}
                    <div className={styles.accountCreationCategoryBoxText}>PRODUCTS</div>
                </div>
                <div
                    className={styles.accountCreationCategoryBox4}
                    onClick={() => handleSelectOption(3)}
                    role="navigation"
                >
                    {selectedOption === 3 && <div className={styles.decorativeCircle2}></div>}
                    <div className={styles.accountCreationCategoryBoxText}>MARKETS</div>
                </div>
                <div
                    className={styles.accountCreationCategoryBox5}
                    onClick={() => handleSelectOption(4)}
                    role="navigation"
                >
                    {selectedOption === 4 && <div className={styles.decorativeCircle1}></div>}
                    <div className={styles.accountCreationCategoryBoxText}>SETTINGS</div>
                </div>
                <div
                    className={styles.accountCreationCategoryBox6}
                    onClick={() => handleSelectOption(5)}
                    role="navigation"
                >
                    {selectedOption === 5 && <div className={styles.decorativeCircle2}></div>}
                    <div className={styles.accountCreationCategoryBoxText}>NOTIFICATIONS</div>
                </div>
                <div className={styles.accountCreationCategoryButtons}>
                    <PageButton label={"BACK"} onClick={selectOptionBack} />
                    <PageButton label={"SAVE"} onClick={saveAndExit} />
                    <PageButton label={"NEXT"} onClick={selectOptionNext} />
                </div>
            </div>
            <div className={styles.accountCreationRightside}>
                {userId === -1 &&
                    <div className={styles.loading}>
                        LOADING ACCOUNT CREATION PROCESS
                    </div>
                }
                { selectedOption === 0 && userId !== -1 &&
                    <AccountCreationAccountContainer userId={userId} onSubmit={selectOptionNext} />
                }
                { selectedOption === 1 && userId !== -1 &&
                    <AccountCreationOrganisationContainer userId={userId} onSubmit={selectOptionNext} />
                }
                { selectedOption === 2 && userId !== -1 &&
                    <AccountCreationProductsContainer userId={userId} onSubmit={selectOptionNext} />
                }
                { selectedOption === 3 && userId !== -1 &&
                    <AccountCreationMarketContainer userId={userId} onSubmit={selectOptionNext} />
                }
                { selectedOption === 4 && userId != -1 &&
                    <AccountCreationUserSettings userId={userId} onSubmit={selectOptionNext} />
                }
                { selectedOption === 5 && "6"}
            </div>
        </div>
    );
};

export default AccountCreationContainer;
