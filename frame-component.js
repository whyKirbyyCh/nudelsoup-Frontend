import PropTypes from "prop-types";
import styles from "./frame-component.module.css";

const FrameComponent = ({ className = "" }) => {
    return (
        <header className={[styles.headerWrapper, className].join(" ")}>
            <div className={styles.header}>
                <div className={styles.header1} />
                <button className={styles.trialButton}>
                    <div className={styles.trialButtonChild} />
                    <a className={styles.tryFree}>TRY FREE</a>
                </button>
                <button className={styles.logInButton}>
                    <div className={styles.logInButtonChild} />
                    <a className={styles.logIn}>LOG IN</a>
                </button>
                <img
                    className={styles.svgrepoIconcarrier}
                    alt=""
                    src="/svgrepo-iconcarrier@2x.png"
                />
            </div>
        </header>
    );
};

FrameComponent.propTypes = {
    className: PropTypes.string,
};

export default FrameComponent;