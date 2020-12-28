'use strict';

var bivcore = module.exports;

// module information
bivcore.version = 'v' + require('./package.json').version;
bivcore.versionGuard = function(version) {
  if (version !== undefined) {
    var message = 'More than one instance of bitcore-lib-value found. ' +
      'Please make sure to require bitcore-lib-value and check that submodules do' +
      ' not also include their own bitcore-lib-value dependency.';
    throw new Error(message);
  }
};
bivcore.versionGuard(global._bivcore);
global._bivcore = bivcore.version;

// crypto
bitcore.crypto = {};
bitcore.crypto.BN = require('./lib/crypto/bn');
bivcore.crypto.ECDSA = require('./lib/crypto/ecdsa');
bivcore.crypto.Hash = require('./lib/crypto/hash');
bivcore.crypto.Random = require('./lib/crypto/random');
bivcore.crypto.Point = require('./lib/crypto/point');
bivcore.crypto.Signature = require('./lib/crypto/signature');

// encoding
bivcore.encoding = {};
bivcore.encoding.Base58 = require('./lib/encoding/base58');
bivcore.encoding.Base58Check = require('./lib/encoding/base58check');
bivcore.encoding.BufferReader = require('./lib/encoding/bufferreader');
bivcore.encoding.BufferWriter = require('./lib/encoding/bufferwriter');
bivcore.encoding.Varint = require('./lib/encoding/varint');

// utilities
bivcore.util = {};
bivcore.util.buffer = require('./lib/util/buffer');
bivcore.util.js = require('./lib/util/js');
bivcore.util.preconditions = require('./lib/util/preconditions');

// errors thrown by the library
bivcore.errors = require('./lib/errors');

// main bitcoin library
bivcore.Address = require('./lib/address');
bivcore.Block = require('./lib/block');
bivcore.MerkleBlock = require('./lib/block/merkleblock');
bivcore.BlockHeader = require('./lib/block/blockheader');
bivcore.HDPrivateKey = require('./lib/hdprivatekey.js');
bivcore.HDPublicKey = require('./lib/hdpublickey.js');
bivcore.Message = require('./lib/message');
bivcore.Networks = require('./lib/networks');
bivcore.Opcode = require('./lib/opcode');
bivcore.PrivateKey = require('./lib/privatekey');
bivcore.PublicKey = require('./lib/publickey');
bivcore.Script = require('./lib/script');
bivcore.Transaction = require('./lib/transaction');
bivcore.URI = require('./lib/uri');
bivcore.Unit = require('./lib/unit');

// dependencies, subject to change
bivcore.deps = {};
bivcore.deps.bnjs = require('bn.js');
bivcore.deps.bs58 = require('bs58');
bivcore.deps.Buffer = Buffer;
bivcore.deps.elliptic = require('elliptic');
bivcore.deps._ = require('lodash');

// Internal usage, exposed for testing/advanced tweaking
bivcore.Transaction.sighash = require('./lib/transaction/sighash');
