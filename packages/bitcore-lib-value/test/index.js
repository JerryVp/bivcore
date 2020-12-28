"use strict";

var should = require("chai").should();
var bivcore = require("../");

describe('#versionGuard', function() {
  it('global._bivcore should be defined', function() {
    should.equal(global._bivcore, bivcore.version);
  });

  it('throw an error if version is already defined', function() {
    (function() {
      bivcore.versionGuard('version');
    }).should.throw('More than one instance of bivcore');
  });
});
