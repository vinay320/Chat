const express=require("express");
const app=express();
const http=require('http');
const path=require('path')
const server=http.createServer(app);  //passing an req handler
const socketio=require('socket.io')
const io=socketio(server);


app.use('/',express.static(path.join(__dirname,'public')));

const users={

};

io.on('connection',(socket)=>
{
   
    console.log(`Someone got connected!!! with the id -${socket.id}`);
    socket.on('send-msg',(data)=>
    {
        io.emit('rec-msg',{
            msg:data.msg,
            username:users[socket.id],
        });
    })

    socket.on('login',(data)=>
    {
       users[socket.id]=data.username;
    })
})

server.listen(process.env.PORT,()=>
{
    console.log("Server Started");
})





