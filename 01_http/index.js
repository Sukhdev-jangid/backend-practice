const http = require('http');

http.createServer((req,res)=>{
    console.log(req.method);
    if(req.method === "GET"){
        res.end("hello");
    }
}).listen(4000,()=>{
    console.log("server run")
})