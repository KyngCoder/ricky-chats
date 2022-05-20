const express = require('express')
const app = express()
const http = require('http')
const {Server} = require("socket.io")
const cors = require('cors')

app.use(cors())
app.use(express.json())

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
})

io.on('connection',(socket)=>{
    console.log(`user connected:${socket.id}`)

    socket.on('joinRoom',(data)=>{
        socket.join(data)
    })

    socket.on('sendMessage',(data)=>{
        socket.to(data.room).emit('receiveMessage',data)
    })
})

server.listen(5000,()=>{
    console.log('server is running')
})