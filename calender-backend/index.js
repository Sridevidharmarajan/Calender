const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database');
const todoRoutes = require('./routes/todos');

dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000; 

connectDB();


app.use(express.json());


app.use('/api/todos', todoRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
