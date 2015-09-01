"use strict";
/**
 * Dependencies
 */
const fs = require("fs");
const koa = require("koa");
const mongoose = require("mongoose");
const Sequelize = require('sequelize');
const passport = require("koa-passport");

/**
 * Config
 */
const config = require("./config/config");

/**
 * Connect to database
 */
mongoose.connect(config.mongo.url);
mongoose.connection.on("error", function(err) {
  console.log(err);
});

config.database.connection = new Sequelize(
  config.database.database,
  config.database.username || 'postgres',
  config.database.password || '',
  {
    host: config.database.host || 'localhost',
    dialect: config.database.dialect || 'sqlite',

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
);

/**
 * Load the models
 */
const modelsPath = config.app.root + "/src/models";
fs.readdirSync(modelsPath).forEach(function(file) {
  if (~file.indexOf("js")) {
    require(modelsPath + "/" + file);
  }
});
config.database.connection.sync();

/**
 * Server
 */
const app = module.exports = koa();

require("./config/passport")(passport, config);

require("./config/koa")(app, config, passport);

// Routes
require("./config/routes")(app, passport);

// Start app
if (!module.parent) {
  app.listen(config.app.port);
  console.log("Server started, listening on port: " + config.app.port);
}
console.log("Environment: " + config.app.env);
