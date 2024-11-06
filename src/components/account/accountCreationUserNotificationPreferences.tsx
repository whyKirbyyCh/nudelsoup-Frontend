import React, { useEffect, useState } from "react";
import styles from "../../styles/components/account/accountCreationNotificationPreferences.module.css";
import PagePricingSchemaSwap from "../page/pagePricingSchemaSwap";
import PageButton from "@/components/page/pageButton";

interface AccountCreationUserNotificationPreferencesProps {
    userId: string;
    onSubmit: () => void;
}

const AccountCreationUserNotificationPreferences: React.FC<AccountCreationUserNotificationPreferencesProps> = ({ userId, onSubmit }) => {
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [campaignUpdates, setCampaignUpdates] = useState(true);
    const [postUpdates, setPostUpdates] = useState(true);
    const [analyticsUpdates, setAnalyticsUpdates] = useState(true);
    const [dailySummary, setDailySummary] = useState(true);
    const [weeklySummary, setWeeklySummary] = useState(true);
    const [newsletter, setNewsletter] = useState(true);
    const [productUpdates, setProductUpdates] = useState(true);

    useEffect(() => {
        const fetchNotificationPreferences = async () => {
            try {
                const response = await fetch(`/api/userDetails/userNotificationPreferencesByUserId?userId=${userId}`);
                if (!response.ok) {
                    return
                }

                const data = await response.json();
                if (data.notifications) {
                    setCampaignUpdates(data.notifications.campaignUpdates);
                    setPostUpdates(data.notifications.postUpdates);
                    setAnalyticsUpdates(data.notifications.analyticsUpdates);
                    setDailySummary(data.notifications.dailySummary);
                    setWeeklySummary(data.notifications.weeklySummary);
                    setNewsletter(data.notifications.newsletter);
                    setProductUpdates(data.notifications.productUpdates);
                }
            } catch (error: any) {
                setError(error)
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotificationPreferences().then();
    }, [userId]);

    if (loading) {
        return <div className={styles.loading}>Loading account notification preferences</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/userDetails/userSetNotificationPreferences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    campaignUpdates,
                    postUpdates,
                    analyticsUpdates,
                    dailySummary,
                    weeklySummary,
                    newsletter,
                    productUpdates,
                }),
            });

            if (!response.ok) {
                return
            }
        } catch (error: any) {
            return
        } finally {
            onSubmit();
        }
    };

    return (
        <div className={styles.userSettingsContainer}>
            <div className={styles.notificaitonContainerHeader}>
                <div className={styles.marketContainerTitle}>NOTIFICATION PREFERENCES</div>
                <div className={styles.marketContainerDescription}>
                    Here you can select the notification preferences for your account. We will only send you updates, to
                    your account email for the selected preferences.
                    <br/>
                    <br/>
                    Some of the options are very similar and its more about which format you might prefer. You can change your preferences at any time in the settings menu.
                </div>
            </div>
            <div className={styles.notificationSettings}>
                <div className={styles.notficationGroup}>
                    <div className={styles.notficationGroupTitle}>CAMPAIGN UPDATES:</div>
                    <div className={styles.notficationGroupDescription}>This would be emails containing campaign updates will inform you about changes in your campaigns. This could be your posts being done generating and ready to send out, a post being deleted by a site etc, the campaign getting a certain amount of impressions overall or more.</div>
                    <PagePricingSchemaSwap
                        selectorFunction={() => setCampaignUpdates(!campaignUpdates)}
                        labelLeft="DISABLE"
                        labelRight="ENABLE"
                        defaultState={campaignUpdates}
                        showText={false}
                        labelSize={"1.5em"}
                        labelWeight={"500"}
                    />
                    {/*TODO: add things that can configure the threshold of when you will get a email notification*/}
                </div>

                <div className={styles.notficationGroup}>
                    <div className={styles.notficationGroupTitle}>POST UPDATES:</div>
                    <div className={styles.notficationGroupDescription}>Here you would receive an email if a post has received a certain amount of likes / impressions, new comments on the post or more.</div>
                    <PagePricingSchemaSwap
                        selectorFunction={() => setPostUpdates(!postUpdates)}
                        labelLeft="DISABLE"
                        labelRight="ENABLE"
                        defaultState={postUpdates}
                        showText={false}
                        labelSize={"1.5em"}
                        labelWeight={"500"}
                    />
                </div>

                <div className={styles.notficationGroup}>
                    <div className={styles.notficationGroupTitle}>ANALYTICS SUMMARY:</div>
                    <div className={styles.notficationGroupDescription}>Get notified when there is any change in your analytics. If new results have been found or similar things. Below you can select the time frame of the summary, based on which we will send you a summary of analytics for each campaign.</div>
                    <PagePricingSchemaSwap
                        selectorFunction={() => setAnalyticsUpdates(!analyticsUpdates)}
                        labelLeft="DISABLE"
                        labelRight="ENABLE"
                        defaultState={analyticsUpdates}
                        showText={false}
                        labelSize={"1.5em"}
                        labelWeight={"500"}
                    />
                    {/*TODO: opportunity to configure the time frame of the analytics summary */}
                </div>

                <div className={styles.notficationGroup}>
                    <div className={styles.notficationGroupTitle}>DAILY SUMMARY:</div>
                    <div className={styles.notficationGroupDescription}>This email will be sent out daily and will summarize everything that has happened in the last 24 hours with regard to your marketing done by nudelsoup.</div>
                    <PagePricingSchemaSwap
                        selectorFunction={() => setDailySummary(!dailySummary)}
                        labelLeft="DISABLE"
                        labelRight="ENABLE"
                        defaultState={dailySummary}
                        showText={false}
                        labelSize={"1.5em"}
                        labelWeight={"500"}
                    />
                </div>

                <div className={styles.notficationGroup}>
                    <div className={styles.notficationGroupTitle}>WEEKLY SUMMARY:</div>
                    <div className={styles.notficationGroupDescription}>This email will be sent out weekly and will summarize everything that has happened in the last 7 days with regard to your marketing done by nudelsoup.</div>
                    <PagePricingSchemaSwap
                        selectorFunction={() => setWeeklySummary(!weeklySummary)}
                        labelLeft="DISABLE"
                        labelRight="ENABLE"
                        defaultState={weeklySummary}
                        showText={false}
                        labelSize={"1.5em"}
                        labelWeight={"500"}
                    />
                </div>

                <div className={styles.notficationGroup}>
                    <div className={styles.notficationGroupTitle}>NEWSLETTER:</div>
                    <div className={styles.notficationGroupDescription}>In our newsletter we highlight articles, resources and other things which we think might be helpful to people using nudelsoup and trying to grow their customer base. It will be based on research we do to grow our product.</div>
                    <PagePricingSchemaSwap
                        selectorFunction={() => setNewsletter(!newsletter)}
                        labelLeft="DISABLE"
                        labelRight="ENABLE"
                        defaultState={newsletter}
                        showText={false}
                        labelSize={"1.5em"}
                        labelWeight={"500"}
                    />
                </div>

                <div className={styles.notficationGroup}>
                    <div className={styles.notficationGroupTitle}>PRODUCT UPDATES:</div>
                    <div className={styles.notficationGroupDescription}>Here you will be informed if we publish new nudelsoup products or update and improve existing ones.</div>
                    <PagePricingSchemaSwap
                        selectorFunction={() => setProductUpdates(!productUpdates)}
                        labelLeft="DISABLE"
                        labelRight="ENABLE"
                        defaultState={productUpdates}
                        showText={false}
                        labelSize={"1.5em"}
                        labelWeight={"500"}
                    />
                </div>
            </div>
            <div className={styles.formGroupButtons}>
                <PageButton label={"SUBMIT"} onClick={handleSubmit}/>
            </div>
        </div>
    );
};

export default AccountCreationUserNotificationPreferences;
