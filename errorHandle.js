function errorHandle(res, headers ,msg){
    res.writeHead(400, headers);
    res.write(JSON.stringify({
        "status": "false",
        "message": msg
    }));
}
module.exports = errorHandle;