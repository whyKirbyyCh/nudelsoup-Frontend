"use client";

import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import ConvertToSubCurrency from "@/lib/convertToSubCurrency";
import styles from "../../styles/components/checkout/checkoutPageOverview.module.css"

const CheckoutPageOverview = ({ amount }: { amount: number }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState<string>(""); // Name state
    const [consent, setConsent] = useState<boolean>(false); // Consent checkbox state
    const [nameError, setNameError] = useState<string | null>(null); // Error handling for name
    const [consentError, setConsentError] = useState<string | null>(null); // Error handling for consent

    useEffect(() => {
        fetch('/api/payment/createPaymentIntent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: ConvertToSubCurrency(amount) }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setClientSecret(data.clientSecret))
            .catch((error) => {
                console.error('Error fetching client secret:', error);
                setErrorMessage('Failed to initialize payment.');
            });
    }, [amount]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        // Clear previous errors
        setNameError(null);
        setConsentError(null);

        // Validate customer name and consent
        if (name.trim() === "") {
            setNameError("Please provide your name.");
            setLoading(false);
            return;
        }

        if (!consent) {
            setConsentError("You must agree to the terms and conditions.");
            setLoading(false);
            return;
        }

        if (!stripe || !elements) {
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
            },
        });

        if (error) {
            setErrorMessage(error.message);
        }

        setLoading(false);
    };

    const isNotStripeReady = !clientSecret || !stripe || !elements

    return (
        <div>
            {!isNotStripeReady && (
                <form onSubmit={handleSubmit} className={styles.checkoutPageOverviewForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="customer-name">Name</label>
                        <input
                            type="text"
                            id="customer-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className={styles.formInput}
                        />
                        {nameError && <div className={styles.error}>{nameError}</div>}
                    </div>

                    {/* Consent Checkbox */}
                    <div className={styles.formGroup}>
                        <label className={styles.consentLabel}>
                            <input
                                type="checkbox"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                            />
                            I agree to the terms and conditions
                        </label>
                        {consentError && <div className={styles.error}>{consentError}</div>}
                    </div>

                    {clientSecret && <PaymentElement />}

                    {errorMessage && <div className={styles.error}>{errorMessage}</div>}

                    <button
                        disabled={!stripe || loading}
                        className={styles.checkoutPageOverviewPaymentButton}
                    >
                        {!loading ? `Pay $${amount}` : "Processing..."}
                    </button>
                </form>
            )}
            {isNotStripeReady && (
                <div className={styles.checkoutPageOverviewContainer}>
                    <div className={styles.checkoutPageOverviewLoadingContainer} role="status">
                        <span className={styles.checkoutPageOverviewLoading}>Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPageOverview;
