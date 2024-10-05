import React, { useEffect, useState } from "react";
import styles from "../../styles/components/organisation/organisationOverviewContainer.module.css";

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

const OrganisationOverviewContainer: React.FC<OrganisationOverviewContainerProps> = ({ userId }) => {
    const [error, setError] = useState<string | null>(null);
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
        additionalFields: {}
    });

    useEffect(() => {
        if (
            !userId ||
            userId.trim() === "" ||
            userId === "undefined" ||
            userId === "null"
        ) {
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
                    
                    setOrganisationDetails({
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
                    });
                } else if (isMounted && response.status === 404) {
                    console.error("Organisation details not found, setting to default values.");
                } else if (isMounted) {
                    const errorData = await response.json();
                    console.error(`Error fetching organisation details: ${errorData.message}`);
                    setError(errorData.message);
                }
            } catch (error) {
                console.error("Error fetching organisation details:", error);
                setError("An error occurred while fetching organisation details.");
            }
        };

        getOrganisationDetails().then();

        return () => {
            isMounted = false;
        };
    }, [userId]);

    return (
        <div className={styles.organisationOverviewContainer}>
            <h1>{userId}</h1>
            <h2>Name: {organisationDetails.organisationName}</h2>
            <p>Description: {organisationDetails.organisationDescription}</p>
            <p><strong>Goal:</strong> {organisationDetails.organisationGoal}</p>
            <p><strong>Country:</strong> {organisationDetails.country}</p>
            <p><strong>Website:</strong> {organisationDetails.website}</p>
            <p><strong>Email:</strong> {organisationDetails.email}</p>
            <p><strong>Number of People:</strong> {organisationDetails.numberOfPeople}</p>
            <p><strong>Industry:</strong> {organisationDetails.industry}</p>
            <p><strong>Age:</strong> {organisationDetails.age}</p>
            <div>
                <h3>Additional Fields</h3>
                {organisationDetails.additionalFields && Object.keys(organisationDetails.additionalFields).length > 0 ? (
                    <ul>
                        {Object.entries(organisationDetails.additionalFields).map(([key, value]) => (
                            <div key={key}>
                                <strong>{key}:</strong> {value}
                            </div>
                        ))}
                    </ul>
                ) : (
                    <p>No additional fields available</p>
                )}
            </div>
        </div>
    );
};

export default OrganisationOverviewContainer;
