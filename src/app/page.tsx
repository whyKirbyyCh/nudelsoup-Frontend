import styles from "./page.module.css";
import Header from "../components/header/header";
import LandingPageTitle from "../components/landingPageBody/landingPageTitle";
import LandingPageGraphic from "../components/landingPageBody/landingPageGraphic";

export default function Home() {
    const navOptions = [
        { id: 1, label: 'REVIEWS', href: '/' },
        { id: 2, label: 'FAQ', href: '/about' },
        { id: 3, label: 'PRICING', href: '/contact' },
        { id: 4, label: 'CONTACT', href: '/contact' },
    ];

    return (
        <main className={styles.main}>
            <Header iconSize={"large"}  navOptions={navOptions} fontSizeVariant={"large"} />
            <LandingPageTitle titlePart1={"AD CAMPAIGNS FOR"}  titlePart2={"THE PRICE OF RAMEN"} subTitle={"we are a company based in switzerland everything is more expensive here..."}/>
            <LandingPageGraphic />
        </main>
    );
}
