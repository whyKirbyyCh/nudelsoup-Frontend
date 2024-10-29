import { connectToDatabase } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import CryptoJS from "crypto-js"

export interface CreatePostsRequest {
    userId: string;
    productId: string;
    campaignId: string;
    services: Record<string, boolean>;
    sscop: boolean;
    cpop: boolean;
    sspop: boolean;
    ppsop: boolean;
}

export interface CreatePostsResponse {
    posts: Record<string, Record<string, string>>
    message: string
}

const encryptData = (data: string, keyBase64: string, ivBase64: string): string => {
    const key = CryptoJS.enc.Base64.parse(keyBase64);
    const iv = CryptoJS.enc.Base64.parse(ivBase64);

    const encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CreatePostsResponse | { message: string }>
){
    if (req.method !== "PUT") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { userId, productId, campaignId, services, sscop, cpop, sspop, ppsop } = req.body as CreatePostsRequest;

    if (!userId || !services) {
        console.log(userId, services, sscop, cpop, sspop, ppsop)
        return res.status(400).json({ message: "Missing required fields" });
    }

    const forwardedFor = req.headers["x-forwarded-for"];
    const ip = Array.isArray(forwardedFor)
        ? forwardedFor[0]
        : forwardedFor?.split(",")[0] || req.headers["x-real-ip"] || req.socket.remoteAddress;

    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const password = user.password;
    const username = user.username;

    const dataToEncrypt = `${userId}:${password}`;
    const secretKey = process.env.SECRET_KEY;
    const iv = process.env.SECRET_IV;

    if (!secretKey || !iv) {
        return res.status(500).json({ message: "Server configuration error: SECRET_KEY or SECRET_IV is missing" });
    }

    const token = encryptData(dataToEncrypt, secretKey, iv);

    const company = await db.collection("organisations").findOne({ "userId": userId });

    const product = await db.collection("products").findOne({ _id: new ObjectId(productId) });

    const companyInfo = {
        company_name: company?.organisationName,
        company_description: company?.organisationDescription,
        company_country: company?.country,
        company_size: company?.numberOfPeople.toString(),
        company_age: company?.age.toString(),
        company_industry: company?.industry,
        ...Object.fromEntries(
            Object.entries(company?.additionalFields || {}).map(
                ([key, value]) => [`additional_${key}`, value]
            )
        ),
    };

    const productInfo = {
        product_name: product?.productTitle,
        product_description: product?.productDescription,
        product_business_model: product?.productBusinessModel,
        product_market: product?.productMarket,
        product_type: product?.productType,
        ...Object.fromEntries(
            Object.entries(product?.additionalFields || {}).map(
                ([key, value]) => [`additional_${key}`, value]
            )
        ),
    };

    const backendUri = process.env.PYTHON_URL;

    const payload = {
        request_info: {
            ip: ip,
            request_id: "1",
            product_id: productId,
            campaign_id: campaignId,
            services: services,
            sscop: sscop,
            cpop: cpop,
            sspop: sspop,
            ppsop: ppsop,
        },
        account_info: {
            username: username,
            token: token,
        },
        company_info: companyInfo,
        product_info: productInfo,
    };

    try {
        const response = await fetch(`${backendUri}/api/get_posts`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            return res.status(response.status).json({ message: "Error from backend request" });
        }

        const responseData = await response.json();

        console.log(responseData);

        return res.status(200).json({
            posts: responseData,
            message: responseData.message,
        });
    } catch (error) {
        console.error("Error making backend request:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}