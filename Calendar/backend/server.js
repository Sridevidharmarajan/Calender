const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const eventRoutes = require('./routes/events');

app.use('/events', eventRoutes);


// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('your_mongodb_connection_string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${5000}`);
});
