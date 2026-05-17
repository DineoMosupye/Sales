const nodemailer = require("nodemailer");

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
  });
}

function formatDetails(details) {
  return Object.entries(details)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

async function sendRequestEmail({ to, subject, request }) {
  const transporter = createTransporter();
  const text = [
    `Request Type: ${request.requestType}`,
    `Customer Name: ${request.customerName}`,
    `Customer Email: ${request.customerEmail}`,
    `Customer Phone: ${request.customerPhone}`,
    `Company: ${request.company}`,
    `Seal Type: ${request.sealType || "N/A"}`,
    "",
    "Details:",
    formatDetails(request.details || {}),
    "",
    `Notes: ${request.notes || "N/A"}`,
  ].join("\n");

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
    to,
    subject,
    text,
  });
}

module.exports = { sendRequestEmail };
