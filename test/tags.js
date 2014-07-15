var config    = require('./config.json');
var intercom  = require("../intercom").app(config.settings);
var expect    = require('chai').expect;

describe('Intercom Tags', function() {

  var tag_id = null;

  describe('#intercom.tags.all()', function() {
    it('should return a list of all tags', function(done) {
      intercom.tags.all(function(code, body) {
        expect(body.type).to.be.a('string');
        expect(body.tags).to.be.an('array');
        // console.dir(body);
        done();
      });
    });
  });

  describe('#intercom.tags.create()', function() {
    it('should create a new tag', function(done) {
      intercom.tags.create({
        "name": "social media"
      }, function(code, body) {
        expect(body).to.be.an('object');
        expect(body.id).to.be.an('string');
        expect(body.name).to.be.an('string');
        // console.dir(body);
        tag_id = body.id;
        done();
      });
    });
  });

  describe('#intercom.tags.update()', function() {
    it('should update a tag by id', function(done) {
      intercom.tags.update({
        "id"   : tag_id,
        "name" : "test tag",
      }, function(code, body) {
        expect(body).to.be.an('object');
        expect(body.id).to.be.an('string');
        expect(body.name).to.be.an('string');
        // console.dir(body);
        done();
      });
    });
  });

  describe('#intercom.tags.delete()', function() {
    it('should delete a tag by id', function(done) {
      intercom.tags.delete(tag_id, function(code, body) {
        expect(code).to.be.equal(200);
        // console.dir(body);
        done();
      });
    });
  });

});
