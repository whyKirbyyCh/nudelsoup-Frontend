import React from "react";
import styles from "../../styles/components/product/productAdditionPopup.module.css";

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
    const [title, setTitle] = React.useState('');
    const [svgSrc, setSvgSrc] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
                <h2>Add New Product</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </label>
                    <label>
                        SVG Src:
                        <input type="number" value={svgSrc} onChange={(e) => setSvgSrc(e.target.value)} required />
                    </label>
                    <label>
                        Description:
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </label>
                    <div className={styles.buttonGroup}>
                        <button type="submit">Add Product</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductAdditionPopup;
