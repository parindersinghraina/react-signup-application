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
          <p>Click the following link to verify your email: <a href="http://localhost:5001/api/verify/${token}">Verify</a></p>`,
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