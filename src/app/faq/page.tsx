import React from "react";
import styles from "./page.module.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import PageTitle from "@/components/page/pageTitle";
import PageButton from "@/components/page/pageButton";


export default function Page() {
    const navOptions = [
        { id: 1, label: 'REVIEWS', href: '/reviews' },
        { id: 2, label: 'PRICING', href: '/pricing' },
        { id: 3, label: 'CONTACT', href: '/contact' },
    ]
    return (
        <div>
            <Header iconSize={"small"}  navOptions={navOptions} fontSizeVariant={"small"} />
            <div className={styles.content}>
                <div className={styles.title}>
                    <PageTitle title={"FAQ"} />
                </div>
                <div className={styles.mainPart}>

                </div>
                <PageButton label={"MORE QUESTIONS? CONTACT US!"} href={"/contact"}/>
            </div>
            <Footer />
        </div>
    );
}