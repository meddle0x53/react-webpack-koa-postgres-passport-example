'use strict';
var co = require('co');

exports.cleanupDB = function(cb) {
  var sequelize = require('../../config/config').database.connection;
  co(function *() {
    yield sequelize.sync({
      force: true
    });
  }).then(cb);
};
