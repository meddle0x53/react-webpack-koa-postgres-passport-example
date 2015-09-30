'use strict';
var Count = require('../models/count');

exports.getCount = function *() {
  var count = yield Count.findTheOne();
  this.body = { count: count.value };
};

exports.increment = function *() {
  var count = yield Count.findTheOne();
  ++count.value;

  count = yield count.save();
  this.body = { count: count.value };
};

exports.decrement = function *() {
  var count = yield Count.findTheOne();
  --count.value;

  count = yield count.save();
  this.body = { count: count.value };
};
