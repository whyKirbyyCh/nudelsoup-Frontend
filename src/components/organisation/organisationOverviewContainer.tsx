import React, { useEffect, useState } from "react";
import styles from "../../styles/components/organisation/organisationOverviewContainer.module.css";
import PageButton from "@/components/page/pageButton";

interface OrganisationOverviewContainerProps {
    userId: string;
}

interface OrganisationDetails {
    userId: string;
    organisationName?: string;
    organisationDescription?: string;
    organisationGoal?: string;
    country?: string;
    website?: string;
    email?: string;
    numberOfPeople?: number;
    industry?: string;
    age?: number;
    additionalFields?: { [key: string]: string };
}

interface Detail {
    label: string;
    value: string;
}

const OrganisationOverviewContainer: React.FC<OrganisationOverviewContainerProps> = ({ userId }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isAddingDetail, setIsAddingDetail] = useState(false);
    const [newLabel, setNewLabel] = useState("");
    const [newDetailValue, setNewDetailValue] = useState("");
    const [organisationDetails, setOrganisationDetails] = useState<OrganisationDetails>({
        userId,
        organisationName: "",
        organisationDescription: "",
        organisationGoal: "",
        country: "",
        website: "",
        email: "",
        numberOfPeople: -1,
        industry: "",
        age: -1,
        additionalFields: {},
    });

    const [details, setDetails] = useState<Detail[]>([]);
    const [editedDetails, setEditedDetails] = useState<Detail[]>([]);

    useEffect(() => {
        if (!userId || userId.trim() === "" || userId === "undefined" || userId === "null") {
            return;
        }

        let isMounted = true;

        const getOrganisationDetails = async () => {
            try {
                const response = await fetch(
                    `/api/userDetails/userOrganisationByUserId?userId=${userId}`,
                    {
                        method: "GET",
                    }
                );

                if (isMounted && response.ok) {
                    const data = await response.json();
                    const organisationData = data.organisation;

                    const fetchedOrganisationDetails: OrganisationDetails = {
                        userId: organisationData.userId,
                        organisationName: organisationData.organisationName || "",
                        organisationDescription: organisationData.organisationDescription || "",
                        organisationGoal: organisationData.organisationGoal || "",
                        country: organisationData.country || "",
                        website: organisationData.website || "",
                        email: organisationData.email || "",
                        numberOfPeople: organisationData.numberOfPeople ?? -1,
                        industry: organisationData.industry || "",
                        age: organisationData.age ?? -1,
                        additionalFields: organisationData.additionalFields || {},
                    };

                    setOrganisationDetails(fetchedOrganisationDetails);

                    const initialDetails: Detail[] = [
                        { label: "NAME", value: fetchedOrganisationDetails.organisationName || "" },
                        { label: "DESCRIPTION", value: fetchedOrganisationDetails.organisationDescription || "" },
                        { label: "GOAL", value: fetchedOrganisationDetails.organisationGoal || "" },
                        { label: "COUNTRY", value: fetchedOrganisationDetails.country || "" },
                        { label: "WEBSITE", value: fetchedOrganisationDetails.website || "" },
                        { label: "EMAIL", value: fetchedOrganisationDetails.email || "" },
                        {
                            label: "NUMBER OF PEOPLE",
                            value:
                                fetchedOrganisationDetails.numberOfPeople !== undefined &&
                                fetchedOrganisationDetails.numberOfPeople >= 0
                                    ? fetchedOrganisationDetails.numberOfPeople.toString()
                                    : "",
                        },
                        { label: "INDUSTRY", value: fetchedOrganisationDetails.industry || "" },
                        {
                            label: "AGE",
                            value:
                                fetchedOrganisationDetails.age !== undefined &&
                                fetchedOrganisationDetails.age >= 0
                                    ? fetchedOrganisationDetails.age.toString()
                                    : "",
                        },
                    ];

                    if (fetchedOrganisationDetails.additionalFields) {
                        Object.entries(fetchedOrganisationDetails.additionalFields).forEach(
                            ([key, value]) => {
                                initialDetails.push({ label: key, value });
                            }
                        );
                    }

                    setDetails(initialDetails);
                } else if (isMounted && response.status === 404) {
                    console.error(
                        "Organisation details not found, setting to default values."
                    );
                } else if (isMounted) {
                    return
                }
            } catch (error) {
                return
            }
        };

        getOrganisationDetails().then();

        return () => {
            isMounted = false;
        };
    }, [userId]);

    const toggleEditMode = () => {
        setIsEditMode(true);
        setEditedDetails(JSON.parse(JSON.stringify(details)));
    };

    const toggleSave = async () => {
        setDetails(editedDetails);
        setIsEditMode(false);
        setIsAddingDetail(false);

        const updatedOrganisationDetails = { ...organisationDetails };
        editedDetails.forEach((detail) => {
            switch (detail.label) {
                case "NAME":
                    updatedOrganisationDetails.organisationName = detail.value;
                    break;
                case "DESCRIPTION":
                    updatedOrganisationDetails.organisationDescription = detail.value;
                    break;
                case "GOAL":
                    updatedOrganisationDetails.organisationGoal = detail.value;
                    break;
                case "COUNTRY":
                    updatedOrganisationDetails.country = detail.value;
                    break;
                case "WEBSITE":
                    updatedOrganisationDetails.website = detail.value;
                    break;
                case "EMAIL":
                    updatedOrganisationDetails.email = detail.value;
                    break;
                case "NUMBER OF PEOPLE":
                    updatedOrganisationDetails.numberOfPeople = parseInt(detail.value) || -1;
                    break;
                case "INDUSTRY":
                    updatedOrganisationDetails.industry = detail.value;
                    break;
                case "AGE":
                    updatedOrganisationDetails.age = parseInt(detail.value) || -1;
                    break;
                default:
                    if (!updatedOrganisationDetails.additionalFields) {
                        updatedOrganisationDetails.additionalFields = {};
                    }
                    updatedOrganisationDetails.additionalFields[detail.label] = detail.value;
                    break;
            }
        });
        setOrganisationDetails(updatedOrganisationDetails);

        try {
            const response = await fetch('/api/userDetails/userSetOrganisationDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedOrganisationDetails),
            });

            if (response.ok) {
                return
            } else {
                return
            }
        } catch (error) {
            return
        }
    };

    const cancelEdit = () => {
        setIsEditMode(false);
        setIsAddingDetail(false);
        setEditedDetails([]);
    };

    const addDetail = () => {
        setIsAddingDetail(true);
    };

    const saveNewDetail = () => {
        if (newLabel && newDetailValue) {
            setEditedDetails([
                ...editedDetails,
                { label: newLabel, value: newDetailValue },
            ]);
            setNewLabel("");
            setNewDetailValue("");
            setIsAddingDetail(false);
        }
    };

    const cancelNewDetail = () => {
        setNewLabel("");
        setNewDetailValue("");
        setIsAddingDetail(false);
    };

    const handleDetailChange = (index: number, newValue: string) => {
        const updatedDetails = [...editedDetails];
        updatedDetails[index].value = newValue;
        setEditedDetails(updatedDetails);
    };

    const displayedDetails = isEditMode ? editedDetails : details;

    return (
        <div className={styles.organisationOverviewContainer}>
            <div className={styles.organisationName}>
                {organisationDetails.organisationName}
            </div>
            {displayedDetails.map((detail, index) => (
                <div key={index} className={styles.organisationDetail}>
                    <div className={styles.label}>{detail.label}:</div>
                    {isEditMode ? (
                        <input
                            type="text"
                            value={detail.value}
                            onChange={(e) => handleDetailChange(index, e.target.value)}
                            className={styles.valueInput}
                        />
                    ) : (
                        <div className={styles.value}>{detail.value}</div>
                    )}
                </div>
            ))}
            {isEditMode && isAddingDetail && (
                <div className={styles.newDetailForm}>
                    <div className={styles.newDetailFormInput}>
                        <input
                            type="text"
                            placeholder="Label"
                            value={newLabel}
                            onChange={(e) => setNewLabel(e.target.value)}
                            className={styles.newDetailInput}
                        />
                        <input
                            type="text"
                            placeholder="Value"
                            value={newDetailValue}
                            onChange={(e) => setNewDetailValue(e.target.value)}
                            className={styles.newDetailInput}
                        />
                    </div>
                    <div className={styles.newDetailButtons}>
                        <PageButton label="Save" onClick={saveNewDetail} />
                        <PageButton label="Cancel" onClick={cancelNewDetail} />
                    </div>
                </div>
            )}
            <div className={styles.buttonsContainer}>
                {isEditMode ? (
                    <>
                        <PageButton label="SAVE" onClick={toggleSave} />
                        <PageButton label="ADD DETAIL" onClick={addDetail} />
                        <PageButton label="CANCEL" onClick={cancelEdit} />
                    </>
                ) : (
                    <PageButton label="EDIT" onClick={toggleEditMode} />
                )}
            </div>
        </div>
    );
};

export default OrganisationOverviewContainer;
