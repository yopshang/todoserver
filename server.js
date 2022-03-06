const {v4: uuidv4} = require('uuid');
var http = require('http')
const todos = [];

const requestListener = (req, res) => {
    // console.log(req.url);
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json'
    }
    let body = '';
    req.on('data', chunk=>{
        body+=chunk
    })

    if(req.url == "/todos" && req.method == "GET"){
        req.on('end', ()=>{
            console.log(JSON.parse(body));
            res.writeHead(200, headers);
            res.write(JSON.stringify({
                "status": "success",
                "data": todos
            }));
            res.end();
        })
    } else if(req.url == "/todos" && req.method == "POST"){
        req.on('end', ()=>{
            const title = JSON.parse(body).title;
            const todo = {
                "title": title,
                "id": uuidv4()
            };
            todos.push(todo);
            console.log('post todo:', todo);
            res.writeHead(200, headers);
            res.write(JSON.stringify({
                "status": "success",
                "data": todos
            }));
            res.end();
        })
    }
    else if (req.method == "OPTIONS"){
        res.writeHead(200, headers);
        res.end();
    } else {
        res.writeHead(404, headers);
        console.log('404');
        res.write(JSON.stringify({
            "status": "false",
            "message": "無此網站路由"
        }));
        res.end();
    }
}
const server = http.createServer(requestListener);
server.listen(3005);
