var http = require("http");

var options = {
  hostname: "api.thecatapi.com",
  port: 80,
  path: "/v1/images/search",
  method: "GET",
  agent: false
};

class CatAPI {
  constructor() {}
  makeRequest(callback) {
    var req;

    req = http.request(options, function(res) {
      var chunks = [];

      res.on("data", function(chunk) {
        chunks.push(chunk);
      });

      res.on("end", function(chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        var jsonBody = JSON.parse(body.toString());
        var pictureURL = jsonBody[0].url;
        req.end();
        callback(pictureURL);
      });

      res.on("error", function(error) {
        console.error(error);
      });
    });

    req.end();
  }
}

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getData() {
    console.log(this.name, this.age);
  }
}
module.exports = {
  CatAPI,
  Person
};
