import nodemailer from "nodemailer";

// Define interface for email data
interface EmailData {
  to: string;
  subject: string;
  text: string;
  html: string;
}

// Send an email function
export const SendEMail = async ({
  to,
  subject,
  text,
  html,
}: EmailData): Promise<any> => {
  try {
    // Create a transporter object using your SMTP service or transporter config
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your preferred service
      auth: {
        user: process.env.EMAIL_ID, // Ensure you store sensitive info securely
        pass: process.env.EMAIL_PASSWORD, // Environment variables are ideal here
      },
    });

    // Send the email
    const info = await transporter.sendMail({
      from: `Uber <${process.env.EMAIL_ID}>`, // Corrected sender address
      to, // recipient address
      subject, // Subject line
      text, // plain text body
      html, // HTML body
    });

    // Return the email info
    return info;
  } catch {
    // Handle errors
    return null;
  }
};
