'use strict';

var Message = require('../message');
var inherits = require('util').inherits;
var bivcore = require('@sotatek-anhdao/bitcore-lib-value');
var BufferUtil = bivcore.util.buffer;

/**
 * Request information about active peers
 * @extends Message
 * @param {Object} options
 * @constructor
 */
function GetaddrMessage(arg, options) {
  Message.call(this, options);
  this.command = 'getaddr';
}
inherits(GetaddrMessage, Message);

GetaddrMessage.prototype.setPayload = function() {};

GetaddrMessage.prototype.getPayload = function() {
  return BufferUtil.EMPTY_BUFFER;
};

module.exports = GetaddrMessage;
