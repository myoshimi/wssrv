const websocket = require("ws")
const minimist  = require("minimist")
// import http from 'http'
// import {JsonRPC} from './jsonrpc';
// import JsonRpcClient from "kurento-jsonrpc"
// コマンドライン引数の展開
// import kurentoUtils from 'kurento-utils'
// import kurento from 'kurento-client'
var kurento = require('kurento-client');

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

wss.on('connection', function connection(ws:any, req:Request) {
  var sessionId = null;
  var request = req;
  var response = {
      writeHead : {}
  };
  //console.log(ws);
  /*
  sessionHandler(request, response, function(err:string) {
    sessionId = request.session.id;
    console.log('Connection received with sessionId ' + sessionId);
  });
  */

  ws.send('hello, this is websocket server.');
  ws.on('message', function incoming(message:Buffer) {
    console.log("Recv:" + message);
    ws.send(message);
  })
  ws.on('close', function close() {
    console.log('lost a client.');
  } )
})

// WebSocketクライアント

// JSON-RPC 2.0 Marshal/Unmarshal
// var str = '{"jsonrpc": "2.0", "id": 1, "method": "ping", "params": {"interval": 240000}}'
//const obj = JSON.parse(str);

const wsClient = new websocket("ws://192.168.64.102:8888/kurento");

wsClient.on('open', function open() {
  const str = '{"jsonrpc": "2.0", "id": 1, "method": "ping", "params": {"interval": 240000}}'
  console.log("Open():" + str)
  wsClient.send(str);
});
wsClient.on('message', function incoming(data:string) {
  const obj = JSON.parse(data);
  console.log(obj);
  // wsClient.close();
});
wsClient.on('close', function close(){
  console.log("Close()");
});

console.log("kurento-client")
/*
var videoInput;
var videoOutput;
var webRtcPeer;

function onOffer(error, offerSdp) {
	if(error) return onError(error);

	console.info('Invoking SDP offer callback function ' + location.host);
	var message = {
		id : 'start',
		sdpOffer : offerSdp
	}
	sendMessage(message);
}

var options = {
  localVideo: videoInput,
  remoteVideo: videoOutput,
  onicecandidate : onIceCandidate
}

webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options, function(error) {
  if(error) return onError(error);
  this.generateOffer(onOffer);
});
*/

var kurentoClient = null;
var _kurentoClient = null;
var ws_uri = "ws://192.168.64.102:8888/kurento"

/*
kurento(ws_uri, null, function(error:any, _kurentoClient:any) {
  if(error){
    console.log("Could not find media server at address " + ws_uri)
  }
  kurentoClient = _kurentoClient;
})
*/
// kurento(ws_uri, undefined);
kurento(ws_uri, function(error:Error, kurentoClient:any) {
    if(error){
      console.log("Could not find media server at address " + ws_uri)
    }
    kurentoClient.create('MediaPipeline', function(error:Error, pipeline:any){
      if(error){
        console.log("MediaPipeline"+error)
      }
      createMediaElements(pipeline, wsClient, function(error:Error, webRtcEndpoint:any){
        if (error) {
          pipeline.release();
          // return callback(error);
        }

      })
    });
});

function createMediaElements(pipeline:any, ws:any, callback:any) {
  pipeline.create('WebRtcEndpoint', function(error:Error, webRtcEndpoint:any) {
      if (error) {
          return callback(error);
      }

      return callback(null, webRtcEndpoint);
  });
}
// 接続をスタートする
/*
function getKurentoClient(callback:(error:Error, kurentoClient)=>void){
  console.log("getKurentoClient");
  // KurentoClientを作り，コールバック関数を呼ぶ
  kurento(ws_uri, function(error:Error, _kurentoClient:any) {
    if(error){
      console.log("Could not find media server at address " + ws_uri)
      return callback(new Error("Could not find media server at address" + argv.ws_uri
                      + ". Exiting with error " + error.message), _kurentoClient);
    }
    kurentoClient = _kurentoClient;
    console.log("kurento: " + kurentoClient);
    return callback(error, kurentoClient);
  })
}

var sessionId = null;
// セッションIDを設定，通常は，クライアントから来たリクエストのセッションIDを使う

getKurentoClient((error:Error, kurentoClient)=>{
});
*/
