var redbird = require('redbird')({
  port: process.env.PORT,
});

redbird.register("uml-online.herokuapp.com", "http://184.172.236.198:32080/");
