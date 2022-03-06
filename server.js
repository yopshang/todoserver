const {v4: uuidv4} = require('uuid');
const http = require('http')
const errorHandle = require('./errorHandle')
const todos = [];

const requestListener = (req, res) => {
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
            try {
                const title = JSON.parse(body).title;
                if(title !== undefined){
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
                } else {
                    errorHandle(res, headers, "欄位未填寫正確")
                }
            } catch(error){
                errorHandle(res, headers, "資料格式錯誤")
            }
            res.end();
        })
    } else if(req.url == "/todos" && req.method == "DELETE"){
        req.on('end', ()=>{
            console.log(JSON.parse(body));
            res.writeHead(200, headers);
            res.write(JSON.stringify({
                "status": "success",
                "delete": "yes"
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
