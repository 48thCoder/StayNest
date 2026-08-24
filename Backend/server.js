const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const pgRoutes = require('./routes/pgRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/pgs', pgRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to StayNest API' });
});

const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
