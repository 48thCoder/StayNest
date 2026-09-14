const nodemailer = require('nodemailer');

/**
 * Send an email using Gmail SMTP
 * @param {Object} options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text version
 * @param {string} options.html - HTML content
 */
const sendEmail = async ({ to, subject, text, html }) => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_APP_PASSWORD;

  if (!emailUser || !emailPass) {
    console.warn('[EMAIL NOTICE] EMAIL_USER or EMAIL_APP_PASSWORD is not set in Backend/.env. Real-time email delivery was skipped.');
    return {
      sent: false,
      reason: 'MISSING_CREDENTIALS',
    };
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    tls: {
      rejectUnauthorized: false, // Bypass self-signed/intercepted cert errors for Gmail SMTP
    },
  });

  const mailOptions = {
    from: `"StayNest Support" <${emailUser}>`,
    to,
    subject,
    text,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`[EMAIL SUCCESS] Verification email sent to ${to}: ${info.messageId}`);
  return {
    sent: true,
    messageId: info.messageId,
  };
};

/**
 * Generates branded HTML template for Password Reset OTP
 */
const getPasswordResetTemplate = (name, otp) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your StayNest Password</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6f4; margin: 0; padding: 40px 20px; color: #2d2d2d;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); border: 1px solid #eaeaea;">
    <tr>
      <td style="padding: 36px 40px; text-align: center; background: linear-gradient(135deg, #FF5A5F, #E0484D);">
        <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">StayNest</h1>
        <p style="color: rgba(255, 255, 255, 0.85); margin: 6px 0 0; font-size: 14px;">Your Comfort Living Partner</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 36px 40px;">
        <h2 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 0 0 14px;">Password Reset Verification</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 24px;">
          Hello ${name || 'there'},<br>
          We received a request to reset your password for your StayNest account. Use the 6-digit verification code below to set a new password:
        </p>

        <div style="background-color: #f9fafb; border: 2px dashed #FF5A5F; border-radius: 12px; padding: 20px; text-align: center; margin: 0 0 24px;">
          <div style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #FF5A5F; font-family: monospace;">
            ${otp}
          </div>
          <p style="margin: 8px 0 0; font-size: 13px; color: #6b7280;">Valid for 10 minutes</p>
        </div>

        <p style="font-size: 14px; line-height: 1.6; color: #6b7280; margin: 0 0 16px;">
          If you did not request this password reset, please ignore this email or contact support if you suspect unauthorized access.
        </p>
        
        <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 28px 0;" />
        
        <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">
          StayNest &bull; Student & Working Professional Co-living<br>
          This is an automated security email, please do not reply.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

module.exports = { sendEmail, getPasswordResetTemplate };
