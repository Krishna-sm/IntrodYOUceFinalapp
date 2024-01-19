let http =require('http');
let port = 9911;

let server = http.createServer((req,res)=>
{
    res.write("hi from http server")

    res.end();
})

server.listen(port);