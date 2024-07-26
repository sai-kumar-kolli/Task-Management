const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv')
const connectDB = require('./db/db');
const apiRoutes = require('./apiRoutes');

dotenv.config(); // to load the config for .env files

connectDB(); // to connect the database

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);


app.listen('3001', () => {
    console.log("im running on port 3001");
})


