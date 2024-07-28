# Task Management Backend

This is the backend server for the Task Management application. It is built with Node.js, Express, and MongoDB, and includes several security best practices.

## Features

- **CRUD Operations**: Create, read, update, and delete tasks.
- **Security**: Implemented best practices for securing the application.
  - **CSRF Protection**: Prevent Cross-Site Request Forgery attacks.
  - **Input Validation and Sanitization**: Ensure all user inputs are sanitized.
  - **Rate Limiting**: Limit the number of requests to the server to prevent abuse.
  - **Helmet**: Set various HTTP headers for security.
  - **CORS**: Enable Cross-Origin Resource Sharing for secure interactions.
  - **Sensitive Data Protection**: Ensure sensitive data is protected.

## Prerequisites

- Node.js
- npm
- MongoDB

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/sai-kumar-kolli/task-management-backend.git
   cd task-management-backend
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Create a `.env` file** in the root directory and add your environment variables:
   ```env
   PORT=3001
   CORS_ORIGIN="http://localhost:4200"
   MONGO_URI=mongodb://localhost:27017/taskmanager
   ```

4. **Start the development server**:
   ```sh
   npm run dev
   ```

## Available Scripts

### `npm start`

Runs the app in production mode.

### `npm run dev`

Runs the app in development mode with nodemon.

## Security Best Practices

### CSRF Protection

- **What is CSRF?**
  Cross-Site Request Forgery (CSRF) is an attack that tricks the victim into submitting a malicious request. It inherits the identity and privileges of the victim to perform an undesired function on their behalf.

- **How it's implemented?**
  Using `csurf` middleware to generate and validate CSRF tokens.

- **Code Implementation**:
  ```javascript
  const csurf = require('csurf');
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
  ```

### Input Validation and Sanitization

- **Why validate and sanitize inputs?**
  To prevent injection attacks, such as SQL injection and XSS (Cross-Site Scripting), by ensuring that user inputs do not contain malicious code.

- **Code Implementation**:
  ```javascript
  const xssClean = require('xss-clean');
  app.use(xssClean());
  ```

### Rate Limiting

- **Why use rate limiting?**
  To protect the server from being overwhelmed by too many requests in a short period, which can be a result of DDoS attacks.

- **Code Implementation**:
  ```javascript
  const rateLimit = require('express-rate-limit');

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  });

  app.use(limiter);
  ```

### Helmet

- **Why use Helmet?**
  Helmet helps secure Express apps by setting various HTTP headers.

- **Code Implementation**:
  ```javascript
  const helmet = require('helmet');
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
  ```

### CORS

- **Why use CORS?**
  To allow restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.

- **Code Implementation**:
  ```javascript
  const cors = require('cors');

  app.use(cors({
    origin: 'http://localhost:4200', // Replace with your frontend's URL in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
  ```

### Sensitive Data Protection

- **Why protect sensitive data?**
  To ensure that sensitive data such as passwords and tokens are not exposed to unauthorized users.

- **Code Implementation**:
  Use environment variables for sensitive data and ensure they are not hardcoded in the application.

  ```javascript
  const dotenv = require('dotenv');
  dotenv.config();

  ```

## API Endpoints

### Tasks

- **GET /api/tasks**: Get all tasks
- **POST /api/tasks**: Create a new task
- **PUT /api/tasks/:id**: Update a task
- **DELETE /api/tasks/:id**: Delete a task

## Error Handling

Error handling middleware is used to catch and handle errors gracefully.

- **Code Implementation**:
  ```javascript
  app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
      res.status(403).json({ error: 'Invalid CSRF token' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  ```

## Deployment

### Build the Client

Make sure to build the React client before deploying the backend.

1. **Navigate to the client directory**:
   ```sh
   cd Client
   ```

2. **Build the client**:
   ```sh
   npm run build
   ```

### Deploy the Server

1. **Go back to the root directory**:
   ```sh
   cd ..
   ```

2. **Start the server**:
   ```sh
   npm start
   ```

## Contributing

1. **Fork the repository**.
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`.
3. **Commit your changes**: `git commit -m 'Add your feature'`.
4. **Push to the branch**: `git push origin feature/your-feature-name`.
5. **Create a pull request**.

