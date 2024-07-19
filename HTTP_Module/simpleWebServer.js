const http = require("http");

const server = http.createServer((req, res) => {
    //with setheader we can set a single header at a time
    res.setHeader('Content-Type', 'application/json');

    // getHeader gets the previously set header values
    const contentType = res.getHeader('Content-Type');
    console.log(contentType, "content type")

    //res.writeHead(statusCode, [statusMessage], [headers]): Sends a response header to the request.
    res.writeHead(200, "this is a response from server", { 'Content-Type': 'text/plain' })

    //res.end([data], [encoding], [callback]): Signals to the server that all response headers and body have been sent. 
    //the optional data argument allows sending a final chunk of data.
    res.end("helo");
})

server.listen(4200, () => {
    console.log("im running");
})