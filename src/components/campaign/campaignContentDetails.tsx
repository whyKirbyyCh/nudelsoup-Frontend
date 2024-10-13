import React, { useState } from "react";
import styles from "../../styles/components/campaign/campaignContentDetails.module.css";
import PageButton from "@/components/page/pageButton";

interface CampaignContentDetailsProps {
    campaignId: string;
}

interface Detail {
    label: string;
    value: string;
    type?: string;
    options?: string[];
}

const CampaignContentDetails: React.FC<CampaignContentDetailsProps> = ({ campaignId }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const initialDetails: Detail[] = [
        { label: "CAMPAIGN TITLE", value: "campaign title" },
        {
            label: "PRODUCT",
            value: "Product 1",
            type: "selection",
            options: ["Product 1", "Product 2", "Product 3"],
        },
        { label: "TARGET AUDIENCE", value: "campaign target audience" },
        {
            label: "CAMPAIGN TYPE",
            value: "Type 1",
            type: "selection",
            options: ["Type 1", "Type 2", "Type 3"],
        },
        { label: "CAMPAIGN GOAL", value: "campaign goal" },
        { label: "START DATE", value: "2023-10-01", type: "date" },
    ];
    const [details, setDetails] = useState<Detail[]>(initialDetails);
    const [editedDetails, setEditedDetails] = useState<Detail[]>([]);

    const [isAddingDetail, setIsAddingDetail] = useState(false);
    const [newDetailLabel, setNewDetailLabel] = useState("");
    const [newDetailValue, setNewDetailValue] = useState("");

    const toggleEditMode = () => {
        setIsEditMode(true);
        setEditedDetails(JSON.parse(JSON.stringify(details)));
    };

    const toggleSave = () => {
        setDetails(editedDetails);
        setIsEditMode(false);
        setIsAddingDetail(false);
    };

    const toggleCancel = () => {
        setIsEditMode(false);
        setIsAddingDetail(false);
        setEditedDetails([]);
    };

    const addDetail = () => {
        setIsAddingDetail(true);
    };

    const saveNewDetail = () => {
        if (newDetailLabel && newDetailValue) {
            setEditedDetails([
                ...editedDetails,
                { label: newDetailLabel, value: newDetailValue },
            ]);
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

    const handleDetailChange = (index: number, newValue: string) => {
        const updatedDetails = [...editedDetails];
        updatedDetails[index].value = newValue;
        setEditedDetails(updatedDetails);
    };

    const displayedDetails = isEditMode ? editedDetails : details;

    return (
        <div className={styles.campaignDetailsContainer}>
            {displayedDetails.map((detail, index) => (
                <div key={index} className={styles.campaignDetail}>
                    <div className={styles.label}>{detail.label}: </div>
                    {isEditMode ? (
                        detail.type === "selection" ? (
                            <select
                                value={editedDetails[index].value}
                                onChange={(e) => handleDetailChange(index, e.target.value)}
                                className={styles.valueInput}
                            >
                                {detail.options?.map((option, idx) => (
                                    <option key={idx} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : detail.type === "date" ? (
                            <input
                                type="date"
                                value={editedDetails[index].value}
                                onChange={(e) => handleDetailChange(index, e.target.value)}
                                className={styles.valueInput}
                            />
                        ) : (
                            <input
                                type="text"
                                value={editedDetails[index].value}
                                onChange={(e) => handleDetailChange(index, e.target.value)}
                                className={styles.valueInput}
                            />
                        )
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
                            value={newDetailLabel}
                            onChange={(e) => setNewDetailLabel(e.target.value)}
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
                        <PageButton label="CANCEL" onClick={toggleCancel} />
                    </>
                ) : (
                    <PageButton label="EDIT" onClick={toggleEditMode} />
                )}
            </div>
        </div>
    );
};

export default CampaignContentDetails;
