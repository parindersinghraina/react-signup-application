import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import sendVerificationEmail from './sendVerificationEmail';
import * as config from '../config.json';
import path from 'path';

const app = express();
const PORT = 5001;

interface SignupRequestBody {
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
}

interface LoginRequestBody {
    username: string;
    password: string;
}

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Authorization',
};

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

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
    phoneNumber: String,
}));

app.post('/api/signup', async (req: Request<{}, {}, SignupRequestBody>, res: Response) => {
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

        res.status(201).json({ message: 'User created successfully. Check your email for verification.' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add this route for handling email verification tokens
app.get('/api/verify/:token', async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        // Handle email verification logic here
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            // Invalid token
            return res.status(400).json({ error: 'Invalid verification token' });
        }

        // Mark the user as verified (you might want to update other user properties as needed)
        user.verified = true;
        user.verificationToken = undefined; // Optional: Clear the verification token
        await user.save();

        // Redirect or send a response as needed
        // For example, redirect to a success page
        res.redirect('/verification-success');
    } catch (error) {
        console.error('Error during email verification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/login', async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
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
                    // Login successful, generate JWT
                    const token = jwt.sign({ username: user.username, userId: user._id }, config.JWT_SECRET, { expiresIn: '1h' });

                    // Send the token in the response
                    return res.status(200).json({ message: 'Login successful', verified: user.verified, token });
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

app.get('/api/usercount', async (req: Request, res: Response) => {
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
