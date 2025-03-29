import { FullNameType } from "../../library/types";
import { SendEMail } from "../../services/email.service";
import { ApiError } from "../api/ApiError";
import { ApiResponse } from "../api/ApiResponse";

// Define interface for email data
interface UserData {
  email: string;
  fullName: FullNameType;
  verificationCode: string;
}

// Send a welcome email
export const SendVerificationEmail = async ({
  email,
  fullName,
  verificationCode,
}: UserData): Promise<ApiResponse<boolean>> => {
  // Define the email data
  const SendVerificationEmailToUser = {
    to: email,
    subject: "Your Uber Verification Code",
    text: `Hi ${fullName.firstName}, your Uber verification code is ${verificationCode}. Please use this to verify your account.`,
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Uber Verification Code</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');
        
        body {
          font-family: 'Ubuntu', Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f7f7f7;
          color: #333;
          line-height: 1.6;
        }
        .email-container {
          width: 100%;
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }
        .header {
          background-color: #000000;
          padding: 30px 20px;
          text-align: center;
        }
        .header img {
          width: 120px;
          height: auto;
        }
        .content {
          padding: 30px;
        }
        .greeting {
          font-size: 24px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 20px;
        }
        .message {
          font-size: 16px;
          color: #555555;
          margin-bottom: 25px;
        }
        .verification-code-container {
          text-align: center;
          margin: 30px 0;
        }
        .verification-code {
          font-size: 36px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #000000;
          background-color: #f5f5f5;
          padding: 15px 30px;
          border-radius: 8px;
          display: inline-block;
          margin: 10px 0;
          border: 1px dashed #cccccc;
        }
        .divider {
          height: 1px;
          background-color: #eeeeee;
          margin: 30px 0;
        }
        .footer {
          font-size: 12px;
          text-align: center;
          color: #999999;
          padding: 20px;
          background-color: #fafafa;
        }
        .footer a {
          color: #999999;
          text-decoration: none;
        }
        .footer a:hover {
          text-decoration: underline;
        }
        .expiry-note {
          font-size: 14px;
          color: #ff6b00;
          text-align: center;
          font-weight: 500;
          margin-top: 10px;
        }
        .social-links {
          text-align: center;
          margin: 20px 0;
        }
        .social-links a {
          margin: 0 10px;
          display: inline-block;
        }
        .social-links img {
          width: 24px;
          height: 24px;
          opacity: 0.7;
          transition: opacity 0.3s;
        }
        .social-links img:hover {
          opacity: 1;
        }
        @media (max-width: 600px) {
          .content {
            padding: 20px;
          }
          .greeting {
            font-size: 20px;
          }
          .message {
            font-size: 15px;
          }
          .verification-code {
            font-size: 28px;
            padding: 12px 24px;
          }
        }
        #logo {
  filter: invert(100%);
}

      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header with Uber Black Background -->
        <div class="header">
          <img id="logo" src="https://imgs.search.brave.com/4ATIxs0SwT-DsZ4ajF7jlixEaXFqw5Ys2I5OFQa8JEM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n" alt="Uber Logo" width="120">
        </div>

        <!-- Main Content -->
        <div class="content">
          <h1 class="greeting">Hi ${fullName.firstName},</h1>
          
          <p class="message">
            Thanks for signing up with Uber. To complete your account setup, please use this verification code:
          </p>

          <!-- Verification Code Section -->
          <div class="verification-code-container">
            <div class="verification-code">${verificationCode}</div>
            <p class="expiry-note">This code expires in 5 minutes</p>
          </div>

          <p class="message">
            Enter this code in the Uber app to verify your account. If you didn't request this, please ignore this email or contact support if you have concerns.
          </p>

          <div class="divider"></div>

          <!-- Help Section -->
          <p class="message" style="text-align: center; font-size: 14px;">
            Need help? <a href="https://help.uber.com" style="color: #000000; font-weight: 500;">Visit our Help Center</a>
          </p>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div class="social-links">
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram"></a>
          </div>
          <p>Â© ${new Date().getFullYear()} Uber Technologies Inc.</p>
          <p>
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> | <a href="#">Contact Us</a>
          </p>
          <p>This email was sent to ${email}. If you'd rather not receive this kind of email, you can <a href="#">unsubscribe</a>.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  };

  try {
    // Send the email
    const info = await SendEMail(SendVerificationEmailToUser);

    // Return a success response
    return new ApiResponse(200, !!info, "Email sent successfully.");
  } catch {
    // Throw a custom API error with the error messages
    throw new ApiError(500, "Error sending email.", [
      "Error sending email. At ./utils/Mails/SendVerificationEmail.ts file",
    ]);
  }
};
