import websocket from "ws"
import minimist  from "minimist"
// import http from 'http'
// import {JsonRPC} from './jsonrpc';
// import JsonRpcClient from "kurento-jsonrpc"
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
// console.log(argv.port);
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

// WebSocketクライアント

// JSON-RPC 2.0 Marshal/Unmarshal
// var str = '{"jsonrpc": "2.0", "id": 1, "method": "ping", "params": {"interval": 240000}}'
const str = '{"jsonrpc": "2.0", "id": 1, "method": "ping", "params": {"interval": 240000}}'
//const obj = JSON.parse(str);

const wsClient = new websocket("ws://192.168.64.102:8888/kurento");
wsClient.on('open', function open() {
  console.log(str)
  wsClient.send(str);
});
wsClient.on('message', function incoming(data:string) {
  const obj = JSON.parse(data);
  console.log(obj);
});
