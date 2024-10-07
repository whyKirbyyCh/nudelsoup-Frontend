import React, { useState, useEffect } from "react";
import styles from "../../styles/components/account/accountCreationMarketContainer.module.css";
import PageButton from "@/components/page/pageButton";

interface AccountCreationMarketContainerProps {
    userId: number;
    onSubmit: () => void;
}

interface Product {
    productId: string;
    productTitle: string;
    productDescription: string;
}

interface Market {
    marketDescription?: string;
    targetAudience?: string;
    additionalFields?: { [key: string]: string };
    isAddingDetail?: boolean;
    newDetailLabel?: string;
    newDetailValue?: string;
}

const AccountCreationMarketContainer: React.FC<AccountCreationMarketContainerProps> = ({
                                                                                           userId,
                                                                                           onSubmit,
                                                                                       }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [markets, setMarkets] = useState<{ [key: string]: Market }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `/api/productDetails/productIdAndTitleByUserId?userId=${userId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    setError("Something went wrong while fetching all your products");
                    return;
                }

                const data = await response.json();

                if (data.products) {
                    setProducts(data.products);
                } else {
                    setError("No products found");
                }
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchProducts();
        }
    }, [userId]);

    useEffect(() => {
        const fetchMarkets = async (productIds: string[]) => {
            try {
                const response = await fetch(
                    `/api/productDetails/productMarketDetailsByProductId`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ productIds }),
                    }
                );

                if (!response.ok) {
                    setError("Something went wrong while fetching market details");
                    return;
                }

                const data = await response.json();

                if (data.markets) {
                    setMarkets(data.markets);
                } else {
                    setError("No market details found for these products");
                }
            } catch (error: any) {
                setError(error.message);
            }
        };

        if (products.length > 0) {
            const productIds = products.map((product) => product.productId);
            fetchMarkets(productIds);
        }
    }, [products]);

    const handleSubmit = async () => {
        const marketDataToSend = products.map((product) => ({
            productId: product.productId,
            marketDescription: markets[product.productId]?.marketDescription || "",
            targetAudience: markets[product.productId]?.targetAudience || "",
            additionalFields: markets[product.productId]?.additionalFields || {},
        }));

        try {
            const response = await fetch("/api/productDetails/productSetMarketDetails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ markets: marketDataToSend }),
            });

            if (!response.ok) {
                setError("Failed to save market details");
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            onSubmit();
        }
    };

    const clearDetails = () => {
        setMarkets({});
    };

    const handleMarketDescriptionChange = (productId: string, value: string) => {
        setMarkets((prevMarkets) => ({
            ...prevMarkets,
            [productId]: {
                ...prevMarkets[productId],
                marketDescription: value,
            },
        }));
    };

    const handleTargetAudienceChange = (productId: string, value: string) => {
        setMarkets((prevMarkets) => ({
            ...prevMarkets,
            [productId]: {
                ...prevMarkets[productId],
                targetAudience: value,
            },
        }));
    };

    const handleAdditionalFieldChange = (productId: string, key: string, value: string) => {
        setMarkets((prevMarkets) => ({
            ...prevMarkets,
            [productId]: {
                ...prevMarkets[productId],
                additionalFields: {
                    ...prevMarkets[productId]?.additionalFields,
                    [key]: value,
                },
            },
        }));
    };

    const addDetail = (productId: string) => {
        setMarkets((prevMarkets) => ({
            ...prevMarkets,
            [productId]: {
                ...prevMarkets[productId],
                isAddingDetail: true,
                newDetailLabel: "",
                newDetailValue: "",
            },
        }));
    };

    const handleNewDetailLabelChange = (productId: string, value: string) => {
        setMarkets((prevMarkets) => ({
            ...prevMarkets,
            [productId]: {
                ...prevMarkets[productId],
                newDetailLabel: value,
            },
        }));
    };

    const handleNewDetailValueChange = (productId: string, value: string) => {
        setMarkets((prevMarkets) => ({
            ...prevMarkets,
            [productId]: {
                ...prevMarkets[productId],
                newDetailValue: value,
            },
        }));
    };

    const saveNewDetail = (productId: string) => {
        const market = markets[productId];
        if (market?.newDetailLabel && market?.newDetailValue) {
            handleAdditionalFieldChange(productId, market.newDetailLabel, market.newDetailValue);
            setMarkets((prevMarkets) => ({
                ...prevMarkets,
                [productId]: {
                    ...prevMarkets[productId],
                    newDetailLabel: "",
                    newDetailValue: "",
                    isAddingDetail: false,
                },
            }));
        }
    };

    const cancelNewDetail = (productId: string) => {
        setMarkets((prevMarkets) => ({
            ...prevMarkets,
            [productId]: {
                ...prevMarkets[productId],
                newDetailLabel: "",
                newDetailValue: "",
                isAddingDetail: false,
            },
        }));
    };

    if (loading) {
        return <div className={styles.loading}>Loading market details...</div>;
    }

    if (error) {
        return <div className={styles.error}>You have not registered any products...</div>;
    }

    return (
        <div className={styles.marketContainer}>
            <div className={styles.marketContainerHeader}>
                <div className={styles.marketContainerTitle}>MARKET INFORMATION</div>
                <div className={styles.marketContainerDescription}>
                    The information you provide will help shape the marketing strategies
                    tailored to your company.
                    <br />
                    <br />
                    You can omit any details or update them later, but please note that
                    doing so may impact the effectiveness of your campaigns.
                    <br />
                    <br />
                    To improve the effectiveness, you can add additional details about
                    your organisation at the bottom of this window as you see fit.
                    <br />
                    <br />
                    As a Switzerland-based company, your data is safeguarded by some of
                    the world’s strongest privacy laws, ensuring top-tier protection.
                </div>
            </div>
            {products.map((product) => (
                <div key={product.productId} className={styles.productContainer}>
                    <div className={styles.productTitle}>{product.productTitle}</div>
                    <div className={styles.productDescription}>{product.productDescription}</div>

                    <div className={styles.formGroup}>
                        <label htmlFor="companyDescription" className={styles.label}>
                            DESCRIPTION:
                        </label>
                        <textarea
                            value={markets[product.productId]?.marketDescription || ""}
                            onChange={(e) =>
                                handleMarketDescriptionChange(product.productId, e.target.value)
                            }
                            placeholder="Enter market description"
                            className={styles.textareaInput}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="companyName" className={styles.label}>
                            TARGET AUDIENCE:
                        </label>
                        <input
                            type="text"
                            value={markets[product.productId]?.targetAudience || ""}
                            onChange={(e) =>
                                handleTargetAudienceChange(product.productId, e.target.value)
                            }
                            placeholder="Enter target audience"
                            className={styles.valueInput}
                        />
                    </div>

                    {markets[product.productId]?.additionalFields &&
                        Object.entries(markets[product.productId].additionalFields!).map(
                            ([key, value], index) => (
                                <div key={index} className={styles.formGroup}>
                                    <label className={styles.label}>{key.toUpperCase()}:</label>
                                    <input
                                        type="text"
                                        name={key}
                                        value={value}
                                        onChange={(e) =>
                                            handleAdditionalFieldChange(
                                                product.productId,
                                                key,
                                                e.target.value
                                            )
                                        }
                                        className={styles.valueInput}
                                    />
                                </div>
                            )
                        )}

                    {markets[product.productId]?.isAddingDetail && (
                        <div className={styles.newDetailForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="newDetailLabel" className={styles.label}>
                                    LABEL:
                                </label>
                                <input
                                    type="text"
                                    value={markets[product.productId]?.newDetailLabel || ""}
                                    onChange={(e) =>
                                        handleNewDetailLabelChange(
                                            product.productId,
                                            e.target.value
                                        )
                                    }
                                    className={styles.valueInput}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="newDetailValue" className={styles.label}>
                                    VALUE:
                                </label>
                                <input
                                    type="text"
                                    value={markets[product.productId]?.newDetailValue || ""}
                                    onChange={(e) =>
                                        handleNewDetailValueChange(
                                            product.productId,
                                            e.target.value
                                        )
                                    }
                                    className={styles.valueInput}
                                />
                            </div>
                            <div className={styles.formGroupButtonsDetail}>
                                <PageButton
                                    label={"SAVE"}
                                    onClick={() => saveNewDetail(product.productId)}
                                />
                                <PageButton
                                    label={"CANCEL"}
                                    onClick={() => cancelNewDetail(product.productId)}
                                />
                            </div>
                        </div>
                    )}

                    <div className={styles.formGroupButtons}>
                        <PageButton
                            label={"ADD DETAIL"}
                            onClick={() => addDetail(product.productId)}
                        />
                    </div>
                </div>
            ))}

            <div className={styles.formGroupButtons}>
                <PageButton label={"SUBMIT"} onClick={handleSubmit} />
                <PageButton label={"CLEAR"} onClick={clearDetails} />
            </div>
        </div>
    );
};

export default AccountCreationMarketContainer;
