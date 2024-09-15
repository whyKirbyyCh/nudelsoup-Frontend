import React from "react";
import styles from "../../styles/components/product/productAdditionPopup.module.css";
import PageButton from "@/components/page/pageButton";
import { useRouter} from "next/navigation";

interface Product {
    title: string;
    svgSrc: number;
    description: string;
    id: number;
}

interface ProductAdditionPopupProps {
    onClose: () => void;
    onAddProduct: (newProduct: Product) => void;
}

const ProductAdditionPopup: React.FC<ProductAdditionPopupProps> = ({ onClose, onAddProduct }) => {
    const [title, setTitle] = React.useState("");
    const [svgSrc, setSvgSrc] = React.useState<number | null>(0);
    const [description, setDescription] = React.useState("");
    const [businessModel, setBusinessModel] = React.useState("B2C");
    const [productType, setProductType] = React.useState("technology");
    const [productMarket, setProductMarket] = React.useState("");
    const [productLink, setProductLink] = React.useState("");
    const router = useRouter();

    const isFormValid = title !== "" && svgSrc !== null && description !== "" && productMarket !== "" && productLink !== "";

    const productIcons = [
        { id: 0, href: "productIcons/default-project-icon.svg" },
        { id: 1, href: "productIcons/ai-project-icon.svg" },
        { id: 2, href: "productIcons/configuration-project-icon.svg" },
        { id: 3, href: "productIcons/data-project-icon.svg" },
        { id: 4, href: "productIcons/database-project-icon.svg" },
        { id: 5, href: "productIcons/ecommerce-project-icon.svg" },
        { id: 6, href: "productIcons/networking-project-icon.svg" },
        { id: 7, href: "productIcons/video-project-icon.svg" },
    ];

    const handleSubmit = () => {
        if (!isFormValid || svgSrc === null) {
            return;
        }

        const hashTitle = (title: string) => {
            let hash = 0;
            for (let i = 0; i < title.length; i++) {
                hash = hash * 31 + title.charCodeAt(i);
                hash = hash & hash;
            }
            return Math.abs(hash);
        };

        const newProductId = hashTitle(title) + Date.now();

        onAddProduct({
            id: newProductId,
            title,
            svgSrc,
            description,
        });
        onClose();
        // TODO: add the save to db etc here
    };

    const directToCustom = () => {
        router.push("/product-creation");
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
                        <div className={styles.iconGrid}>
                            {productIcons.map((icon) => (
                                <img
                                    key={icon.id}
                                    src={`/${icon.href}`}
                                    alt={`Icon ${icon.id}`}
                                    className={`${styles.icon} ${svgSrc === icon.id ? styles.selectedIcon : ''}`}
                                    onClick={() => setSvgSrc(icon.id)}
                                />
                            ))}
                        </div>
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
                    <div className={styles.formGroup}>
                        <label>LINK:</label>
                        <input
                            value={productLink}
                            onChange={(e) => setProductLink(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <PageButton label={"SAVE"} onClick={handleSubmit}/>
                        <PageButton label={"CUSTOMISE"} onClick={directToCustom}/>
                        <PageButton label={"EXIT"} onClick={onClose}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductAdditionPopup;
