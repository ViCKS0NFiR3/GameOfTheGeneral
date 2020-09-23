const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

let player1 = "";
let player2 = "";
let currentPlayer = 1;
io.on('connection', socket => {
  let allConnectedClients = Object.keys(io.sockets.connected);
  player1 = allConnectedClients[0];
  player2 = allConnectedClients[1];
  console.log(allConnectedClients);
  if (player1 != null && player2 != null){
    io.sockets.connected[player1].emit("isPlayer1","true");
    io.sockets.connected[player2].emit("isPlayer1","false");
  } 
  console.log(`${socket.id}`);
  socket.on('board', ({ squares }) => {
    if(currentPlayer == 1 ? currentPlayer = 2: currentPlayer = 1);
    io.emit('board', { squares }, currentPlayer)
  })
  socket.on('gameEnd', (winner) => {
    io.emit('gameEnd', winner)
  })
})

http.listen(4000, function() {
  console.log('listening on port 5000');
})
