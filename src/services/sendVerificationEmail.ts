import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

const sendVerificationEmail = async (to: string, token: string) => {

  // Set up your nodemailer transporter with Mailgun
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 465,
    service: 'Mailgun',
    secure: false,
    auth: {
      user: process.env.MAILGUN_USER, 
      pass: process.env.MAILGUN_PASS, 
    },
  }as nodemailer.TransportOptions);

  // Set up your email options
  const mailOptions = {
    from: process.env.MAILGUN_USER,
    to: to,
    subject: 'Account Verification',
    html: `<p>Click the following link to verify your email: <a href="http://localhost:5001/api/verify/${token}">Verify</a></p>`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Email sent:');
    }
  });
};

export default sendVerificationEmail;
