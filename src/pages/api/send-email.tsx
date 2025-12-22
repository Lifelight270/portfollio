import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
import { runMiddleware } from "@/lib/rateLimit"; // Adjust path as needed


// 10 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again in an hour.",
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, limiter); // 👈 Apply limiter

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;

  if (!user || !pass) {
    console.error("Missing EMAIL_USER or EMAIL_PASSWORD in environment.");
    return res.status(500).json({ error: "Email configuration error." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.verify();
  } catch (error) {
    console.error("Error verifying transporter:", error);
    return res.status(500).json({ error: "Failed to verify email service." });
  }

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: user,
    subject,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully." });
  } catch (error: unknown) {
    console.error("Email sending failed:", error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to send email." });
  }
};

export default handler;
