var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('users', {
    id: {
      type: 'int',
      primaryKey: true,
      unsigned: true,
      notNull: true,
      autoIncrement: true
    },
    username: {
      type: 'string',
      unique: true,
      notNull: true
    },
    password: {
      type: 'string',
      notNull: true
    }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('users', callback);
};
