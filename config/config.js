'use strict';

var path = require('path');
var _ = require('lodash');
var db = require('../config/database.json');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var base = {
  app: {
    root: path.normalize(path.join(__dirname, '/..')),
    env: env
  }
};

var specific = {
  development: {
    app: {
      port: 3000,
      name: 'Koa React Gulp Postgres Mocha - Dev',
      keys: [ 'super-secret-hurr-durr' ]
    },
    database: db.development,
    mongo: {
      url: 'mongodb://localhost/koareactfullexample_dev'
    }
  },
  test: {
    app: {
      port: 3001,
      name: 'Koa React Gulp Postgres Mocha - Test realm',
      keys: [ 'super-secret-hurr-durr' ]
    },
    database: db.test,
    mongo: {
      url: 'mongodb://localhost/koareactfullexample_test'
    }
  },
  production: {
    app: {
      port: process.env.PORT || 3000,
      name: 'Koa React Gulp Postgres Mocha'
    },
    database: db.production,
    mongo: {
      url: 'mongodb://localhost/koareactfullexample'
    }
  }
};

module.exports = _.merge(base, specific[env]);
