import React, { useState } from "react";
import styles from "../../styles/components/product/productDetailsContainer.module.css";
import PageButton from "@/components/page/pageButton";

interface ProductDetailsContainerProps {
    productId: string;
}

interface Detail {
    label: string;
    value: string;
}

const ProductDetailsContainer: React.FC<ProductDetailsContainerProps> = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const initialDetails: Detail[] = [
        { label: "PRODUCT TITLE", value: "product title" },
        { label: "PRODUCT ICON", value: "product icon" },
        { label: "BUSINESS MODEL", value: "product business model" },
        { label: "PRODUCT TYPE", value: "product type" },
        { label: "MARKET", value: "product market" },
        { label: "DESCRIPTION", value: "product description" },
    ];
    const [details, setDetails] = useState<Detail[]>(initialDetails);
    const [editedDetails, setEditedDetails] = useState<Detail[]>([]);

    const [isAddingDetail, setIsAddingDetail] = useState(false);
    const [newDetailLabel, setNewDetailLabel] = useState("");
    const [newDetailValue, setNewDetailValue] = useState("");

    const toggleEditMode = () => {
        setIsEditMode(true);
        // Deep copy of details to editedDetails
        setEditedDetails(JSON.parse(JSON.stringify(details)));
    };

    const toggleSave = () => {
        setDetails(editedDetails); // Save the edited details
        setIsEditMode(false);
        setIsAddingDetail(false);
        // Implement additional save functionality here if needed
    };

    const toggleCancel = () => {
        setIsEditMode(false);
        setIsAddingDetail(false);
        setEditedDetails([]); // Clear editedDetails
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
        <div className={styles.productDetailsContainer}>
            {displayedDetails.map((detail, index) => (
                <div key={index} className={styles.productDetail}>
                    <div className={styles.label}>{detail.label}: </div>
                    {isEditMode ? (
                        <input
                            type="text"
                            value={editedDetails[index].value}
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

export default ProductDetailsContainer;
