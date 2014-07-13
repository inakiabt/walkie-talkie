var settings = {
  "API_KEY": "your_API_key",
  "APP_ID": "your_APP_ID"
}

var intercom = require("../intercom").app(settings);

intercom.users.all(function(code, body){
  console.log(code, body.toString());
});

intercom.users.get("brandon@brandonb.io", function(code, body){
  console.log(code, body.toString());
});

var data = {
  "email" : "jorge@chloi.io",
  "name" : "Jorge Predet",
  "created_at" : (new Date() / 1000),
  "pre_launch" : true,
  "last_seen_ip" : "1.2.3.4",
  "last_seen_user_agent" : "ie6"
}

intercom.users.post(data, function(code, body){
  console.log(code, body.toString());
});

var data = {
  "email" : "jorge@chloi.io",
  "name" : "Jorgie"
}

intercom.users.put(data, function(code, body){
  console.log(code, body.toString());
});

var data = {
  "email": "jorge@chloi.io"
}

intercom.users.delete(data, function(code, body){
  console.log(code, body.toString());
});
