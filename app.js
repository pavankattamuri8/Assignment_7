const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const app = express();

// Import the database connection
const connectDB = require("./config/db");

// Establish the connection to MongoDB
connectDB();


// Import routes from routes/app.js
const routes = require("./routes/app");

app.use("/", routes);

// Middleware for JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine to Pug
app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views')); 

// Serve static files from the "Assets" directory
app.use(express.static("Assets"));

// Use imported routes
app.use("/", routes);

// Set the server to listen on port 4000
const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
