exports.app = function(config) {

  var gen_api_url = function(args) {
    return "https://api.intercom.io/" + args;
  };

  var sign = function() {
    return "Basic " + Base64.encode(config.app_id + ":" + config.api_key);
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
            console.error('users all failed with error: ' + JSON.stringify(e));
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
            console.error('user get failed with error: ' + JSON.stringify(e));
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
            console.error('user create failed with error: ' + JSON.stringify(e));
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
            console.error('user update failed with error: ' + JSON.stringify(e));
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
            console.error('user delete failed with error: ' + JSON.stringify(e));
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
            console.error('tag get all failed with error: ' + JSON.stringify(e));
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
            console.error('tag creat failed with error: ' + JSON.stringify(e));
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
            console.error('tag update failed with error: ' + JSON.stringify(e));
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
            console.error('tag delete failed with error: ' + JSON.stringify(e));
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
            console.error('event create failed with error: ' + JSON.stringify(e));
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
            console.error('counts get failed with error: ' + JSON.stringify(e));
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
            console.error('segments get all failed with error: ' + JSON.stringify(e));
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
            console.error('segments get failed with error: ' + JSON.stringify(e));
            cb(null, null, null);
          } else {
            cb(r.statusCode, JSON.parse(body));
          }
        });
      }
    },
    conversations: {
      user: function(user_id_or_email, cb) {
        var key = (user_id_or_email.indexOf("@") == -1) ? "user_id" : "email";

        var args = {
          "method": "GET",
          "url": "https://api.intercom.io/conversations/?type=user&"+ key + "=" + user_id_or_email,
          "headers": { "Authorization": sign(), "Accept": "application/json" }
        }

        var conversations = [];
        var handle = function(e, r, body){
          if (e) {
            cb(null, null, null);
          } else {
            var rsp = JSON.parse(body);
            rsp.conversations.forEach(function(c) { conversations.push(c);});
            if (rsp.pages.next) {
                args.url = 'https://api.intercom.io' + rsp.pages.next;
                request(args, handle);
            } else {
                cb(r.statusCode, conversations);
            }
          }
        };

        return request(args, handle);
      },
      get: function(id, cb) {
        var args = {
          "method": "GET",
          "url": "https://api.intercom.io/conversations/"+id,
          "headers": { "Authorization": sign(), "Accept": "application/json" }
        }
        return request(args, function(e, r, body){
          if (e) {
            cb(null, null, null);
          } else {
            cb(r.statusCode, body);
          }
        });
      }
    }
  };
};

function request(args, callback)
{
  args = args || {};
  callback = callback || function(){};

  args.success = function(res){
    callback(false, _buildResponse(res), res.text);
  };
  args.error = function(res){
    callback(res.text, _buildResponse(res), res.text);
  };
  Parse.Cloud.httpRequest(args);
}

function _buildResponse(res)
{
  res.statusCode = res.status;

  return res;
}

var qs = {};
qs.stringify = function(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

/*
Copyright (c) 2008 Fred Palmer fred.palmer_at_gmail.com

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/
function StringBuffer(str)
{
    this.buffer = [];

    if (str)
    {
      this.append(str);
    }
}

StringBuffer.prototype.append = function append(string)
{
    this.buffer.push(string);
    return this;
};

StringBuffer.prototype.toString = function toString()
{
    return this.buffer.join("");
};

var Base64 =
{
    codex : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    encode : function (input)
    {
        var output = new StringBuffer();

        var enumerator = new Utf8EncodeEnumerator(input);
        while (enumerator.moveNext())
        {
            var chr1 = enumerator.current;

            enumerator.moveNext();
            var chr2 = enumerator.current;

            enumerator.moveNext();
            var chr3 = enumerator.current;

            var enc1 = chr1 >> 2;
            var enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            var enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            var enc4 = chr3 & 63;

            if (isNaN(chr2))
            {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3))
            {
                enc4 = 64;
            }

            output.append(this.codex.charAt(enc1) + this.codex.charAt(enc2) + this.codex.charAt(enc3) + this.codex.charAt(enc4));
        }

        return output.toString();
    },

    decode : function (input)
    {
        var output = new StringBuffer();

        var enumerator = new Base64DecodeEnumerator(input);
        while (enumerator.moveNext())
        {
            var charCode = enumerator.current;

            if (charCode < 128)
                output.append(String.fromCharCode(charCode));
            else if ((charCode > 191) && (charCode < 224))
            {
                enumerator.moveNext();
                var charCode2 = enumerator.current;

                output.append(String.fromCharCode(((charCode & 31) << 6) | (charCode2 & 63)));
            }
            else
            {
                enumerator.moveNext();
                var charCode2 = enumerator.current;

                enumerator.moveNext();
                var charCode3 = enumerator.current;

                output.append(String.fromCharCode(((charCode & 15) << 12) | ((charCode2 & 63) << 6) | (charCode3 & 63)));
            }
        }

        return output.toString();
    }
}


function Utf8EncodeEnumerator(input)
{
    this._input = input;
    this._index = -1;
    this._buffer = [];
}

Utf8EncodeEnumerator.prototype =
{
    current: Number.NaN,

    moveNext: function()
    {
        if (this._buffer.length > 0)
        {
            this.current = this._buffer.shift();
            return true;
        }
        else if (this._index >= (this._input.length - 1))
        {
            this.current = Number.NaN;
            return false;
        }
        else
        {
            var charCode = this._input.charCodeAt(++this._index);

            // "\r\n" -> "\n"
            //
            if ((charCode == 13) && (this._input.charCodeAt(this._index + 1) == 10))
            {
                charCode = 10;
                this._index += 2;
            }

            if (charCode < 128)
            {
                this.current = charCode;
            }
            else if ((charCode > 127) && (charCode < 2048))
            {
                this.current = (charCode >> 6) | 192;
                this._buffer.push((charCode & 63) | 128);
            }
            else
            {
                this.current = (charCode >> 12) | 224;
                this._buffer.push(((charCode >> 6) & 63) | 128);
                this._buffer.push((charCode & 63) | 128);
            }

            return true;
        }
    }
}

function Base64DecodeEnumerator(input)
{
    this._input = input;
    this._index = -1;
    this._buffer = [];
}

Base64DecodeEnumerator.prototype =
{
    current: 64,

    moveNext: function()
    {
        if (this._buffer.length > 0)
        {
            this.current = this._buffer.shift();
            return true;
        }
        else if (this._index >= (this._input.length - 1))
        {
            this.current = 64;
            return false;
        }
        else
        {
            var enc1 = Base64.codex.indexOf(this._input.charAt(++this._index));
            var enc2 = Base64.codex.indexOf(this._input.charAt(++this._index));
            var enc3 = Base64.codex.indexOf(this._input.charAt(++this._index));
            var enc4 = Base64.codex.indexOf(this._input.charAt(++this._index));

            var chr1 = (enc1 << 2) | (enc2 >> 4);
            var chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            var chr3 = ((enc3 & 3) << 6) | enc4;

            this.current = chr1;

            if (enc3 != 64)
                this._buffer.push(chr2);

            if (enc4 != 64)
                this._buffer.push(chr3);

            return true;
        }
    }
};