"use client";

import convertToSubCurrency from "@/lib/convertToSubCurrency";
import CheckoutPage from "@/components/checkout/checkoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./checkout-paymentPage.module.css";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Page() {
    const amount = 49.99;

    return (
        <div className={styles.container}>
            <div>
                <h1>Sonny</h1>
                <h2>
                    has requested
                    <span> ${amount}</span>
                </h2>
            </div>

            <Elements
                stripe={stripePromise}
                options={{
                    mode: "subscription",
                    amount: convertToSubCurrency(amount),
                    currency: "usd",
                }}
            >
                <CheckoutPage amount={amount} />
            </Elements>
        </div>
    );
}