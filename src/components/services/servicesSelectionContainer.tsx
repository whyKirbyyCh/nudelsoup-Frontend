import React from "react";
import styles from "../../styles/components/services/servicesSelectionContainer.module.css";

interface ServicesSelectionContainerProps {
    services: { id: number; name: string }[];
    selectedServices: number[];
    onSelectionChange: (selectedServices: number[]) => void;
    onServiceSelect?: (serviceName: string) => void; // New prop to handle specific service selection
}

const ServicesSelectionContainer: React.FC<ServicesSelectionContainerProps> = ({
                                                                                   services,
                                                                                   selectedServices,
                                                                                   onSelectionChange,
                                                                                   onServiceSelect,
                                                                               }) => {
    const handleCheckboxChange = (serviceId: number, serviceName: string) => {
        const isSelected = selectedServices.includes(serviceId);
        const newSelectedServices = isSelected
            ? selectedServices.filter((id) => id !== serviceId)
            : [...selectedServices, serviceId];
        onSelectionChange(newSelectedServices);

        // Call the onServiceSelect callback if a new service is selected
        if (onServiceSelect && !isSelected) {
            onServiceSelect(serviceName);
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
                            onChange={() => handleCheckboxChange(service.id, service.name)}
                        />
                        <span className={styles.serviceItemLabel}>{service.name}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default ServicesSelectionContainer;
