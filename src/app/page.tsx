import styles from "./page.module.css";
import Header from "../components/header/header";
import LandingPageTitle from "../components/landingPageBody/landingPageTitle";
import LandingPageGraphic from "../components/landingPageBody/landingPageGraphic";
import LandingPageAscii from "../components/landingPageBody/landingPageAscii";
import PageButton from "../components/page/pageButton";

export default function Home() {
    const navOptions = [
        { id: 1, label: 'REVIEWS', href: '/' },
        { id: 2, label: 'FAQ', href: '/about' },
        { id: 3, label: 'PRICING', href: '/contact' },
        { id: 4, label: 'CONTACT', href: '/contact' },
    ];

    return (
        <main className={styles.main}>
            <div>
                <Header iconSize={"large"}  navOptions={navOptions} fontSizeVariant={"large"} />
            </div>
            <div>
                <div>
                    <LandingPageTitle titlePart1={"AD CAMPAIGNS FOR"}  titlePart2={"THE PRICE OF RAMEN"} subTitle={"we are a company based in switzerland everything is more expensive here..."}/>
                    <PageButton label={"OPTIONS"} href={"/pricing"}/>

                </div>
                <LandingPageGraphic />
                <LandingPageAscii />
            </div>
        </main>
    );
}
