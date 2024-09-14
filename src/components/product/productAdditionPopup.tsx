import React from "react";
import styles from "../../styles/components/product/productAdditionPopup.module.css";
import PageButton from "@/components/page/pageButton";

interface Product {
    title: string;
    svgSrc: number;
    description: string;
}

interface ProductAdditionPopupProps {
    onClose: () => void;
    onAddProduct: (newProduct: Product) => void;
}

const ProductAdditionPopup: React.FC<ProductAdditionPopupProps> = ({ onClose, onAddProduct }) => {
    const [title, setTitle] = React.useState("");
    const [svgSrc, setSvgSrc] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [businessModel, setBusinessModel] = React.useState("B2C");
    const [productType, setProductType] = React.useState("technology");
    const [productMarket, setProductMarket] = React.useState("");

    const isFormValid = title !== "" && svgSrc !== "" && description !== "" && productMarket !== "";

    const handleSubmit = () => {
        if (!isFormValid) {
            return;
        }
        onAddProduct({
            title,
            svgSrc: parseInt(svgSrc, 10) || 0,
            description,
        });
        onClose();
        // TODO: add the save to db etc here
    };

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <div className={styles.popupContentTitle}>
                    ADD A PRODUCT
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>PRODUCT TITLE:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>ICON:</label>
                        <input
                            type="number"
                            value={svgSrc}
                            onChange={(e) => setSvgSrc(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>BUSINESS MODEL:</label>
                        <select
                            value={businessModel}
                            onChange={(e) => setBusinessModel(e.target.value)}
                            required
                        >
                            <option value="B2C">B2C</option>
                            <option value="B2B">B2B</option>
                            <option value="B2G">B2G</option>
                            <option value="C2C">C2C</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>PRODUCT TYPE:</label>
                        <select
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                            required
                        >
                            <option value="technology">TECHNOLOGY</option>
                            <option value="other">OTHER</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>MARKET:</label>
                        <input
                            value={productMarket}
                            onChange={(e) => setProductMarket(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>DESCRIPTION:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <PageButton
                            label={"SAVE"}
                            onClick={handleSubmit}
                        />
                        <PageButton label={"EXIT"} onClick={onClose} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductAdditionPopup;
