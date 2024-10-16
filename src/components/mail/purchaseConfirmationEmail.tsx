import React from "react";
import PageButton from "@/components/page/pageButton";
import EmailFooter from "@/components/mail/emailFooter";
import EmailHeader from "@/components/mail/emailHeader";

interface PurchaseConfirmationEmailProps{
    name: string
}

const PurchaseConfirmationEmail: React.FC<PurchaseConfirmationEmailProps> = ({ name }) => {
    return `
    <div style="font-family: Arial, sans-serif; color: #333; width: 100%;">
      ${EmailHeader()}
      <div style="padding: 20px;">
        <p>Dear ${name},</p>
        <p>Thank you for your purchase. We are thrilled that you have chosen our product and hope it will bring you joy and satisfaction.</p>
        <p>If you have any questions or need any assistance, please do not hesitate to contact us. We are always here to help.</p>
        <p>Best regards,</p>
        <p>Nudelsoup</p>
      </div>
      ${EmailFooter()}
    </div>
  `;
};

export default PurchaseConfirmationEmail;
