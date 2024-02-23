import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import express from 'express';
import * as bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import sendVerificationEmail from './sendVerificationEmail';

const app = express();
const PORT = 5001;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204, // Handle preflight response status
    allowedHeaders: 'Content-Type, Authorization', // Add any other headers needed
};

// Connect to MongoDB
const mongoOptions: ConnectOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
} as ConnectOptions;

mongoose.connect('mongodb://localhost:27017/react-signup-application', mongoOptions)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Use CORS middleware
app.use(cors(corsOptions));

// Body parser middleware
app.use(bodyParser.json());

// MongoDB User model
const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    verified: { type: Boolean, default: false },
    verificationToken: { type: String }
}));

app.post('/api/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Generate a verification token using UUID
        const verificationToken = uuidv4();

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password and verification token
        const newUser = new User({ username, email, password: hashedPassword, verificationToken });
        await newUser.save();

        // Send a verification email to the user
        await sendVerificationEmail(email, verificationToken);

        res.status(201).json({ message: 'User created successfully. Check your email for verification.' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Add a route to handle email verification
app.get('/api/verify/:token', async (req, res) => {
    try {
        const { token } = req.params;

        // Find the user with the provided verification token
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(404).json({ error: 'Invalid verification token' });
        }

        // Mark the user as verified
        user.verified = true;
        user.verificationToken = undefined; // Clear the verification token after verification
        await user.save();

        // Redirect to a success page or send a success response
        res.json({ message: 'Email verification successful' });
    } catch (error) {
        console.error('Error during email verification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user in the database
        const user = await User.findOne({ username });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Ensure both the password from the request and the stored hashed password are present
        if (password && user.password) {
            // Compare the hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                // Check if the user is verified
                if (user.verified) {
                    // Password is valid, user is authenticated and verified
                    return res.status(200).json({ message: 'Login successful', verified: user.verified });
                } else {
                    // User is not verified, return a 403 status
                    return res.status(403).json({ error: 'Account not verified. Please check your email for verification.' });
                }
            }
        }

        // Password is invalid
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
