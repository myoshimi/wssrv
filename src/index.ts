import websocket from "ws"
import minimist from  "minimist"
import http from 'http'
// yarn add -D ws @types/ws

// コマンドライン引数の展開
const argv = minimist(process.argv.slice(2), {
  default: {
    port: 8000,
  },
})

// WebSocketサーバ
// UnixドメインソケットでWebSocketを待ち受けるHTTPサーバ
// const hs: http.Server = http.createServer();
// const wss = new websocket.Server({server: hs})
// HTTPサーバのListen開始
// hs.listen(socketPath, () => {
//   console.log(`websocket server listening on ${socketPath}`);
// })
console.log(argv.port);
const wss = new websocket.Server({port:argv.port});

wss.on('connection', ws => {
  //console.log(ws);
  ws.send('hello, this is websocket server.');
  ws.on('message', message => {
    console.log("Recv:" + message);
    ws.send(message);
  })
  ws.on('close', () => {
    console.log('lost a client.');
  } )
})

