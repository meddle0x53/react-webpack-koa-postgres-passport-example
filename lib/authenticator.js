'use strict';
var User = require('../src/models/user');
var co = require('co');

exports.localUser = function(username, password, done) {
  co(function *() {
    try {
      return yield User.passwordMatches(username, password);
    } catch (ex) {
      return null;
    }
  }).then(function(user) {
    done(null, user);
  });
};
