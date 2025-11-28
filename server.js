// Simple WebSocket server for placeholder game
const WebSocket = require('ws');
const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });
// rooms: { [roomCode]: [ws, ws, ...] }
let rooms = {};
wss.on('connection', function connection(ws) {
  ws.room = null;
  ws.on('message', function incoming(message) {
    try {
      const data = JSON.parse(message);
      if (data.type === 'join') {
        // Join or create room
        ws.room = data.roomCode;
        if (!rooms[ws.room]) rooms[ws.room] = [];
        rooms[ws.room].push(ws);
        broadcastRoom(ws.room, `Player joined room: ${ws.room}. Players: ${rooms[ws.room].length}`);
      } else if (data.type === 'msg' && ws.room) {
        broadcastRoom(ws.room, `Player: ${data.text}`);
      }
    } catch (e) {
      ws.send('Invalid message format');
    }
  });
  ws.on('close', function() {
    if (ws.room && rooms[ws.room]) {
      rooms[ws.room] = rooms[ws.room].filter(client => client !== ws);
      broadcastRoom(ws.room, `A player left room: ${ws.room}. Players: ${rooms[ws.room].length}`);
      if (rooms[ws.room].length === 0) delete rooms[ws.room];
    }
  });
});
function broadcastRoom(room, msg) {
  if (!rooms[room]) return;
  rooms[room].forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}
console.log(`WebSocket server running on ws://localhost:${PORT}`);
