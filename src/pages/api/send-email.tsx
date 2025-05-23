// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
// const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 emails per windowMs
  message: "Too many emails sent from this IP, please try again after an hour",
  keyGenerator: (req: any) => req.ip,
  handler: (req: any, res: any) => {
    res.status(429).send({ message: emailLimiter.message });
  },
});

const handler = async (req: any, res: any) => {
  console.log("Received Request Method:", req.method);

  emailLimiter(req, res, async () => {
    if (req.method === "POST") {
      const { name, email, subject, message } = req.body;
      console.log("Request Body:", req.body);

      // Create transporter using environment variables
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER, // Use your Gmail address here
          pass: process.env.EMAIL_PASSWORD, // Use your app-specific password here
        },
      });

      // Verify transporter
      transporter.verify((error: any, success: boolean) => {
        if (error) {
          console.error("Transporter Verification Error:", error);
        } else {
          console.log("Transporter is ready to send emails");
        }
      });

      const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Your Gmail address here
        subject: subject,
        text: `From: ${name}\nEmail: ${email}\n\n${message}`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        res.status(200).json({ message: "Email sent successfully" });
      } catch (error: any) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: error.message });
      }
    } else {
      console.log("Invalid HTTP Method:", req.method);
      res.status(405).json({ error: "Method not allowed" });
    }
  });
};

export default handler;
