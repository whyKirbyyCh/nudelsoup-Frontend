import React from "react";
import styles from "../../styles/components/services/servicesSelectionContainer.module.css";

interface ServicesSelectionContainerProps {
    services: { id: number; name: string }[];
    selectedServices: number[];
    onSelectionChange: (selectedServices: number[]) => void;
}

const ServicesSelectionContainer: React.FC<ServicesSelectionContainerProps> = ({ services, selectedServices, onSelectionChange }) => {

    const handleCheckboxChange = (serviceId: number) => {
        if (selectedServices.includes(serviceId)) {
            onSelectionChange(selectedServices.filter((id) => id !== serviceId));
        } else {
            onSelectionChange([...selectedServices, serviceId]);
        }
    };

    return (
        <div className={styles.servicesSelectionContainer}>
            <div className={styles.servicesGrid}>
                {services.map((service) => (
                    <label key={service.id} className={styles.serviceItem}>
                        <input
                            type="checkbox"
                            checked={selectedServices.includes(service.id)}
                            onChange={() => handleCheckboxChange(service.id)}
                        />
                        <span className={styles.serviceItemLabel}>{service.name}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default ServicesSelectionContainer;
