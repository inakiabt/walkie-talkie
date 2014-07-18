var config    = require('./config.json');
var intercom  = require("../intercom").app(config.settings);
var expect    = require('chai').expect;

describe('Intercom Counts', function() {

  describe('#intercom.counts.get()', function() {
    it('should return a global counts object', function(done) {
      intercom.counts.get(function(code, body) {
        expect(body.type).to.be.a('string');
        expect(body.type).to.equal('count.hash');
        // console.dir(body.type);
        done();
      });
    });
  });

  describe('#intercom.counts.get()', function() {
    it('should return a counts object of users by tag', function(done) {
      intercom.counts.get({
        "type": "user",
        "count": "tag"
      }, function(code, body) {
        expect(body.type).to.be.a('string');
        expect(body.type).to.equal('count');
        // console.dir(body);
        done();
      });
    });
  });

});
