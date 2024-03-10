import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import * as config from '../config.json';

const sendVerificationEmail = async (to: string, token: string) => {
  // Ensure AWS SES source email is defined
  const sourceEmail = config.AWS_SES_SOURCE_EMAIL;

  if (sourceEmail === undefined) {
    console.error(`AWS SES source email is not defined.`);
    return;
  }

  // Set the AWS credentials
  const ses = new SESClient({ region: 'us-east-2' });

  // Define the email parameters
  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
          <html>
            <head>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f4f4f4;
                  color: #333;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                  background-color: #3498db;
                  color: #fff;
                  padding: 10px;
                  text-align: center;
                  border-radius: 10px 10px 0 0;
                }
                .content {
                  padding: 20px;
                }
                .verification-link {
                  display: inline-block;
                  padding: 10px 20px;
                  font-size: 16px;
                  background-color: #2ecc71;
                  color: #ff4057;
                  text-decoration: none;
                  border-radius: 5px;
                  transition: background-color 0.3s ease;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>Account Verification</h2>
                </div>
                <div class="content">
                  <p>Thank you for signing up! Click the following link to verify your email:</p>
                  <a class="verification-link" href="http://localhost:5001/api/verify/${token}" target="_blank" rel="noopener noreferrer">Verify Email</a>
                </div>
              </div>
            </body>
          </html>
          `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Account Verification',
      },
    },
    Source: sourceEmail,
  };

  try {
    // Send the email
    await ses.send(new SendEmailCommand(params));
    console.log('***********************Email sent successfully***********************');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendVerificationEmail;
