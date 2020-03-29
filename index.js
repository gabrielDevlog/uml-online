var redbird = require('redbird')({
  port: process.env.PORT,
});

redbird.register("uml-online.herokuapp.com", "http://173.193.109.167:32080/");
