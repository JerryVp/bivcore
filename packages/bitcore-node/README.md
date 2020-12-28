# Bitcore Node

**A full node with extended capabilities using Bitcoin Value Core.**

## Setup Guide

### Example bitcore.config.json

Set up your bitcore.config.json file in ./bivcore

```json
{
  "bivcoreNode": {
    "chains": {
      "BIV": {
        "mainnet": {
          "chainSource": "p2p",
          "trustedPeers": [
            {
              "host": "127.0.0.1",
              "port": 8332
            }
          ],
          "rpc": {
            "host": "127.0.0.1",
            "port": 8333,
            "username": "admin",
            "password": "1"
          }
        },
        "regtest": {
          "chainSource": "p2p",
          "trustedPeers": [
            {
              "host": "127.0.0.1",
              "port": 8332
            }
          ],
          "rpc": {
            "host": "127.0.0.1",
            "port": 8333,
            "username": "admin",
            "password": "1"
          }
        }
      }
    }
  }
}
```

Then start the node

```sh
npm run node
```

// TO-DO: update docs
## API Documentation

- [REST API parameters and example responses](./docs/api-documentation.md)

- [Websockets API namespaces, event names and parameters](./docs/sockets-api.md)

- [Testing bitcore-node in RegTest](./docs/wallet-guide.md)

## Contributing

See [CONTRIBUTING.md](../../Contributing.md) on the main bivcore repo for information about how to contribute.

## License

Code released under [the MIT license](https://github.com/bitpay/bivcore/blob/master/LICENSE).

Copyright 2013-2019 BitPay, Inc. Bitcore is a trademark maintained by BitPay, Inc.
