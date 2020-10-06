const http = require('http');
const fs = require('fs');
const path =require('path');
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req,res) => {
    //console.log(req.headers);
    console.log('Request for ' +req.url+ 'by method');
    //if method is GET
    if (req.method == 'GET') {
        let fileUrl;
        if(req.url == '/') {
            fileUrl = '/index.html';
        }
        else {
            fileUrl = req.url;
        }
    let filePath = path.resolve('./public'+fileUrl);
   //if ext is html
    const fileExt = path.extname(filePath);
    if(fileExt == '.html'){
        fs.exists(filePath, (exists) => {
            if (!exists) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end('<html><body><h1>Error 404: ' +fileUrl+ ' not found</h1></body></html>')
            return;
            }
            //if exist
            res.statusCode =200;
            res.setHeader('Content-Type' , 'text/html');
            //read the file form the file path and convert and include it to  to respond 
            fs.createReadStream(filePath).pipe(res);
        })
    }
    //if not html extension
    else {
        res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end('<html><body><h1>Error 404: ' +fileUrl+ ' not html</h1></body></html>');
            return;
    }
}
//if request method not GET
else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Error 404: ' +req.method+ ' not supported</h1></body></html>')
return;
}
})
server.listen(port, hostname, () => {console.log(`server running at http://${hostname}:${port}`)});