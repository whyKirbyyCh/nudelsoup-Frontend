import React from "react";
import styles from "./faqPage.module.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import PageTitle from "@/components/page/pageTitle";
import PageButton from "@/components/page/pageButton";
import PageSVGElement from "@/components/page/pageSVGElement";
import PageFAQBox from "@/components/page/pageFAQBox";


export default function Page() {
    const navOptions = [
        { id: 1, label: 'REVIEWS', href: '/reviews' },
        { id: 2, label: 'PRICING', href: '/pricing' },
        { id: 3, label: 'CONTACT', href: '/contact' },
    ]
    return (
        <div>
            <Header iconSize={"large"}  navOptions={navOptions} fontSizeVariant={"large"} />
            <div className={styles.faqContent}>
                <div className={styles.title}>
                    <PageTitle title={"FAQ"} />
                </div>
                <div className={styles.mainPart}>
                    <div className={styles.faqBoxWrapperLeft}>
                        <PageFAQBox question={"What programming languages does NudelSoup support?"} answer={"NudelSoup currently supports generating code in Java, Python, JavaScript, C++, C#, and PHP."}/>
                        <PageFAQBox question={"How long does it take to generate code?"} answer={"Code generation usually takes less than a second, but this can vary depending on the complexity of the instruction and the size of the codebase."}/>
                        <PageFAQBox question={"Can I use NudelSoup for free?"} answer={"Yes, NudelSoup is free to use for personal and open source projects. If you need to use it commercially, please contact us for pricing information."}/>
                        <PageFAQBox question={"Can I use NudelSoup to generate code for my own project?"} answer={"Yes, you can use NudelSoup to generate code for your own project. Just make sure that you have the necessary permissions and licenses to use the code you generate."}/>
                    </div>
                    <div className={styles.faqBoxWrapperRight}>
                        <PageFAQBox question={"What is NudelSoup?"} answer={"NudelSoup is a web app that generates code based on human instructions."}/>
                        <PageFAQBox question={"How does NudelSoup work?"} answer={"NudelSoup uses AI to generate code based on human instructions. It is trained on a large dataset of code from open source projects and can generate code in a variety of programming languages."}/>
                        <PageFAQBox question={"What kind of code can NudelSoup generate?"} answer={"NudelSoup can generate a wide variety of code, including functions, classes, comments, and more. It can also generate code for specific libraries and frameworks."}/>
                        <PageFAQBox question={"How accurate is NudelSoup's code generation?"} answer={"NudelSoup's code generation is generally very accurate, but it is not perfect. The accuracy of the generated code depends on the quality of the instruction and the complexity of the code being generated."}/>
                    </div>
                </div>
                <div className={styles.pageEnd}>
                    <PageSVGElement svgSrc={"./more-questions.svg"} alt={"faq"}/>
                    <div className={styles.pageEndButton}>
                        <PageButton label={"MORE QUESTIONS? CONTACT US!"} href={"/contact"}/>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <Footer/>
            </div>
        </div>
    );
}