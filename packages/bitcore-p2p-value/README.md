# Bitcore P2P

[![NPM Package](https://img.shields.io/npm/v/bivcore-p2p.svg?style=flat-square)](https://www.npmjs.org/package/bivcore-p2p)
[![Build Status](https://img.shields.io/travis/bitpay/bivcore-p2p.svg?branch=master&style=flat-square)](https://travis-ci.org/bitpay/bivcore-p2p)
[![Coverage Status](https://img.shields.io/coveralls/bitpay/bivcore-p2p.svg?style=flat-square)](https://coveralls.io/r/bitpay/bivcore-p2p?branch=master)

**The peer-to-peer networking protocol for BIV.**

`bivcore-p2p` adds [Bitcoin Value protocol](https://en.bitcoin.it/wiki/Protocol_documentation) support for Bitcore.

See [the main bivcore repo](https://github.com/bitpay/bivcore) for more information.

## Getting Started

```sh
npm install bivcore-p2p
```

In order to connect to the Bitcoin Value network, you'll need to know the IP address of at least one node of the network, or use [Pool](./docs/pool.md) to discover peers using a DNS seed.

```javascript
var Peer = require('bivcore-p2p').Peer;

var peer = new Peer({host: '127.0.0.1'});

peer.on('ready', function() {
  // peer info
  console.log(peer.version, peer.subversion, peer.bestHeight);
});
peer.on('disconnect', function() {
  console.log('connection closed');
});
peer.connect();
```

Then, you can get information from other peers by using:

```javascript
// handle events
peer.on('inv', function(message) {
  // message.inventory[]
});
peer.on('tx', function(message) {
  // message.transaction
});
```

Take a look at this [guide](./docs/peer.md) on the usage of the `Peer` class.

## Contributing

See [CONTRIBUTING.md](https://github.com/bitpay/bivcore/blob/master/CONTRIBUTING.md) on the main bivcore repo for information about how to contribute.

## License

Code released under [the MIT license](https://github.com/bitpay/bivcore/blob/master/LICENSE).

Copyright 2013-2019 BitPay, Inc. Bitcore is a trademark maintained by BitPay, Inc.
