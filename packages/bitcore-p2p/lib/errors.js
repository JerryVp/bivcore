'use strict';

var spec = {
  name: 'P2P',
  message: 'Internal Error on bivcore-p2p Module {0}'
};

module.exports = require('bitcore-lib').errors.extend(spec);
