const express = require('express')
const path = require("path")
const app = express()
const port = 8081
const http = require('http').Server(app)
const io = require('socket.io')(http)

var usuarios = [];
var usuarioLastId = 0;

app.use(express.static('public_html'))

app.get('/',function(req,res){
    res.sendFile(path.resolve("public_html/index.html"))
})

io.on("connection",client =>{
    client.on("message", mensagem =>{
        mensagem = JSON.parse(mensagem)
        usuarios[client] = [client];
        switch(mensagem.type){
            case 'c':
                usuarios[client] = [client,mensagem.data, usuarioLastId]
                usuarioLastId +=1
                client.emit('message','Ola '+mensagem.data+' seu ID: '+usuarioLastId)
            break;
        }
    
 
    })
})

http.listen(port,function(){
    console.log('Servidor rodando no http://localhost:'+port)
})