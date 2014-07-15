var config    = require('./config.json');
var intercom  = require("../intercom").app(config.settings);
var should    = require('chai').should();
var expect    = require('chai').expect;

describe('Intercom Users', function() {

  describe('#intercom.users.all()', function() {
    it('should return a list of all users', function(done) {
      intercom.users.all(function(code, body) {
        expect(body.type).to.be.equal('user.list');
        expect(body.users).to.be.an('array');
        // console.dir(body);
        done();
      });
    });
  });

  describe('#intercom.users.create()', function() {
    it('should create a new user', function(done) {
      intercom.users.create({
        "email" : "brandon@brandonb.io",
        "name" : "Test McTesterson",
        "created_at" : (new Date() / 1000),
        "last_seen_ip" : "1.2.3.4",
        "last_seen_user_agent" : "ie6"
      }, function(code, body) {
        expect(body).to.be.an('object');
        expect(body.type).to.be.equal('user');
        // console.dir(body);
        done();
      });
    });
  });

  describe('#intercom.users.get()', function() {
    it('should return an object of a single user by email', function(done) {
      intercom.users.get("brandon@brandonb.io", function(code, body) {
        expect(body).to.be.an('object');
        expect(body.type).to.be.equal('user');
        // console.dir(body);
        done();
      });
    });
  });

  describe('#intercom.users.update()', function() {
    it('should update a user', function(done) {
      intercom.users.update({
        "email" : "brandon@brandonb.io",
        "name" : "Brandon Brown"
      }, function(code, body) {
        expect(body).to.be.an('object');
        expect(body.type).to.be.equal('user');
        // console.dir(body);
        done();
      });
    });
  });

  describe('#intercom.users.delete()', function() {
    it('should delete a user by email', function(done) {
      intercom.users.delete({
        "email": "brandon@brandonb.io"
      }, function(code, body) {
        expect(body).to.be.an('object');
        expect(body.type).to.be.equal('user');
        // console.dir(body);
        done();
      });
    });
  });

});
