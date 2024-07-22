# NodeJS
Basics of Node.JS

1. Module - HTTP

The http module allows Node.js to transfer data over the HyperText Transfer Protocol (HTTP). It can create both HTTP clients and servers.
It can handle HTTP requests and responses, manage headers, and control the HTTP status codes.

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set response status and headers
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  // Send response
  res.end('Hello, World!\n');
});

//listen to created server on specific port 
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

Key Components of the HTTP Module
    http.createServer(callback)

    This method creates a new HTTP server and sets up a request listener function. The callback function receives two arguments:
    req (IncomingMessage): Represents the incoming request.
    res (ServerResponse): Represents the response to be sent back to the client.
    IncomingMessage (req)

The req object contains information about the client's request.

    Properties:
        req.url: The URL of the request.
        req.method: The HTTP method (GET, POST, etc.).
        req.headers: An object containing request headers.
    Methods:
        req.on(event, callback): Listens for events like 'data', 'end', and 'error'.
        req.pipe(destination): Pipes the request data to a writable stream.
        ServerResponse (res)

The res object is used to send a response back to the client.
    Methods:
        res.writeHead(statusCode, headers): Sends a response header to the client.
        res.write(data): Sends a chunk of the response body.
        res.end(data): Signals that the response has been completed.
        res.writeHead(statusCode, [statusMessage], [headers]): Sends a response header to the request.
        res.setHeader(name, value): Sets a single header value for the response.
        res.getHeader(name): Returns the value of a previously set header.
        res.removeHeader(name): Removes a header that has been set previously.
        res.write(chunk, [encoding], [callback]): Sends a chunk of the response body.
        res.end([data], [encoding], [callback]): Signals to the server that all response headers and body have been sent. The optional data argument allows sending a final chunk of data.

To handle the redirect request use 
        res.writeHead(301, { 'Location': '/new-page' });

2.FS Module

The fs module provides access to interact with server file system. It allows to read, write, create, delete and many more operations
we have both async and synchronous file system methods. Use the async method to make event loop non blocking and use the synchronous when you running the script or usage is related to command line 
tools, where performance is not a concern.
  
    methods:
    1. fs.readFile() ,fs.readFileAsync()
    2. fs.writeFile() ,fs.writeFileAsync()
    3. fs.appendFile(), fs.appendFileAsync()
    4. fs.renameFile(), fs.renameFileAsync()
    5. fs.readdir(), fs.readdirAsync()
    6. fs.unlink(), fs.unlinkAsync()    
    7. fs.mkdir(), fs.mkdirAsync()
    8. fs.exists(), fs.existsAsync()

3. PATH Module

The path module in Node.js provides utilities for working with file and directory paths. It helps in handling and transforming file paths in a platform-independent way.
    1. path.basename(path) -> Returns the last portion of a path, similar to the Unix basename command.
    2. path.resolve(path) -> Resolves a sequence of paths or path segments into an absolute path.
    3. path.join(path1, path2, path3) -> Joins all given path segments together using the platform-specific separator and returns a normalized resulting path.
    4. path.dirname(__dirname) -> Returns the directory name of a path, similar to the Unix dirname command.
    5. path.extname(path) -> Returns the extension of the path from the last occurrence of the . (dot) character to the end of the string.
    6. path.parse() -> Returns an object whose properties represent significant elements of the path
    7. path.format() -> Returns a path string from an object, the opposite of path.parse
    8. path.relative() -> Returns the relative path from one path to another.

4. Mongodb Module
    MongoDB is a NoSQL database that uses a flexible, document-oriented data model. It stores data in JSON-like documents, which makes it easy to work with and highly scalable.

    Key Concepts:
    Database: A container for collections. Each database has its own set of files on the file system.
    Collection: A group of MongoDB documents. It is equivalent to an RDBMS table.
    Document: A set of key-value pairs (fields). Documents are analogous to rows in a relational database but much more flexible.
    Field: A key-value pair in a document. Fields are analogous to columns in a relational database. 

    Query:

    Comparasion operation
        $eq: Matches values that are equal to a specified value.
        $ne: Matches all values that are not equal to a specified value.
        $gt: Matches values that are greater than a specified value.
        $gte: Matches values that are greater than or equal to a specified value.
        $lt: Matches values that are less than a specified value.
        $lte: Matches values that are less than or equal to a specified value.

        ex: const query = { age: { $gte: 25 } };
            const docs = await collection.find(query).toArray();
            console.log(docs);

    
    Logical operations
        $and: Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
        $or: Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
        $not: Inverts the effect of a query expression and returns documents that do not match the query expression.

        ex: const query = { $or: [{ age: { $gt: 25 } }, { name: "Alice" }] };
            const docs = await collection.find(query).toArray();
            console.log(docs);

    Projections
        Projection is used to include or exclude specific fields in the returned documents.
            Example: Find documents with only the name and age fields
            const query = {};
            const options = { projection: { _id: 0, name: 1, age: 1 } };
            const docs = await collection.find(query, options).toArray();
            console.log(docs);

    Aggregations
        The MongoDB aggregation framework provides an advanced way to perform data processing and transformations.

        Basic Aggregation Pipeline
        An aggregation pipeline consists of multiple stages, each transforming the documents as they pass through the pipeline.

        Common Aggregation Stages
            $match: Filters documents to pass only the documents that match the specified condition(s) to the next pipeline stage.
            $group: Groups input documents by a specified identifier expression and applies the accumulator expression(s), if specified, to each group.
            $sort: Sorts all input documents and returns them to the next stage in sorted order.
            $project: Reshapes each document in the stream, such as by adding new fields or removing existing fields.
            $limit: Limits the number of documents passed to the next stage in the pipeline.
            $skip: Skips over the specified number of documents that pass into the stage and passes the remaining documents to the next stage in the pipeline.
            $unwind: Deconstructs an array field from the input documents to output a document for each element.