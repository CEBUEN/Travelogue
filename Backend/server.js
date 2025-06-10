const express = require('express'); // Imports the Express framework for creating the server
const cors = require('cors'); // Imports CORS middleware to enable cross-origin requests
const bodyParser = require('body-parser'); // Imports middleware to parse incoming JSON requests
const bcrypt = require('bcrypt'); // Imports bcrypt library for securely hashing passwords
const jwt = require('jsonwebtoken'); // Imports JSON Web Token library for token-based authentication
const mongoose = require('mongoose'); // Imports Mongoose for interacting with MongoDB
require('dotenv').config(); // Loads environment variables from a .env file
console.log("DEBUG | MONGO_URI =", process.env.MONGO_URI); // <- Add this

const app = express(); // Initializes an Express app
const PORT = process.env.PORT || 3000; // Sets the server port to the value in .env or defaults to 3000
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Retrieves the JWT secret from .env or uses a fallback

// Middleware
app.use(cors()); // Enables cross-origin requests
app.use(bodyParser.json()); // Parses incoming requests with JSON payloads

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI; // Loads the MongoDB connection URI from the .env file
mongoose.connect(MONGO_URI) // Connects to MongoDB
    .then(() => console.log('Connected to MongoDB Atlas')) // Logs success message on successful connection
    .catch((error) => console.error('Error connecting to MongoDB:', error)); // Logs error message on failure

// Define Schemas and Models
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Username field must be unique
    passwordHash: { type: String, required: true }, // Stores the hashed password
});

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the note
    content: { type: String, required: true }, // Content of the note
    author: { type: String, required: true }, // Username of the note's author
});

const User = mongoose.model('User', userSchema); // Creates a User model from the schema
const Note = mongoose.model('Note', noteSchema); // Creates a Note model from the schema

// Middleware to authenticate JWT tokens
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; // Retrieves the Authorization header
    const token = authHeader && authHeader.split(' ')[1]; // Extracts the token from "Bearer TOKEN"

    if (!token) return res.status(401).json({ message: 'No token provided.' }); // Returns an error if no token

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token.' }); // Returns error for invalid token
        req.user = user; // Attaches the user data to the request object
        next(); // Proceeds to the next middleware or route handler
    });
}

// Signup Endpoint
app.post('/signup', async (req, res) => {
    const { username, password } = req.body; // Extracts username and password from the request body

    try {
        const existingUser = await User.findOne({ username }); // Checks if the username already exists
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists.' }); // Returns error if username exists
        }

        const passwordHash = await bcrypt.hash(password, 10); // Hashes the password

        const newUser = new User({ username, passwordHash }); // Creates a new user instance
        await newUser.save(); // Saves the user to the database
        res.status(201).json({ message: 'User created successfully.' }); // Returns success message
    } catch (error) {
        console.error('Signup Error:', error); // Logs any error
        res.status(500).json({ message: 'Internal server error.' }); // Returns a generic error message
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body; // Extracts username and password from the request body

    try {
        const user = await User.findOne({ username }); // Finds the user by username
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' }); // Returns error if user not found
        }

        const match = await bcrypt.compare(password, user.passwordHash); // Compares the entered password with the hashed password
        if (!match) {
            return res.status(400).json({ message: 'Invalid credentials.' }); // Returns error if passwords don't match
        }

        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' }); // Generates a JWT token
        res.json({ token }); // Returns the token to the client
    } catch (error) {
        console.error('Login Error:', error); // Logs any error
        res.status(500).json({ message: 'Internal server error.' }); // Returns a generic error message
    }
});

// Protected Route: Get Board Notes
app.get('/board', authenticateToken, async (req, res) => {
    try {
        const notes = await Note.find({ author: req.user.username }); // Fetches notes authored by the logged-in user
        res.json(notes); // Sends the notes as a response
    } catch (error) {
        console.error('Fetch Notes Error:', error); // Logs any error
        res.status(500).json({ message: 'Internal server error.' }); // Returns a generic error message
    }
});

// Protected Route: Add a New Note
app.post('/board', authenticateToken, async (req, res) => {
    const { title, content } = req.body; // Extracts the title and content from the request body
    const author = req.user.username; // Gets the username of the logged-in user

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' }); // Validates input
    }

    try {
        const newNote = new Note({ title, content, author }); // Creates a new note instance
        await newNote.save(); // Saves the note to the database
        res.status(201).json({ message: 'Note added successfully.' }); // Returns success message
    } catch (error) {
        console.error('Add Note Error:', error); // Logs any error
        res.status(500).json({ message: 'Internal server error.' }); // Returns a generic error message
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Logs the server URL
});
