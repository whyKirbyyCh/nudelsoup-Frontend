import React from "react";
import styles from "../../styles/components/mail/purchaseConfirmationEmail.module.css";
import PageButton from "@/components/page/pageButton";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

interface PurchaseConfirmationEmailProps{
    name: string
}

const PurchaseConfirmationEmail: React.FC<PurchaseConfirmationEmailProps> = ({ name }) => {
    return (
        <div>
            <div className={styles.header}>
                <Header navOptions={[]} disableNavigation={true} iconSize={"large"}  fontSizeVariant={"large"} showButtons={false}/>
            </div>
            <div className={styles.mainText}>
                Dear {name},
                <br/><br/>
                Thank you for your purchase. We are thrilled that you have chosen our product and hope it will bring you joy and satisfaction.
                <br/><br/>
                If you have any questions or need any assistance, please do not hesitate to contact us. We are always here to help.
                <br/><br/>
                Best regards,
                <br/><br/>
                nudelsoup
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default PurchaseConfirmationEmail;
