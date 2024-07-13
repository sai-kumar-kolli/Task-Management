const http = require("http");

const server = http.createServer((req,res)=>{
    res.end("helo");
})

server.listen(4200, ()=>{
    console.log("im running");
})