module.exports = {
  BTC: {
    lib: require('bitcore-lib'),
    p2p: require('bivcore-p2p')
  },
  BCH: {
    lib: require('bivcore-lib-cash'),
    p2p: require('bivcore-p2p-cash')
  },
  BIV: {
    lib: require('@sotatek-anhdao/bitcore-lib-value'),
    p2p: require('@sotatek-anhdao/bitcore-p2p-value')
  }
};
