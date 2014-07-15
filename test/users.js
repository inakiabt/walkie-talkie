var config    = require('./config.json');
var intercom  = require("../intercom").app(config.settings);
var should    = require('chai').should();

describe('Intercom Users', function() {

  it('returns a list of all users', function() {
    intercom.users.all(function(code, body) {
      console.log(code + ': ' + body);
    });
  });

  it('returns an object of a single user by email', function() {
    intercom.users.get("brandon@brandonb.io", function(code, body) {
      console.log(code + ': ' + body);
    });
  });

  it('creates a user and return a response', function() {
    intercom.users.create({
      "email" : "test2@brandonb.io",
      "name" : "Test McTesterson2",
      "created_at" : (new Date() / 1000),
      "last_seen_ip" : "1.2.3.4",
      "last_seen_user_agent" : "ie6"
    }, function(code, body) {
      console.log(code + ': ' + body);
    });
  });

  it('updates a user and returns a response', function() {
    intercom.users.update({
      "email" : "test2@brandonb.io",
      "name" : "Brandon Brown"
    }, function(code, body) {
      console.log(code + ': ' + body);
    });
  });

  it('deletes a user by email and returns a response', function() {
    intercom.users.delete({
      "email": "test2@brandonb.io"
    }, function(code, body) {
      console.log(code + ': ' + body);
    });
  });

});
