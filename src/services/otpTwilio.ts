import { Twilio } from 'twilio';
import * as config from '../config.json';

const twilioClient = new Twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

async function sendOTP(phoneNumber: string): Promise<void> {
    try {
        // Generate a 6-digit OTP
        const otp = generateOTP(); 
        
        await twilioClient.messages.create({
            body: `Your OTP is: ${otp}`,
            from: config.TWILIO_PHONE_NUMBER,
            to: phoneNumber,
        });
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw error;
    }
}

function generateOTP(): string {
    // Generate a random 6-digit number
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  }

export default {
    sendOTP,
};
