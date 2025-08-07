import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 3000
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

//-------------------------------------------------------
const __dirname= dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);
const socketio = new Server(server);


//--------------------------------------------------------
app.get('/', (req, res) => {
    res.sendFile(join(__dirname,'public','index.html'))
});

socketio.on("connection",(socket)=>{
    socket.on("message",(message)=>{
    socketio.emit("sendMessage",{message,id:socket.id})
    })
})

server.listen(PORT, () => { console.log(`server running at http://localhost:${PORT}`)
});
