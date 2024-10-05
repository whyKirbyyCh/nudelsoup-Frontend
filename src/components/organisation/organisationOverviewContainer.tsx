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
        let isMounted = true;

        const getOrganisationDetails = async () => {
            try {
                console.log("Fetching organisation details for userId:", userId);

                const response = await fetch(
                    `/api/userDetails/userOrganisationByUserId?userId=${userId}`,
                    {
                        method: "GET",
                    }
                );

                console.log(response);

                if (isMounted && response.ok) {
                    const data = await response.json();

                    console.log("API response data:", data);

                    const organisationData = data.organisation;

                    console.log("Organisation data:", organisationData);

                    setOrganisationDetails((prevDetails) => ({
                        ...prevDetails,
                        ...organisationData,
                    }));
                } else if (isMounted && response.status === 404) {
                    console.error("Organisation details not found, setting to default values.");
                } else if (isMounted) {
                    console.error(`Error fetching organisation details: ${response.statusText}`);
                }
            } catch (error) {
                console.error("Error fetching organisation details:", error);
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
                            <li key={key}>
                                <strong>{key}:</strong> {value}
                            </li>
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
