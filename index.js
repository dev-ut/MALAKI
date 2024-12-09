const express = require("express");
const mongoose = require("mongoose");
const connectToMongoDB = require("./db"); // MongoDB connection setup file
const cors = require("cors");


const app = express();

// MongoDB Connection
connectToMongoDB(); // Ensure this is properly implemented in your db.js file

// Middleware for CORS
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

// Middleware for parsing JSON
app.use(express.json()); // Required to handle JSON data in request bodies

// Default route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// API Routes
app.use("/api", require("./routes/CreateUser")); // Route for handling user creation
// API Routes
app.use("/api", require("./routes/DisplayData")); // Route for handlig data display in a sequentail manner
// API Routes
app.use("/api", require("./routes/OrderData"));
// Start server
app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});
