# Node.js Comprehensive Guide

This document provides a detailed overview of key Node.js modules and their functionalities, including HTTP, FS (File System), PATH, MongoDB, OS, and Express. Each section includes explanations, code examples, and best practices for usage.

## Table of Contents

1. [HTTP Module](#http-module)
2. [FS (File System) Module](#fs-file-system-module)
3. [PATH Module](#path-module)
4. [MongoDB Module](#mongodb-module)
5. [OS Module](#os-module)
6. [Express Module](#express-module)

---

## 1. HTTP Module

The `http` module allows Node.js to handle HTTP requests and responses, enabling the creation of HTTP clients and servers.

### Creating an HTTP Server

```javascript
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set response status and headers
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  // Send response
  res.end('Hello, World!\n');
});

// Listen to the created server on a specific port
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
```

### Key Components

- **`http.createServer(callback)`**: Creates a new HTTP server. The `callback` function receives:
  - `req` (IncomingMessage): Represents the incoming request.
  - `res` (ServerResponse): Represents the response to be sent back to the client.

- **IncomingMessage (`req`)**:
  - **Properties**:
    - `req.url`: URL of the request.
    - `req.method`: HTTP method (GET, POST, etc.).
    - `req.headers`: Object containing request headers.
  - **Methods**:
    - `req.on(event, callback)`: Listens for events like 'data', 'end', and 'error'.
    - `req.pipe(destination)`: Pipes the request data to a writable stream.

- **ServerResponse (`res`)**:
  - **Methods**:
    - `res.writeHead(statusCode, headers)`: Sends a response header to the client.
    - `res.write(data)`: Sends a chunk of the response body.
    - `res.end(data)`: Signals that the response has been completed.
    - `res.setHeader(name, value)`: Sets a single header value for the response.
    - `res.getHeader(name)`: Returns the value of a previously set header.
    - `res.removeHeader(name)`: Removes a previously set header.
    - `res.write(chunk, [encoding], [callback])`: Sends a chunk of the response body.
    - `res.end([data], [encoding], [callback])`: Signals that all response headers and body have been sent.

### Handling Redirects

To handle redirect requests:

```javascript
res.writeHead(301, { 'Location': '/new-page' });
```

---

## 2. FS (File System) Module

The `fs` module provides access to the file system for reading, writing, and manipulating files.

### Asynchronous vs. Synchronous Methods

- **Asynchronous Methods**: Non-blocking; preferred for I/O operations.
- **Synchronous Methods**: Blocking; use when performance is less of a concern.

### Key Methods

- **Asynchronous Methods**:
  - `fs.readFile(path, [options], callback)`: Reads the contents of a file.
  - `fs.writeFile(path, data, [options], callback)`: Writes data to a file.
  - `fs.appendFile(path, data, [options], callback)`: Appends data to a file.
  - `fs.rename(oldPath, newPath, callback)`: Renames a file.
  - `fs.readdir(path, [options], callback)`: Reads the contents of a directory.
  - `fs.unlink(path, callback)`: Deletes a file.
  - `fs.mkdir(path, [options], callback)`: Creates a directory.
  - `fs.exists(path, callback)`: Checks if a file or directory exists.

- **Synchronous Methods**:
  - `fs.readFileSync(path, [options])`: Reads the contents of a file.
  - `fs.writeFileSync(path, data, [options])`: Writes data to a file.
  - `fs.appendFileSync(path, data, [options])`: Appends data to a file.
  - `fs.renameSync(oldPath, newPath)`: Renames a file.
  - `fs.readdirSync(path, [options])`: Reads the contents of a directory.
  - `fs.unlinkSync(path)`: Deletes a file.
  - `fs.mkdirSync(path, [options])`: Creates a directory.
  - `fs.existsSync(path)`: Checks if a file or directory exists.

### Example

Reading a file asynchronously:

```javascript
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

---

## 3. PATH Module

The `path` module provides utilities for working with file and directory paths.

### Key Methods

- **`path.basename(path)`**: Returns the last portion of a path.
- **`path.resolve([...paths])`**: Resolves a sequence of paths or path segments into an absolute path.
- **`path.join([...paths])`**: Joins all given path segments together using the platform-specific separator and returns a normalized resulting path.
- **`path.dirname(path)`**: Returns the directory name of a path.
- **`path.extname(path)`**: Returns the extension of a path.
- **`path.parse(path)`**: Returns an object representing significant elements of the path.
- **`path.format(pathObject)`**: Returns a path string from an object.
- **`path.relative(from, to)`**: Returns the relative path from one path to another.

### Example

Joining paths:

```javascript
const path = require('path');

const fullPath = path.join(__dirname, 'folder', 'file.txt');
console.log(fullPath); // Outputs the full path to 'file.txt'
```

---

## 4. MongoDB Module

MongoDB is a NoSQL database that stores data in JSON-like documents.

### Key Concepts

- **Database**: A container for collections.
- **Collection**: A group of MongoDB documents.
- **Document**: A set of key-value pairs.
- **Field**: A key-value pair in a document.

### Queries

- **Comparison Operations**:
  - `$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte`
  ```javascript
  const query = { age: { $gte: 25 } };
  const docs = await collection.find(query).toArray();
  console.log(docs);
  ```

- **Logical Operations**:
  - `$and`, `$or`, `$not`
  ```javascript
  const query = { $or: [{ age: { $gt: 25 } }, { name: "Alice" }] };
  const docs = await collection.find(query).toArray();
  console.log(docs);
  ```

- **Projections**: Include or exclude specific fields in the returned documents.
  ```javascript
  const query = {};
  const options = { projection: { _id: 0, name: 1, age: 1 } };
  const docs = await collection.find(query, options).toArray();
  console.log(docs);
  ```

- **Aggregations**: Advanced data processing and transformations.
  - **Stages**: `$match`, `$group`, `$sort`, `$project`, `$limit`, `$skip`, `$unwind`

  Example of an aggregation pipeline:

  ```javascript
  const pipeline = [
    { $match: { age: { $gte: 25 } } },
    { $group: { _id: "$age", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ];
  const results = await collection.aggregate(pipeline).toArray();
  console.log(results);
  ```

---

## 5. OS Module

The `os` module provides operating system-related utility methods and properties.

### Key Methods

- **`os.platform()`**: Returns the operating system platform.
- **`os.arch()`**: Returns the operating system CPU architecture.
- **`os.cpus()`**: Returns an array of objects containing information about each CPU/core installed.
- **`os.freemem()`**: Returns the amount of free system memory in bytes.
- **`os.totalmem()`**: Returns the total amount of system memory in bytes.
- **`os.homedir()`**: Returns the home directory of the current user.
- **`os.tmpdir()`**: Returns the operating system's default directory for temporary files.

### Example

Getting system information:

```javascript
const os = require('os');

console.log(`Platform: ${os.platform()}`);
console.log(`Architecture: ${os.arch()}`);
console.log(`Total Memory: ${os.totalmem()} bytes`);
console.log(`Free Memory: ${os.freemem()} bytes`);
```

---

## 6. Express Module

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

### Basic Usage

```javascript
const express = require

('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
```

### Key Features

- **Routing**: Define routes and handle HTTP requests.
- **Middleware**: Use middleware functions to handle requests.
- **Request and Response**: Access request data and send responses.
- **Static Files**: Serve static files like HTML, CSS, and JavaScript.

### Example

Using middleware and routing:

```javascript
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware
});

app.get('/about', (req, res) => {
  res.send('About page');
});

app.post('/data', (req, res) => {
  res.json(req.body);
});
```

---

