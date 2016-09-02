var express = require('express');
var app     = express();
var server  = require("http").createServer(app);
var io      = require("socket.io").listen(server);

app.use(express.static(__dirname));
app.use(express.static("/public"));

app.get('/',function(request,response){
    response.sendFile(__dirname +"/index.html");
});

io.sockets.on('connection',function(socket){
    socket.on("mesaj_post",function(data,callback){
        var message = data.trim();
        if(message==""){
            callback("Oops!");
        }else{  
            io.emit("mesaj_get",message);
        }
    });
});


var _port = process.env.PORT || 8081;
server.listen(_port,"192.168.1.79");
console.log("Start \"192.168.1.79:"+_port+"\"");