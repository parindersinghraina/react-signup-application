import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import express from 'express';
import * as bodyParser from 'body-parser';
import bcrypt from 'bcrypt'; // Import bcrypt

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
    password: String,
}));

// Routes
app.post('/api/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
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
                // Password is valid, user is authenticated
                return res.status(200).json({ message: 'Login successful' });
            }
        }

        // Password is invalid
        return res.status(401).json({ error: 'Invalid credentials' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
