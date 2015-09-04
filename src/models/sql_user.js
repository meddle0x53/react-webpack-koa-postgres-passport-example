'use strict';

var DataTypes = require('sequelize');
var sequelize = require('../../config/config').database.connection;

var bcrypt = require("../../lib/bcrypt-thunk"); // version that supports yields
var co = require("co");

var updatePassword = function (user, options, done) {
  if (!user.changed('password')) {
    return done();
  }

  co.wrap(function*() {
    try {
      var salt = yield bcrypt.genSalt();
      var hash = yield bcrypt.hash(user.password, salt);

      user.password = hash;
      done();
    } catch (err) {
      done(err);
    }
  }).call(user).then(done);
};

var User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    set: function(val) {
      this.setDataValue('username', val.toLowerCase());
    }
  },
  password: DataTypes.STRING
}, {
  underscored: true,
  tableName: 'users',
  classMethods: {
    associate: function(models) {
      // associations can be defined here
    },
    passwordMatches: function *(username, password) {
      var user = yield User.find({
        where: { username: username.toLowerCase() }
      });
      if (!user) {
        throw new Error("User not found");
      }

      if (yield user.comparePassword(password)) {
        return user;
      }

      throw new Error("Password does not match");
    }
  },
  instanceMethods: {
    toJSON: function () {
      var values = this.get();

      delete values.password;
      return values;
    },
    comparePassword: function *(candidatePassword) {
      return yield bcrypt.compare(candidatePassword, this.get().password);
    }

  },
  hooks: {
    beforeUpdate: updatePassword,
    beforeCreate: updatePassword
  }
});


module.exports = User;
