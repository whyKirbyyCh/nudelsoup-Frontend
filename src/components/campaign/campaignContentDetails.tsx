import React, { useEffect, useState } from "react";
import styles from "../../styles/components/campaign/campaignContentDetails.module.css";
import PageButton from "@/components/page/pageButton";

interface CampaignContentDetailsProps {
    campaignId: string;
    userId: string;
}

interface Detail {
    label: string;
    value: string;
    type?: string;
    options?: string[];
}

interface Product {
    productId: string;
    productTitle: string;
    productDescription: string;
}

const CampaignContentDetails: React.FC<CampaignContentDetailsProps> = ({ campaignId, userId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [details, setDetails] = useState<Detail[]>([]);
    const [editedDetails, setEditedDetails] = useState<Detail[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isAddingDetail, setAddDetail] = useState(false);
    const [newDetailLabel, setNewDetailLabel] = useState("");
    const [newDetailValue, setNewDetailValue] = useState("");
    const [campaignData, setCampaignData] = useState<any>(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productResponse = await fetch(`/api/productDetails/productIdAndTitleByUserId?userId=${userId}`);
                if (!productResponse.ok) {
                    console.error("Error fetching products:", productResponse.statusText);
                    return;
                }

                const productData = await productResponse.json();

                if (!Array.isArray(productData.products)) {
                    return;
                }

                setProducts(productData.products as Product[]);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts().then();
    }, [campaignId, userId]);

    useEffect(() => {
        const fetchCampaignDetails = async (fetchedProducts: Product[]) => {
            try {
                const campaignResponse = await fetch(`/api/campaignDetails/campaignDetailsOverviewPage?campaignId=${campaignId}`);
                if (!campaignResponse.ok) {
                    return;
                }
                const campaignData = await campaignResponse.json();
                const campaign = campaignData.campaign;

                if (!campaign) {
                    console.error("Campaign not found");
                    return;
                }

                setCampaignData(campaign);

                const initialDetails: Detail[] = [
                    { label: "CAMPAIGN TITLE", value: campaign.title },
                    {
                        label: "PRODUCT",
                        value: fetchedProducts.find(product => product.productId === campaign.productId)?.productTitle || "",
                        type: "selection",
                        options: fetchedProducts.map((product: Product) => product.productTitle),
                    },
                    { label: "TARGET AUDIENCE", value: campaign.targetAudience },
                    {
                        label: "CAMPAIGN TYPE",
                        value: campaign.campaignType,
                        type: "selection",
                        options: ["Type 1", "Type 2", "Type 3"],
                    },
                    { label: "CAMPAIGN GOAL", value: campaign.campaignGoal },
                    { label: "START DATE", value: campaign.startDate, type: "date" },
                    ...Object.entries(campaign.additionalFields || {}).map(([key, value]) => ({
                        label: key,
                        value: value as string,
                    })),
                ];
                setDetails(initialDetails);
            } catch (error) {
                console.error("Error fetching campaign details:", error);
            }
        };

        fetchCampaignDetails(products).then();
    }, [products]);

    const toggleEditMode = () => {
        setIsEditing(true);
        setEditedDetails(JSON.parse(JSON.stringify(details)));
    };

    const toggleSave = async () => {
        setDetails(editedDetails);
        setIsEditing(false);
        setAddDetail(false);
        
        const dataToSend: any = {};
        
        const additionalFields: { [key: string]: string } = {};

        editedDetails.forEach((detail) => {
            const { label, value } = detail;
            switch (label) {
                case "CAMPAIGN TITLE":
                    dataToSend.title = value;
                    break;
                case "PRODUCT":
                    dataToSend.productTitle = value;
                    const product = products.find((p) => p.productTitle === value);
                    dataToSend.productId = product ? product.productId : "";
                    break;
                case "TARGET AUDIENCE":
                    dataToSend.targetAudience = value;
                    break;
                case "CAMPAIGN TYPE":
                    dataToSend.campaignType = value;
                    break;
                case "CAMPAIGN GOAL":
                    dataToSend.campaignGoal = value;
                    break;
                case "START DATE":
                    dataToSend.startDate = value;
                    break;
                default:
                    additionalFields[label] = value;
                    break;
            }
        });
        
        dataToSend.userId = userId;
        dataToSend.campaignId = campaignId;
        
        dataToSend.stillActive = campaignData?.stillActive ?? true;
        dataToSend.svgSrc = campaignData?.svgSrc ?? "";
        
        dataToSend.additionalFields = additionalFields;
        
        if (
            !dataToSend.userId ||
            !dataToSend.productId ||
            !dataToSend.productTitle ||
            !dataToSend.campaignId ||
            !dataToSend.title ||
            !dataToSend.targetAudience ||
            !dataToSend.campaignType ||
            !dataToSend.campaignGoal ||
            !dataToSend.startDate ||
            dataToSend.stillActive == null ||
            dataToSend.svgSrc == null
        ) {
            console.error("All fields are required.");
            setMessage("All fields are required.");
            return;
        }

        try {
            const response = await fetch(`/api/campaignDetails/campaignUpdateDetails?campaignId=${campaignId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                console.error("Failed to update campaign:", response.statusText);
                setMessage("Failed to update campaign.");
            } else {
                console.log("Campaign updated successfully");
                setMessage("Campaign updated successfully.");
            }
        } catch (error) {
            console.error("Error updating campaign:", error);
            setMessage("Error updating campaign.");
        }
    };

    const toggleCancel = () => {
        setIsEditing(false);
        setAddDetail(false);
        setEditedDetails([]);
    };

    const addDetail = () => {
        setAddDetail(true);
    };

    const saveNewDetail = () => {
        if (newDetailLabel && newDetailValue) {
            setEditedDetails([
                ...editedDetails,
                { label: newDetailLabel, value: newDetailValue },
            ]);
            setNewDetailLabel("");
            setNewDetailValue("");
            setAddDetail(false);
        }
    };

    const cancelNewDetail = () => {
        setNewDetailLabel("");
        setNewDetailValue("");
        setAddDetail(false);
    };

    const handleDetailChange = (index: number, newValue: string) => {
        const updatedDetails = [...editedDetails];
        updatedDetails[index].value = newValue;
        setEditedDetails(updatedDetails);
    };

    const displayedDetails = isEditing ? editedDetails : details;

    return (
        <div className={styles.campaignDetailsContainer}>
            {displayedDetails.map((detail, index) => (
                <div key={index} className={styles.campaignDetail}>
                    <div className={styles.label}>{detail.label}: </div>
                    {isEditing ? (
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

            {isEditing && isAddingDetail && (
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

            {message && <div className={styles.message}>{message}</div>}

            <div className={styles.buttonsContainer}>
                {isEditing ? (
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
