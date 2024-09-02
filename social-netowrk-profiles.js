import PropTypes from "prop-types";
import styles from "./social-netowrk-profiles.module.css";

const SocialNetowrkProfiles = ({ className = "" }) => {
    return (
        <div className={[styles.socialNetowrkProfiles, className].join(" ")}>
            <div className={styles.analyticsChart}>
                <div className={styles.analyticsChartChild} />
                <div className={styles.analyticsChartInner}>
                    <div className={styles.rectangleParent}>
                        <div className={styles.frameChild} />
                        <div className={styles.frameItem} />
                        <div className={styles.frameInner} />
                    </div>
                </div>
                <div className={styles.analyticsChartItem} />
                <div className={styles.rectangleDiv} />
                <img
                    className={styles.vectorIcon}
                    loading="lazy"
                    alt=""
                    src="/vector.svg"
                />
                <img className={styles.vectorIcon1} alt="" src="/vector-1.svg" />
                <div className={styles.analyticsChartChild1} />
            </div>
            <div className={styles.profileElements}>
                <div className={styles.profileElementsChild} />
                <img className={styles.vectorIcon2} alt="" src="/vector-2.svg" />
                <img
                    className={styles.stuffIcon}
                    loading="lazy"
                    alt=""
                    src="/stuff.svg"
                />
            </div>
            <div className={styles.profilesBottom}>
                <div className={styles.frameParent}>
                    <div className={styles.frameWrapper}>
                        <div className={styles.lineParent}>
                            <div className={styles.lineDiv} />
                            <div className={styles.frameChild1} />
                            <div className={styles.frameChild2} />
                            <div className={styles.frameChild3} />
                        </div>
                    </div>
                    <div className={styles.visualElementsParent}>
                        <div className={styles.visualElements}>
                            <div className={styles.visualElementsChild} />
                            <img className={styles.vectorIcon3} alt="" src="/vector-3.svg" />
                            <img className={styles.vectorIcon4} alt="" src="/vector-4.svg" />
                            <img className={styles.vectorIcon5} alt="" src="/vector-5.svg" />
                            <div className={styles.visualElementsItem} />
                            <img className={styles.vectorIcon6} alt="" src="/vector-6.svg" />
                            <img className={styles.vectorIcon7} alt="" src="/vector-7.svg" />
                            <img className={styles.vectorIcon8} alt="" src="/vector-8.svg" />
                        </div>
                        <div className={styles.frameContainer}>
                            <div className={styles.frameGroup}>
                                <img
                                    className={styles.groupIcon}
                                    loading="lazy"
                                    alt=""
                                    src="/group-2.svg"
                                />
                                <img
                                    className={styles.frameChild4}
                                    loading="lazy"
                                    alt=""
                                    src="/group-3.svg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

SocialNetowrkProfiles.propTypes = {
    className: PropTypes.string,
};

export default SocialNetowrkProfiles;