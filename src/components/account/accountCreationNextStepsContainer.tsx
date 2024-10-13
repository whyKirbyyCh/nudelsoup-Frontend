import React from "react";
import styles from "../../styles/components/account/accountCreationNextSteps.module.css"

const AccountCreationNextStepsContainer: React.FC = ({}) => {
    return(
        <div className={styles.nextStepsContainer}>
            <div className={styles.nextStepsContainerHeader}>
                <div className={styles.nextStepsContainerTitle}>NEXT STEPS</div>
                <div className={styles.nextStepsContainerDescription}>
                    Now that you have completed the account setup, you can start creating your first campaign. Please
                    follow the instructions below to create a campaign.
                    <br/><br/>
                    1. Click the &quot;Create Campaign&quot; button on the top right of the page.
                    <br/><br/>
                    2. Fill out the campaign details, including the name, description, and desired audience.
                    <br/><br/>
                    3. Choose the type of campaign you want to create.
                    <br/><br/>
                    4. Upload your campaign content, such as images or videos.
                    <br/><br/>
                    5. Set your campaign budget and duration.
                    <br/><br/>
                    6. Click &quot;Create Campaign&quot; to submit your campaign.
                </div>
            </div>
        </div>
    );
};
export default AccountCreationNextStepsContainer