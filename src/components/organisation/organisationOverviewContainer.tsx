import React from "react";
import styles from "../../styles/components/organisation/organisationOverviewContainer.module.css";

interface OrganisationOverviewContainerProps {
    userId: string;
}

const OrganisationOverviewContainer: React.FC<OrganisationOverviewContainerProps> = ({ userId }) => {

    return (
        <div className={styles.organisationOverviewContainer}>
            {userId}
        </div>
    );
};

export default OrganisationOverviewContainer