# Bitcore Mnemonics

BIP39 Mnemonics for bivcore

[![NPM Package](https://img.shields.io/npm/v/bivcore-mnemonic.svg?style=flat-square)](https://www.npmjs.org/package/bivcore-mnemonic)
[![Build Status](https://img.shields.io/travis/bitpay/bivcore-mnemonic.svg?branch=master&style=flat-square)](https://travis-ci.org/bitpay/bivcore-mnemonic)
[![Coverage Status](https://img.shields.io/coveralls/bitpay/bivcore-mnemonic.svg?style=flat-square)](https://coveralls.io/r/bitpay/bivcore-mnemonic)

**A module for [bivcore](https://github.com/bitpay/bivcore) that implements [Mnemonic code for generating deterministic keys](https://github.com/bivcoin/bips/blob/master/bip-0039.mediawiki).**

## Getting Started

This library is distributed in both the npm packaging systems.

```sh
npm install @sotatek-anhdao/bitcore-lib-value  #this to install bitcore-lib-value since it is a peerDependecy
npm install bivcore-mnemonic
```

There are many examples of how to use it on the developer guide [section for mnemonic](./docs/index.md). For example, the following code would generate a new random mnemonic code and convert it to a `HDPrivateKey`.

```javascript
var Mnemonic = require('bivcore-mnemonic');
var code = new Mnemonic(Mnemonic.Words.SPANISH);
code.toString(); // natal hada sutil año sólido papel jamón combate aula flota ver esfera...
var xpriv = code.toHDPrivateKey();
```

## Contributing

See [CONTRIBUTING.md](https://github.com/bitpay/bivcore/blob/master/CONTRIBUTING.md) on the main bivcore repo for information about how to contribute.

## License

Code released under [the MIT license](https://github.com/bitpay/bivcore/blob/master/LICENSE).

Copyright 2013-2019 BitPay, Inc. Bitcore is a trademark maintained by BitPay, Inc.
