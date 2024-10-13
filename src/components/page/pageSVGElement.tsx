import React from "react";
import styles from "../../styles/components/pageSVGElement.module.css";
import Image from "next/image";

interface PageSVGElementProps {
    svgSrc: string;
    alt?: string;
}

const PageSVGElement: React.FC<PageSVGElementProps> = ({ svgSrc, alt = "svg Element"}) => {
    return (
        <div className={styles.svgElementWrapper}>
            <Image
                src={svgSrc}
                alt={alt}
                className={styles.svgElement}
            />
        </div>
    );
}

export default PageSVGElement