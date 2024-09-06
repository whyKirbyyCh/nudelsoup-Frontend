import styles from "./page.module.css";
import Header from "../components/header/header";
import LandingPageTitle from "../components/landingPageBody/landingPageTitle";
import LandingPageGraphic from "../components/landingPageBody/landingPageGraphic";
import LandingPageAscii from "../components/landingPageBody/landingPageAscii";
import PageButton from "../components/page/pageButton";
import LandingPagePrice from "../components/landingPageBody/landingPagePrice";
import LandingPageInfoBox from "../components/landingPageBody/landingPageInfoBox";
import LandingPageTryDemo from "../components/landingPageBody/landingPageTryDemo";
import Footer from "../components/footer/footer";

export default function Home() {
    const navOptions = [
        { id: 1, label: 'REVIEWS', href: '/' },
        { id: 2, label: 'FAQ', href: '/about' },
        { id: 3, label: 'PRICING', href: '/contact' },
        { id: 4, label: 'CONTACT', href: '/contact' },
    ];

    return (
        <main className={styles.main}>
            <div className={styles.header}>
                <Header iconSize={"large"}  navOptions={navOptions} fontSizeVariant={"large"} />
            </div>
            <div className={styles.content}>
                <div className={styles.leftContent}>
                    <LandingPageTitle titlePart1={"AD CAMPAIGNS FOR"}  titlePart2={"THE PRICE OF RAMEN"} subTitle={"we are a company based in Switzerland everything is more expensive here..."}/>
                    <div className={styles.textWrapper}>
                        <div className={styles.Text}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. <br/><br/>At vero eos et
                            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                            est Lorem ipsum dolor sit amet.
                        </div>
                    </div>

                    <div className={styles.bottomLeftContent}>
                        <LandingPagePrice/>
                        <PageButton label={"CHECK OUT OUR OPTIONS"} href={"/pricing"}/>
                    </div>
                </div>
                <div className={styles.rightContent}>
                    <LandingPageGraphic/>
                </div>
            </div>
            <div className={styles.bottomContent}>
                <LandingPageAscii />
            </div>
            <div className={styles.lowerSide}>
                <div className={styles.scrolledContent}>
                    <LandingPageInfoBox title={"WE DO:"} text={"we are a company based in Switzerland everything is more expensive here..."} />
                    <LandingPageInfoBox title={"THIS IS FOR:"} text={"we are a company based in Switzerland everything is more expensive here..."} />
                    <LandingPageInfoBox title={"CAN YOU EXPECT:"} text={"we are a company based in Switzerland everything is more expensive here..."} />
                </div>
                <LandingPageTryDemo/>
                <PageButton label={"TRY OUR DEMO"} href={"/demo"}/>
            </div>
            <div className={styles.footer}>
                <Footer/>
            </div>
        </main>
    );
}