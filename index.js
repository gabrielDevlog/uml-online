var redbird = require('redbird')({
  port: 8080,
});

redbird.register("uml-online.herokuapp.com", "http://184.172.242.113:32080/");
