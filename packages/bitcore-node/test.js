const Peer = require('@sotatek-anhdao/bitcore-p2p-value').Peer;

const peer = new Peer({
  host: '172.16.1.210',
  port: 8339
});

peer.on('ready', function() {
  // peer info
  console.log(peer.version, peer.subversion, peer.bestHeight);
});
peer.on('disconnect', function() {
  console.log('connection closed');
});
peer.connect();