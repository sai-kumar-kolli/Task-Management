# Task Management Client

This project is a client-side application for managing tasks. It provides a user-friendly interface to create, update, and delete tasks, with integrated security best practices.

## Features

- **Create Tasks**: Add new tasks with a title, description, and status.
- **Update Tasks**: Edit existing tasks.
- **Delete Tasks**: Remove tasks.
- **CSRF Protection**: Secure against Cross-Site Request Forgery attacks.
- **Input Sanitization**: Ensure all user inputs are sanitized using `DOMPurify`.
- **Secure Cookies**: Utilize secure, HttpOnly, and SameSite cookies for CSRF tokens.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/sai-kumar-kolli/task-management-client.git
    cd task-management-client
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the development server**:

    ```bash
    npm start
    ```

    This will start the application on `http://localhost:3000`.

## Code Overview

### TaskForm Component

- **Description**: Handles creating and updating tasks.
- **Security**: Uses `DOMPurify` to sanitize inputs.

### TaskList Component

- **Description**: Displays tasks with options to edit and delete.

### API Integration

- **Description**: Uses Redux Toolkit's `createAsyncThunk` for API requests.
- **Security**: Includes CSRF token in headers for protected routes.

### CSRF Protection

- **Implementation**: CSRF token fetched on initial page load and stored in a secure cookie.

## Contributing

1. **Fork the repository**.
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`.
3. **Commit your changes**: `git commit -m 'Add your feature'`.
4. **Push to the branch**: `git push origin feature/your-feature-name`.
5. **Create a pull request**.

