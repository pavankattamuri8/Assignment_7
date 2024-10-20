const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/app'); // Assuming your User model is located here
const { protect } = require('../middleware/auth'); // Importing the JWT auth middleware
const router = express.Router();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();  // Load environment variables
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Home page route
router.get('/', (req, res) => {
    res.render('index');
});

// Protected Profile page route, only accessible with valid JWT
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);  // req.user._id is populated by protect middleware
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.render('profile', { user });
    } catch (error) {
        res.status(500).json({ error: "Failed to load profile" });
    }
});

// Register user route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();

        // Create JWT Token after registration
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Store token in cookie
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({ message: "User created successfully", savedUser });
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
});

// Login user route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Create JWT token upon successful login
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Store token in cookie
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ error: "Failed to log in" });
    }
});

// Logout route to clear JWT cookie
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out successfully" });
});

// Attach the router
app.use(router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
