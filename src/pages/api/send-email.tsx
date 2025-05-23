import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
    auth: {
      user,
      pass,
    },
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
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully." });
  } catch (error: any) {
    console.error("Email sending failed:", error);
    return res
      .status(500)
      .json({ error: error.message || "Failed to send email." });
  }
};

export default handler;
