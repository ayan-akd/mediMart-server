import nodemailer from 'nodemailer';
import config from '../config';

// Base email sending function
const sendEmail = async (email: string, html: string, subject: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: config.sender_email,
        pass: config.sender_app_pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Email configuration
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mailOptions: any = {
      from: '"MediMart" <support@medimart.com>',
      to: email,
      subject,
      html,
    };

    // Sending the email
    const info = await transporter.sendMail(mailOptions);
    // console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

// Email for Request Status Change
export const sendRequestStatusChangeEmail = async (
  email: string,
  orderId: string,
  newStatus: string,
) => {
  const subject = `Order Status Update - ${orderId}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Order Status Update</h2>
      <p>Dear User,</p>
      <p>Your order status for the <strong>${orderId}</strong> has been updated.</p>
      <p>Current Status: <span style="color: blue;">${newStatus}</span></p>
      <p>If you have any questions, please contact our support team.</p>
      <p>Best regards,<br>MediMart Team</p>
    </div>
  `;
  return sendEmail(email, html, subject);
};

// Email for Payment Confirmation
export const sendPaymentConfirmationEmail = async (
  email: string,
  orderId: string,
  paymentId: string,
  amount: number,
) => {
  const subject = `Payment Confirmation - ${orderId}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Payment Confirmation</h2>
      <p>Dear User,</p>
      <p>Your payment for the order <strong>${orderId}</strong> has been successfully processed.</p>
      <p>Payment Details:</p>
      <ul>
        <li>Order ID: ${orderId}</li>
        <li>Payment ID: ${paymentId}</li>
        <li>Amount Paid: $${amount.toFixed(2)}</li>
      </ul>
      <p>Thank you for your payment.</p>
      <p>Best regards,<br>MediMart Team</p>
    </div>
  `;

  return sendEmail(email, html, subject);
};
