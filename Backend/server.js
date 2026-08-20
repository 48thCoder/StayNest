const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const pgRoutes = require('./routes/pgRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/pgs', pgRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to StayNest API' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
