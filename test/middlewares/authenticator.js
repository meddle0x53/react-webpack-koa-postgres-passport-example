'use strict';
var should = require('should');

var User = require('../../src/models/user');

const CREDENTIALS = { u: 'test@email.com', p: '123123123' };
exports.LOGIN_URL = '/auth';

exports.createUser = function *() {
  var user = User.build({
    username: CREDENTIALS.u,
    password: CREDENTIALS.p
  });
  yield user.save();
};

exports.signAgent = function(agent, done) {
  agent
  .post(exports.LOGIN_URL)
  .set('Content-Type', 'application/json')
  .send({ username: CREDENTIALS.u, password: CREDENTIALS.p })
  .redirects(false)
  .expect(200)
  .end(function(err, res) {
    if (err) { return done(err); }
    should.exist(res.body);
    should.exist(res.body.user);
    should.exist(res.body.user.username);
    done();
  });
};
