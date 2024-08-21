const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database'); // Ensure the path to database.js is correct
const todoRoutes = require('./routes/todos');
// Import the todo routes

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000; // Change port here


// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Use todo routes
app.use('/api/todos', todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
