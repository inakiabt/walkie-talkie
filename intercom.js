var request = require("request");
var qs      = require("querystring");


exports.app = function(config) {

  var gen_api_url = function(args) {
    return "https://api.intercom.io/" + args;
  };

  var sign = function() {
    return "Basic " + new Buffer(config.app_id + ":" + config.api_key).toString("base64");
  };

  return {
    users: {
      all: function(cb) {
        var args = {
          "method": "GET",
          "url": gen_api_url("users"),
          "headers": {
            "Authorization": sign(),
            "Accept": "application/json"
          }
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('users all failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, JSON.parse(body));
          }
        });
      },

      get: function(user_id_or_email, cb) {
        var key = (user_id_or_email.indexOf("@") === -1) ? "user_id" : "email";

        var args = {
          "method": "GET",
          "url": gen_api_url("users?"+ key + "=" + encodeURIComponent(user_id_or_email)),
          "headers": {
            "Authorization": sign(),
            "Accept": "application/json"
          }
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('user get failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, JSON.parse(body));
          }
        });
      },

      create: function(data, cb) {
        var args = {
          "method": "POST",
          "url": gen_api_url("users"),
          "headers": {
            "Authorization": sign(),
            "Accept": "application/json",
            "Content-type": "application/json"
          },
          "body": JSON.stringify(data)
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('user create failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, JSON.parse(body));
          }
        });
      },

      update: function(data, cb) {
        var args = {
          "method": "POST",
          "url": gen_api_url("users"),
          "headers": {
            "Authorization": sign(),
            "Accept": "application/json",
            "Content-type": "application/json"
          },
          "body": JSON.stringify(data)
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('user update failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, JSON.parse(body));
          }
        });
      },

      delete: function(data, cb) {
        var key;
        var url;

        if(data.id) {
          url = gen_api_url("users/" + data.id);
        } else if(data.email.indexOf("@") === -1) {
          key = "user_id";
          url = gen_api_url("users?"+ key + "=" + data.user_id);
        } else {
          key = "email";
          url = gen_api_url("users?"+ key + "=" + encodeURIComponent(data.email));
        }

        var args = {
          "method": "GET",
          "url": url,
          "headers": {
            "Authorization": sign(),
            "Accept": "application/json"
          }
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('user delete failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, JSON.parse(body));
          }
        });
      }
    },

    tags: {
      all: function(cb) {
        var args = {
          "method": "GET",
          "url": gen_api_url("tags"),
          "headers": {
            "Authorization": sign(),
            "Accept": "application/json"
          }
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('tag get all failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, JSON.parse(body));
          }
        });
      },

      create: function(data, cb) {
        var args = {
          "method": "POST",
          "url": gen_api_url("tags"),
          "headers": {
            "Authorization": sign(),
            "Accept": "application/json",
            "Content-type": "application/json"
          },
          "body": JSON.stringify(data)
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('tag creat failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, JSON.parse(body));
          }
        });
      },

      update: function(data, cb) {
        var args = {
          "method": "POST",
          "url": gen_api_url("tags"),
          "headers": {
            "Authorization": sign(),
            "Accept": "application/json",
            "Content-type": "application/json"
          },
          "body": JSON.stringify(data)
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('tag update failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, JSON.parse(body));
          }
        });
      },

      delete: function(tag_id, cb) {
        var args = {
          "method": "DELETE",
          "url": gen_api_url("tags/" + tag_id),
          "headers": {
            "Authorization": sign(),
            "Accept": "application/json"
          },
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('tag delete failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode);
          }
        });
      }
    },

    events: {
      create: function(data, cb) {
        var args = {
          "method": "POST",
          "url": gen_api_url("events"),
          "headers": {
            "Authorization": sign(),
            "Content-type": "application/json"
          },
          "body": JSON.stringify(data)
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('event create failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode);
          }
        });
      }
    },

    counts: {
      get: function(data, cb) {
        var url;

        if(arguments.length === 1) {
          if(Object.prototype.toString.call(data) === "[object Function]") {
            // No data object, data is the callback here
            cb = data;
            // No data supplied, global app counts will be return
            url = gen_api_url("counts");
          }
        } else {
          url = gen_api_url("counts?" + qs.stringify(data));
        }

        var args = {
          "method": "GET",
          "url": url,
          "headers": {
            "Authorization": sign(),
            "Accept": "application/json"
          }
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('counts get failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, JSON.parse(body));
          }
        });
      }
    },

    segments: {
      get_all: function(cb) {
        var args = {
          "method": "GET",
          "url": gen_api_url("segments"),
          "headers": {
            "Authorization": sign(),
            "Accept": "application/json"
          }
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('segments get all failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, JSON.parse(body));
          }
        });
      },

      get: function(segment_id, cb) {
        var args = {
          "method": "GET",
          "url": gen_api_url("segments/" + segment_id),
          "headers": {
            "Authorization": sign(),
            "Accept": "application/json"
          }
        };

        return request(args, function(e, r, body) {
          if(e) {
            console.dir('segments get failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, JSON.parse(body));
          }
        });
      }
    }
  };
};
