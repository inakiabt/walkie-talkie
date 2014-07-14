var intercom = require("../intercom").app(settings),
    should = require('chai').should(),
    settings = {
      "APP_ID": "",
      "API_KEY": ""
    };

describe('Intercom users', function() {
  // it('DESCRIPTION', function() {
  //   // blah().should.equal('bar');
  // });

  it('returns all users', function() {
    intercom.users.all(function(code, body) {
      console.log(code, body.toString());
    });
  });


  it('returns data for a single user by email', function() {
    intercom.users.get("brandon@brandonb.io", function(code, body) {
      console.log(code, body.toString());
    });
  });

  it('creates a user and return a response', function() {
    intercom.users.post({
      "email" : "test@brandonb.io",
      "name" : "Test McTesterson",
      "created_at" : (new Date() / 1000),
      "pre_launch" : true,
      "last_seen_ip" : "1.2.3.4",
      "last_seen_user_agent" : "ie6"
    }, function(code, body) {
      console.log(code, body.toString());
    });
  });

  it('updates a user and returns a response', function() {
    intercom.users.put({
      "email" : "test@brandonb.io",
      "name" : "Jorgie"
    }, function(code, body) {
      console.log(code, body.toString());
    });
  });

  it('deletes a user by email and returns a response', function() {
    intercom.users.delete({
      "email": "test@brandonb.io"
    }, function(code, body) {
      console.log(code, body.toString());
    });
  });

});
