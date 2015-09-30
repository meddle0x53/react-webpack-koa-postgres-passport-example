'use strict';

var DataTypes = require('sequelize');
var sequelize = require('../../config/config').database.connection;

var Count = sequelize.define('Count', {
  value: DataTypes.INTEGER,
  updated_at: DataTypes.DATE
}, {
  underscored: true,
  tableName: 'counts',
  classMethods: {
    findTheOne: function *() {
      var data = yield Count.findOrCreate({
        where: ['id > ?', 0], defaults: { value: 0 }
      });
      return data[0];
    }
  }
});

module.exports = Count;

