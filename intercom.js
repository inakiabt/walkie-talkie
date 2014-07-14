var request = require("request");

exports.app = function(config) {

  var gen_api_url = function(args) {
    return "https://api.intercom.io/" + args;
  };

  var json_headers = {
    "Authorization": "Basic " + new Buffer(config.app_id + ":" + config.api_key).toString("base64"),
    "Accept": "application/json"
  };

  return {
    users: {
      all: function(args, cb) {
        if(cb == null) {
          cb = args;
        }

        var args = {
          "method": "GET",
          "url": gen_api_url("users"),
          "headers": json_headers
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('ALL failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, body);
          }
        });
      },

      get: function(user_id_or_email, cb) {
        var key = (user_id_or_email.indexOf("@") == -1) ? "user_id" : "email";

        var args = {
          "method": "GET",
          "url": gen_api_url("users?"+ key + "=" + encodeURIComponent(user_id_or_email)),
          "headers": json_headers
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('GET failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, body);
          }
        });
      },

      post: function(data, cb) {
        var args = {
          "method": "POST",
          "url": gen_api_url("users"),
          "headers": json_headers,
          "body": JSON.stringify(data)
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('POST failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, body);
          }
        });
      },

      put: function(data, cb) {
        var args = {
          "method": "PUT",
          "url": gen_api_url("users"),
          "headers": json_headers,
          "body": JSON.stringify(data)
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('PUT failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, body);
          }
        });
      },

      delete: function(data, cb) {
        var args = {
          "method": "DELETE",
          "url": gen_api_url("users"),
          "headers": json_headers,
          "body": JSON.stringify(data)
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('DELETE failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, body);
          }
        });
      }
    },

    tags: {
      get: function(tag, cb) {
        var args = {
          "method": "GET",
          "url": gen_api_url("tags?name=" + tag),
          "headers": json_headers
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('GET failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, body);
          }
        });
      },

      post: function(data, cb) {
        var args = {
          "method": "POST",
          "url": gen_api_url("tags"),
          "headers": json_headers,
          "body": JSON.stringify(data)
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('POST failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, body);
          }
        });
      },

      put: function(data, cb) {
        var args = {
          "method": "PUT",
          "url": gen_api_url("tags"),
          "headers": json_headers,
          "body": JSON.stringify(data)
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('PUT failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, body);
          }
        });
      }
    }
  }
}
