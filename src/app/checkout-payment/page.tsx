"use client";

import convertToSubCurrency from "@/lib/convertToSubCurrency";
import CheckoutPageOverview from "@/components/checkout/checkoutPageOverview";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./checkout-paymentPage.module.css";
import Header from "@/components/header/header";
import PageTitle from "@/components/page/pageTitle";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Page() {
    const amount = 49.99;

    return (
        <div className={styles.checkoutPaymentPageContainer}>
            <div className={styles.header}>
                <Header navOptions={[]} showButtons={false} fontSizeVariant={"large"} iconSize={"large"} disableNavigation={true} />
            </div>
            <div className={styles.paymentPageTitle}>
                <PageTitle title={"PAYMENT PAGE"} size={4} />
            </div>
            <div className={styles.paymentPageContent}>
                <Elements
                    stripe={stripePromise}
                    options={{
                        mode: "subscription",
                        amount: convertToSubCurrency(amount),
                        currency: "usd",
                    }}
                >
                    <CheckoutPageOverview amount={amount} />
                </Elements>
            </div>
        </div>
    );
}