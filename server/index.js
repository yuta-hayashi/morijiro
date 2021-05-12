const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: ":80",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})

io.on('connection', socket => {
    console.log(`socket_id: ${socket.id} is connected.`)

    // send-msgイベントを受け取ったらブロードキャストする
    socket.on('send-msg', msg => {
        socket.broadcast.emit('new-msg', msg)
        console.log(`receive message: ${JSON.stringify(msg)}`)
    })
})

server.listen(81)