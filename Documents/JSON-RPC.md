# Kurentoとの接続をテストする


- [Kurento API over JSON-RPC](https://doc-kurento.readthedocs.io/en/stable/features/kurento_protocol.html#kurento-api-over-json-rpc)

以下のようなJSON文字列をKMSに発行すると，pongが返ってくる

```json
{"jsonrpc": "2.0", "id": 1, "method": "ping", "params": {"interval": 240000}}
```

```bash
wscat -c ws://192.168.64.102:8888/kurento
Connected (press CTRL+C to quit)
> {"jsonrpc": "2.0", "id": 1, "method": "ping", "params": {"interval": 240000}}
< {"id":1,"jsonrpc":"2.0","result":{"value":"pong"}}
```

# Typescript

- [https://www.npmjs.com/package/json-rpc-2.0](https://www.npmjs.com/package/json-rpc-2.0)
- [json-rpc-2.0 (Github)](https://github.com/shogowada/json-rpc-2.0)
