import React, { useState, useEffect } from "react";
import styles from "../../styles/components/product/productDetailsContainer.module.css";
import PageButton from "@/components/page/pageButton";

interface ProductDetailsContainerProps {
    productId: string;
}

interface Detail {
    label: string;
    value: string;
}

const ProductDetailsContainer: React.FC<ProductDetailsContainerProps> = ({ productId }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [details, setDetails] = useState<Detail[]>([]);
    const [editedDetails, setEditedDetails] = useState<Detail[]>([]);
    const [isAddingDetail, setIsAddingDetail] = useState(false);
    const [newDetailLabel, setNewDetailLabel] = useState("");
    const [newDetailValue, setNewDetailValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/productDetails/productDetails?productId=${productId}`);
                if (!response.ok) {
                    setError("An error occurred while fetching product details");
                }
                const data = await response.json();

                const fetchedDetails: Detail[] = [
                    { label: "PRODUCT TITLE", value: data.product.productTitle },
                    { label: "PRODUCT ICON", value: data.product.productIcon },
                    { label: "BUSINESS MODEL", value: data.product.productBusinessModel },
                    { label: "PRODUCT TYPE", value: data.product.productType },
                    { label: "MARKET", value: data.product.productMarket },
                    { label: "DESCRIPTION", value: data.product.productDescription },
                ];

                setDetails(fetchedDetails);
                setIsLoading(false);
            } catch (error: any) {
                console.error(error);
                setError("An error occurred while fetching product details");
                setIsLoading(false);
            }
        };

        fetchProductDetails().then();
    }, [productId]);

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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error}</div>;
    }

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
