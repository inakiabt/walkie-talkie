var config    = require('./config.json');
var intercom  = require("../intercom").app(config.settings);
var expect    = require('chai').expect;

describe('Intercom Segments', function() {

  describe('#intercom.segments.get_all()', function() {
    it('should return a global segments object', function(done) {
      intercom.segments.get_all(function(code, body) {
        expect(body.type).to.be.a('string');
        expect(body.type).to.equal('segment.list');
        // console.dir(body);
        done();
      });
    });
  });

  describe('#intercom.segments.get()', function() {
    it('should return a segments object of users by tag', function(done) {
      intercom.segments.get("53c3624925a27d596d000024", function(code, body) {
        expect(body.type).to.be.a('string');
        expect(body.type).to.equal('segment');
        // console.dir(body);
        done();
      });
    });
  });

});
