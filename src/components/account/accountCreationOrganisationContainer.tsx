import React, { useState, useEffect } from "react";
import styles from "../../styles/components/account/accountCreationOrganisationContainer.module.css";
import PageButton from "@/components/page/pageButton";

interface AccountCreationOrganisationContainerProps {
    userId: number;
    onSubmit: () => void;
}

interface OrganisationDetails {
    userId: string;
    companyName?: string;
    companyDescription?: string;
    companyGoal?: string;
    country?: string;
    website?: string;
    email?: string;
    numberOfPeople?: number;
    industry?: string;
    age?: number;
    additionalFields?: { [key: string]: string };
}

const AccountCreationOrganisationContainer: React.FC<
    AccountCreationOrganisationContainerProps
> = ({ userId, onSubmit }) => {
    const [companyDetails, setOrganisationDetails] = useState<OrganisationDetails>({
        userId: userId.toString(),
        additionalFields: {},
    });

    const [isAddingDetail, setIsAddingDetail] = useState(false);
    const [newDetailLabel, setNewDetailLabel] = useState("");
    const [newDetailValue, setNewDetailValue] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrganisationDetails = async () => {
            try {
                const response = await fetch(
                    `/api/userDetails/userOrganisationByUserId?userId=${userId}`,
                    {
                        method: "GET",
                    }
                );

                const result = await response.json();

                if (response.ok) {
                    const organisationData: OrganisationDetails = {
                        userId: result.organisation.userId,
                        companyName: result.organisation.organisationName,
                        companyDescription: result.organisation.organisationDescription,
                        companyGoal: result.organisation.organisationGoal,
                        country: result.organisation.country,
                        website: result.organisation.website,
                        email: result.organisation.email,
                        numberOfPeople: result.organisation.numberOfPeople,
                        industry: result.organisation.industry,
                        age: result.organisation.age,
                        additionalFields: result.organisation.additionalFields || {},
                    };
                    setOrganisationDetails(organisationData);
                } else if (response.status === 404) {
                    // No organisation found; keep the default state
                    console.log("No organisation found for the provided user ID");
                } else {
                    console.error("Error fetching organisation details:", result.message);
                    setError(result.message);
                }
            } catch (error) {
                console.error("Network error:", error);
                setError("Network error occurred while fetching organisation details.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrganisationDetails().then();
    }, [userId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setOrganisationDetails((prevDetails) => ({
            ...prevDetails,
            [name]:
                name === "numberOfPeople" || name === "age"
                    ? parseInt(value)
                    : value,
        }));
    };

    const handleAdditionalFieldChange = (key: string, value: string) => {
        setOrganisationDetails((prevDetails) => ({
            ...prevDetails,
            additionalFields: {
                ...prevDetails.additionalFields,
                [key]: value,
            },
        }));
    };

    const addDetail = () => {
        setIsAddingDetail(true);
    };

    const saveNewDetail = () => {
        if (newDetailLabel && newDetailValue) {
            setOrganisationDetails((prevDetails) => ({
                ...prevDetails,
                additionalFields: {
                    ...prevDetails.additionalFields,
                    [newDetailLabel]: newDetailValue,
                },
            }));
            setNewDetailLabel("");
            setNewDetailValue("");
            setIsAddingDetail(false);
        }
    };

    const cancelNewDetail = () => {
        setNewDetailLabel("");
        setNewDetailValue("");
        setIsAddingDetail(false);
    };

    const clearDetails = () => {
        setOrganisationDetails({
            userId: userId.toString(),
            additionalFields: {},
        });
    };

    const handleSubmit = async () => {
        const requestData = {
            userId: companyDetails.userId,
            organisationName: companyDetails.companyName,
            organisationDescription: companyDetails.companyDescription,
            organisationGoal: companyDetails.companyGoal,
            country: companyDetails.country,
            website: companyDetails.website,
            email: companyDetails.email,
            numberOfPeople: companyDetails.numberOfPeople,
            industry: companyDetails.industry,
            age: companyDetails.age,
            additionalFields: companyDetails.additionalFields,
        };

        try {
            const response = await fetch(
                "/api/userDetails/userSetOrganisationDetails",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                }
            );

            const result = await response.json();

            if (response.ok) {
                console.log(
                    "Organisation registered successfully:",
                    result.organisationId
                );
            } else {
                console.error("Server error:", result.message);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
        onSubmit();
    };

    if (loading) {
        return <div className={styles.loading}>Loading organisation details...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error}</div>;
    }

    return (
        <div className={styles.companyInfoContainer}>
            <div className={styles.companyInfoContainerHeader}>
                <div className={styles.companyInfoContainerTitle}>
                    COMPANY INFORMATION
                </div>
                <div className={styles.companyInfoContainerDescription}>
                    The information you provide will help shape the marketing strategies
                    tailored to your company.
                    <br />
                    <br />
                    You can omit any details or update them later, but please note that
                    doing so may impact the effectiveness of your campaigns.
                    <br />
                    <br />
                    To improve the effectiveness, you can add additional details about
                    your organisation at the bottom of this window as you see fit.
                    <br />
                    <br />
                    As a Switzerland-based company, your data is safeguarded by some of
                    the world’s strongest privacy laws, ensuring top-tier protection.
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="companyName" className={styles.label}>
                    NAME:
                </label>
                <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    placeholder="The name of your company"
                    value={companyDetails.companyName || ""}
                    onChange={handleChange}
                    className={styles.valueInput}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="companyDescription" className={styles.label}>
                    DESCRIPTION:
                </label>
                <textarea
                    id="companyDescription"
                    name="companyDescription"
                    placeholder="Describe your organisation, what does it do etc."
                    value={companyDetails.companyDescription || ""}
                    onChange={handleChange}
                    className={styles.textareaInput}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="companyGoal" className={styles.label}>
                    GOAL:
                </label>
                <textarea
                    id="companyGoal"
                    name="companyGoal"
                    placeholder="Describe the goal of your company"
                    value={companyDetails.companyGoal || ""}
                    onChange={handleChange}
                    className={styles.textareaInput}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="country" className={styles.label}>
                    COUNTRY:
                </label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Where is your company based"
                    value={companyDetails.country || ""}
                    onChange={handleChange}
                    className={styles.valueInput}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="website" className={styles.label}>
                    WEBSITE:
                </label>
                <input
                    type="text"
                    id="website"
                    name="website"
                    placeholder="Link to your company's website"
                    value={companyDetails.website || ""}
                    onChange={handleChange}
                    className={styles.valueInput}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                    EMAIL:
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="An email address where people can reach you"
                    value={companyDetails.email || ""}
                    onChange={handleChange}
                    className={styles.valueInput}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="numberOfPeople" className={styles.label}>
                    PEOPLE:
                </label>
                <input
                    type="number"
                    min={1}
                    id="numberOfPeople"
                    name="numberOfPeople"
                    placeholder="The number of people working in your company"
                    value={companyDetails.numberOfPeople?.toString() || ""}
                    onChange={handleChange}
                    className={styles.valueInput}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="industry" className={styles.label}>
                    INDUSTRY:
                </label>
                <input
                    type="text"
                    id="industry"
                    name="industry"
                    placeholder="The industry in which your company is doing business"
                    value={companyDetails.industry || ""}
                    onChange={handleChange}
                    className={styles.valueInput}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="age" className={styles.label}>
                    AGE (YEARS):
                </label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    min={0}
                    placeholder="For how long has your company been doing business"
                    value={companyDetails.age?.toString() || ""}
                    onChange={handleChange}
                    className={styles.valueInput}
                />
            </div>

            {companyDetails.additionalFields &&
                Object.entries(companyDetails.additionalFields).map(
                    ([key, value], index) => (
                        <div key={index} className={styles.formGroup}>
                            <label className={styles.label}>{key.toUpperCase()}:</label>
                            <input
                                type="text"
                                name={key}
                                value={value}
                                onChange={(e) => handleAdditionalFieldChange(key, e.target.value)}
                                className={styles.valueInput}
                            />
                        </div>
                    )
                )}

            {isAddingDetail && (
                <>
                    <div className={styles.newDetailForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="newDetailLabel" className={styles.label}>
                                LABEL:
                            </label>
                            <input
                                type="text"
                                id="newDetailLabel"
                                name="newDetailLabel"
                                placeholder="Label for the new detail"
                                value={newDetailLabel}
                                onChange={(e) => setNewDetailLabel(e.target.value)}
                                className={styles.valueInput}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="newDetailValue" className={styles.label}>
                                VALUE:
                            </label>
                            <input
                                type="text"
                                id="newDetailValue"
                                name="newDetailValue"
                                placeholder="Value for the new detail"
                                value={newDetailValue}
                                onChange={(e) => setNewDetailValue(e.target.value)}
                                className={styles.valueInput}
                            />
                        </div>
                    </div>
                    <div className={styles.formGroupButtonsDetail}>
                        <PageButton label={"SAVE"} onClick={saveNewDetail} />
                        <PageButton label={"CANCEL"} onClick={cancelNewDetail} />
                    </div>
                </>
            )}

            <div className={styles.formGroupButtons}>
                <PageButton label={"SUBMIT"} onClick={handleSubmit} />
                {!isAddingDetail && (
                    <PageButton label={"ADD DETAIL"} onClick={addDetail} />
                )}
                <PageButton label={"CLEAR"} onClick={clearDetails} />
            </div>
        </div>
    );
};

export default AccountCreationOrganisationContainer;
