import FrameComponent from "../components/frame-component";
import SocialNetowrkProfiles from "../components/social-netowrk-profiles";
import styles from "./index.module.css";

const LandingPage = () => {
    return (
        <div className={styles.landingPage}>
            <FrameComponent />
            <div className={styles.rectangleParent}>
                <div className={styles.frameChild} />
                <img
                    className={styles.analyticsChartIcon}
                    loading="lazy"
                    alt=""
                    src="/analytics-chart.svg"
                />
            </div>
            <div className={styles.rectangleGroup}>
                <div className={styles.frameItem} />
                <SocialNetowrkProfiles />
            </div>
            <section className={styles.content}>
                <div className={styles.frameParent}>
                    <div className={styles.frameGroup}>
                        <div className={styles.frameContainer}>
                            <div className={styles.adCampaignsForThePriceOfParent}>
                                <h1 className={styles.adCampaignsFor}>
                                    AD CAMPAIGNS FOR THE PRICE OF RAMEN
                                </h1>
                                <img
                                    className={styles.frameInner}
                                    loading="lazy"
                                    alt=""
                                    src="/group-12.svg"
                                />
                            </div>
                            <div className={styles.separatorParent}>
                                <div className={styles.separator}>*</div>
                                <div className={styles.weAreACompanyBasedInSwitWrapper}>
                                    <div className={styles.weAreA}>
                                        we are a company based in switzerland everything is more
                                        expensive here...
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.placeholder}>
                            <h1 className={styles.empty}>*</h1>
                        </div>
                    </div>
                    <div className={styles.homeLinkWrapper}>
                        <div className={styles.homeLink}>
                            <div className={styles.previewContent}>
                                <div className={styles.previewElements}>
                                    <div className={styles.previewElementsChild} />
                                    <div className={styles.websitePreview}>
                                        <div className={styles.previewBackground} />
                                        <div className={styles.innerPreview}>
                                            <div className={styles.innerPreviewChild} />
                                            <div className={styles.previewContentBox} />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.moreParent}>
                                    <h1 className={styles.more}>{`& MORE`}</h1>
                                    <div className={styles.moreWrapper}>
                                        <h1 className={styles.more1}>{`& MORE`}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.frameDiv}>
                                <img
                                    className={styles.groupIcon}
                                    loading="lazy"
                                    alt=""
                                    src="/group-6.svg"
                                />
                                <img className={styles.frameChild1} alt="" src="/group-5.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;