const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Received a GET request');
  } else if (req.method === 'POST') {
    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    let body = "";
    //data is the event emitted by the request
    req.on('data', (data) => {
      body = body + data.toString()
    })
    //end is the event emitted by the request
    req.on('end', () => {
      // res.write(body);
      res.end(`Received a POST request ${body}`);
    });

    //this is to handle redirect requests
  } else if (req.method === 'GET' && req.url === '/old-page') {
    res.writeHead(301, { 'Location': '/new-page' });
    res.end();
  }
  else if(req.method === 'GET' && req.url === '/new-page') {
    res.writeHead(200);
    res.end("This is a new page");
  }
  else if (req.method === 'GET' && req.url === '/about') {
    res.write("Hello I am from about");
    res.end();
  }
  else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});