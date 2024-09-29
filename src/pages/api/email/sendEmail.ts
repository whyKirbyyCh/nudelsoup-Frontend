import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

if (!process.env.RESEND_SECRET) {
    throw new Error("RESEND_SECRET is not set in environment variables");
}

const resend = new Resend(process.env.RESEND_SECRET);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { to, subject, html } = req.body;

        try {
            const response = await resend.emails.send({
                from: "hello@nudelsoup.com",
                to,
                subject,
                html,
            });

            console.log("Email response:", response);

            const messageId = (response as { id?: string }).id || "No ID available";

            res.status(200).json({ success: true, messageId });
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error sending email:", error.message);
                res.status(500).json({ success: false, error: error.message });
            } else {
                console.error("Unknown error:", error);
                res.status(500).json({ success: false, error: "An unknown error occurred" });
            }
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
