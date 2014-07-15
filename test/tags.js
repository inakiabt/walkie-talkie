var config    = require('./config.json');
var intercom  = require("../intercom").app(config.settings);
var should    = require('chai').should();

describe('Intercom Tags', function() {

  var tag_id = null;

  it('returns a list of all tags', function() {
    intercom.tags.all(function(code, body) {
      console.log(code + ': ' + body);
    });
  });

  it('returns an object of a single tag by name', function() {
    intercom.tags.get("social media", function(code, body) {
      console.log(code + ': ' + body);
    });
  });

  it('creates a tag and returns a response', function() {
    intercom.tags.create("social media", function(code, body) {
      console.log(code + ': ' + body);
      tag_id = body.id;
    });
  });

  it('updates a tag and returns a response', function() {
    intercom.tags.update({
      "id"   : tag_id,
      "name" : "test tag",
    }, function(code, body) {
      console.log(code + ': ' + body);
    });
  });

  it('deletes a tag by the id and returns a response', function() {
    intercom.tags.delete("test tag", function(code, body) {
      console.log(code + ': ' + body);
    });
  });

});
