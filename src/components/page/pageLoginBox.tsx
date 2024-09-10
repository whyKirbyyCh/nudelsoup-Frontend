'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../../styles/components/pageLoginBox.module.css';
import PageTextField from '@/components/page/pageTextField';
import PagePasswordField from '@/components/page/pagePasswordField';
import PageButton from '@/components/page/pageButton';

const PageLoginBox: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [apiErrorMessage, setApiErrorMessage] = useState('');

    useEffect(() => {
        const checkAuthCookie = async () => {
            const cookies = document.cookie.split('; ').find(row => row.startsWith('authToken='));
            if (cookies) {
                router.push('/account-overview');
            }
        };

        checkAuthCookie().then();
    }, [router]);

    const handleLoginClick = async () => {
        setEmailErrorMessage('');
        setApiErrorMessage('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailErrorMessage('Please enter a valid email address.');
            return;
        }

        await makeRequest();
    };

    const makeRequest = async () => {
        try {
            const response = await fetch('/api/userLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const contentType = response.headers.get('content-type');

                if (contentType?.includes("application/json")) {
                    const data = await response.json();
                    if (response.status === 404) {
                        setEmailErrorMessage('User not found. Please check your email.');
                    } else if (response.status === 401) {
                        setApiErrorMessage('Invalid credentials. Please check your password.');
                    } else {
                        setApiErrorMessage(data.message || 'An unexpected error occurred.');
                    }
                } else {
                    setApiErrorMessage('An unexpected error occurred. Please try again.');
                }
                return;
            }

            router.push('/account-overview');
        } catch (error) {
            setApiErrorMessage('An unexpected error occurred while processing your request.');
        }
    };

    return (
        <div className={styles.loginBox}>
            <div className={styles.loginTitle}>LOGIN</div>
            <div className={styles.loginBoxItem}>
                <div className={styles.loginBoxItemName}>EMAIL:</div>
                <PageTextField
                    placeholder={'Enter your email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={styles.loginBoxItem}>
                <div className={styles.loginBoxItemName}>PASSWORD:</div>
                <PagePasswordField
                    placeholder={'Enter your password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={styles.loginBoxItemButton}>
                <PageButton label={'LOGIN'} onClick={handleLoginClick} />
            </div>
            <div className={styles.loginBoxItemError}>
                {emailErrorMessage && <p>{emailErrorMessage}</p>}
                {apiErrorMessage && <p>{apiErrorMessage}</p>}
            </div>
            <div className={styles.loginBoxItemLink}>
                <Link href={'register'} className={styles.loginLink}>
                    DON'T HAVE AN ACCOUNT? REGISTER HERE!
                </Link>
            </div>
        </div>
    );
};

export default PageLoginBox;
