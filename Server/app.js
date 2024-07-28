const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./db/db');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const rateLimit = require('express-rate-limit');
const xssClean = require('xss-clean');
const bodyParser = require('body-parser');
const apiRoutes = require('./apiRoutes');

dotenv.config(); // Load environment variables from .env file

connectDB(); // Connect to the database

const app = express();

// Middleware setup

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../Client/build')));

// Body parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Helmet for security headers
app.use(helmet());

// Additional Helmet configurations
app.use(helmet.frameguard()); // Prevent clickjacking
app.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', "1; mode=block");
  next();
});
app.use(helmet.noSniff()); // Prevent MIME type sniffing
app.use(helmet.ieNoOpen()); // Prevent IE from opening downloads in the site's context
app.use(helmet.hidePoweredBy()); // Hide the X-Powered-By header

// XSS Protection
app.use(xssClean());

// CORS setup
app.use(cors({
  origin: 'http://localhost:4200', // Replace with your frontend's URL in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CSRF Protection
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

// Endpoint to get CSRF token
app.get('/api/csrf-token', (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie('X-CSRF-Token', csrfToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
    sameSite: 'strict' // Ensures the cookie is only sent in a first-party context
  });
  res.json({ csrfToken });
});

// API Routes
app.use('/api', apiRoutes);

// Serve the index.html file for all other routes (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/build/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).json({ error: 'Invalid CSRF token' });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
