import React from "react";
import styles from "../../styles/components/pageSVGElement.module.css";

interface PageSVGElementProps {
    svgSrc: string;
    alt?: string;
}

const PageSVGElement: React.FC<PageSVGElementProps> = ({ svgSrc, alt = "svg Element"}) => {
    return (
        <div className={styles.svgElementWrapper}>
            <img
                src={svgSrc}
                alt={alt}
                className={styles.svgElement}
            />
        </div>
    );
}

export default PageSVGElement