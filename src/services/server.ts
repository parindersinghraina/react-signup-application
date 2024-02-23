// server.ts

import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import express from 'express';
import * as bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import sendVerificationEmail from './sendVerificationEmail';
import otpTwilio from './otpTwilio';

const app = express();
const PORT = 5001;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Authorization',
};

mongoose.connect('mongodb://localhost:27017/react-signup-application', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use(cors(corsOptions));
app.use(bodyParser.json());

const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    verified: { type: Boolean, default: false },
    verificationToken: { type: String },
    phoneNumber: String, // Added phoneNumber field for OTP
}));

app.post('/api/signup', async (req, res) => {
    try {
        const { username, email, password, phoneNumber } = req.body;
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        const verificationToken = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword, verificationToken, phoneNumber });
        await newUser.save();

        await sendVerificationEmail(email, verificationToken);
        await otpTwilio.sendOTP(phoneNumber); // Send OTP to the user's phone

        res.status(201).json({ message: 'User created successfully. Check your email for verification.' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (password && user.password) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                if (user.verified) {
                    return res.status(200).json({ message: 'Login successful', verified: user.verified });
                } else {
                    return res.status(403).json({ error: 'Account not verified. Please check your email for verification.' });
                }
            }
        }

        return res.status(401).json({ error: 'Invalid credentials' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/usercount', async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.json({ count: userCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
