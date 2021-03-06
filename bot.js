require("dotenv").config();
var Discord = require("discord.io");
var CatAPI = require("./CatAPI").CatAPI;
var catAPI = new CatAPI();

var logger = require("winston");
var http = require("http");
var auth = process.env.AUTH;
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
  colorize: true
});
logger.level = "debug";
// Initialize Discord Bot
var bot = new Discord.Client({
  token: auth,
  autorun: true
});
bot.on("ready", function(evt) {
  logger.info("Connected");
  logger.info("Logged in as: ");
  logger.info(bot.username + " - (" + bot.id + ")");
  var imageURL;
  var catAPI = new CatAPI();
  // catAPI.makeRequest(response => {
  //   console.log(response);
  //   imageURL = response;
  //   console.log("imageURL: " + imageURL);
  // });
});
bot.on("message", function(user, userID, channelID, message, evt) {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `~`
  if (message.substring(0, 1) == "~") {
    var args = message.substring(1).split(" ");
    var cmd = args[0];

    args = args.splice(1);
    switch (cmd) {
      // !ping
      case "ping":
        responseWith("Pongo!", channelID);
        break;
      case "pong":
        responseWith("WTF??", channelID);
        break;
      case "exoumento":
        bot.uploadFile({
          file: "./apofitisi.jpg",
          to: channelID
        });
        break;
      case "catplz":
        catAPI.makeRequest(response => {
          // bot.sendMessage({
          //   to: channelID,
          //   embed: {
          //     thumbnail: {
          //       url: response
          //     }
          //   }
          // });
          bot.sendMessage({
            to: channelID,
            message: response
          });
        });
        break;
      default:
        var randomNumber = getRandomNumber(2, 3);
        var fs = require("fs");
        var data = fs.readFileSync("bank.json", "utf8");
        var bank = JSON.parse(data);
        bank[user].ballance += randomNumber;
        console.log(bank[user].ballance);
        responseWith(randomNumber, channelID);
        response = user + " has " + bank[user].ballance + " EUR!";
    }
  }
});

function responseWith(response, channelID) {
  bot.sendMessage({
    to: channelID,
    message: response
  });
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - (min - 1)) + min);
}
