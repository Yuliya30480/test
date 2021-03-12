const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(function(request,response){

    /** switch favicon request off */
    if (request.url === '/favicon.ico') {
        response.writeHead(200, {'Content-Type': 'image/x-icon'} );
        response.end();
        //console.log('favicon requested');
        return;
    }

    console.log(request.headers);

    response.writeHead(200);

    let urlParsed = url.parse(request.url, true);
    console.log(urlParsed);

    if (urlParsed.pathname === '/') {
        fs.readFile('./index.html', function(error, data){
            if(error){
                response.statusCode = 404;
                response.end("Resourse not found!");
            }   
            else {
                response.end(data);
            }
        });
    } else if (urlParsed.pathname === '/server' && urlParsed.query) {
        response.end( JSON.stringify(urlParsed.query));
    } else {
        response.statusCode = 404; // Not Found
        response.end("Page not found");
    }

}).listen(8080);
console.log("Server has started.");

/*function test() {
    let m = "Привет"
    return function test2() {
        alert(m);
    }
}

let l = test();
*/




