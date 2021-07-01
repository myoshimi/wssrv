import websocket from 'ws'
import http from 'http'
// yarn add -D ws @types/ws

// WebSocketサーバ
// UnixドメインソケットでWebSocketを待ち受けるHTTPサーバ
// const hs: http.Server = http.createServer();
// const wss = new websocket.Server({server: hs})
// HTTPサーバのListen開始
// hs.listen(socketPath, () => {
//   console.log(`websocket server listening on ${socketPath}`);
// })
const wss = new websocket.Server({port:8000});

wss.on('connection', ws => {
  ws.send('hello, this is websocket server.');
  ws.on('message', message => {
    console.log(message);
    ws.send(message);
  })
  ws.on('close', () => {
    console.log('lost a client.');
  } )
})

