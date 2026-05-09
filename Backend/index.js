const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const template = require("./EmailTemplate");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);
app.use(express.json());

// Simple special feature example (kept)
const specialMessages = [
  "Welcome! I'm Jerrome, and I'm glad you're exploring my work.",
  "Big things are built one line of code at a time. Keep building!",
  "Current Goal: Creating seamless user experiences through clean logic.",
  "I believe technology is at its best when it solves real-world problems.",
  "Thanks for stopping by! Feel free to reach out via the contact form below."
];

app.get("/api/special-feature", (req, res) => {
  const randomIndex = Math.floor(Math.random() * specialMessages.length);

  res.json({
    message: specialMessages[randomIndex],
    timestamp: new Date().toISOString(),
  });
});

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Contact endpoint
app.post("/api/contact", async (req, res) => {
  const { email, subject, message } = req.body || {};

  if (!email || !subject || !message) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    // Inside your app.post("/api/contact", ...)
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_TO,
      subject: `Portfolio: ${subject}`,
      replyTo: email,
      text: `New message from ${email}\n\n${message}`,
      html: template.generateEmailTemplate(email, subject, message), // Corrected call
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error sending contact email:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

