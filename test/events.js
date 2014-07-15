var config    = require('./config.json');
var intercom  = require("../intercom").app(config.settings);
var expect    = require('chai').expect;

describe('Intercom Events', function() {

  describe('#intercom.events.create()', function() {
    it('should return an event object', function(done) {

      var email = "brandon@brandonb.io";

      // Create a test user
      intercom.users.create({
        "email"                : email,
        "name"                 : "Test McTesterson",
        "created_at"           : (new Date() / 1000),
        "last_seen_ip"         : "1.2.3.4",
        "last_seen_user_agent" : "ie6"
      }, function(code, body) {
        // console.dir(body);
      });

      // Create an event with the created user from above
      intercom.events.create({
        "event_name" : "test event",
        "created_at" : (new Date() / 1000),
        "email"      : email
      }, function(code) {
        expect(code).to.be.equal(202);
        // console.dir(code);
      });

      // If the event is created, delete the user
      intercom.users.delete({
        "email": email
      }, function(code, body) {
        // console.dir(body);
      });

      // Call the done callback
      done();

    });
  });

});
