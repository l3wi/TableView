"use strict";

var util = require("util");
var path = require("path");
var fs = require("fs");
var Bot = require("slackbots");
var Webcam = require("./webcam");
var moment = require("moment");
var imgur = require("imgur");
var Slack = require("node-slack-upload");

var Toby = function Constructor(settings) {
  this.settings = settings;
  this.settings.name = this.settings.name || "Toby";
  this.user = null;
};

// inherits methods and properties from the Bot constructor
util.inherits(Toby, Bot);

Toby.prototype.run = function() {
  Toby.super_.call(this, this.settings);

  this.on("start", this._onStart);
  this.on("message", this._onMessage);
};

Toby.prototype._onStart = function() {
  this._loadBotUser();
};

Toby.prototype._onMessage = function(message) {
  if (
    this._isChatMessage(message) &&
    this._isChannelConversation(message) &&
    !this._isFromToby(message) &&
    this._isMentioningToby(message)
  ) {
    console.log("Got Message");
    this._sayHi(message);
  }
};

Toby.prototype._sayHi = function(originalMessage) {
  var self = this;
  var now = moment().format("x");
  Webcam(now)
    .then(function(location) {
      self._uploadImage(originalMessage, location);
    })
    .catch(function(er) {
      console.error(err.message);
    });
};

Toby.prototype._uploadImage = function(originalMessage, location) {
  var self = this;
  var upload = new Slack(self.settings.token);
  upload.uploadFile(
    {
      file: fs.createReadStream(path.join(__dirname, location)),
      filetype: "jpg",
      title: "Harvies - Coffee Machine",
      initialComment: "This tha coffee table",
      channels: self._getChannelById(originalMessage.channel).name
    },
    function(err, data) {
      if (err) {
        console.error(err);
      } else {
        console.log("Uploaded file details: ", data);
      }
    }
  );
};

Toby.prototype._loadBotUser = function() {
  var self = this;
  this.user = this.users.filter(function(user) {
    console.log(user.name);
    return user.name === self.name;
  })[0];
};

Toby.prototype._isChatMessage = function(message) {
  return message.type === "message" && Boolean(message.text);
};

Toby.prototype._isChannelConversation = function(message) {
  return typeof message.channel === "string" && message.channel[0] === "C";
};

/**
 * Util function to check if a given real time message is mentioning Chuck Norris or the norrisbot
 * @param {object} message
 * @returns {boolean}
 * @private
 */
Toby.prototype._isMentioningToby = function(message) {
  return (
    message.text.toLowerCase().indexOf("table free") > -1 ||
    message.text.toLowerCase().indexOf(this.name) > -1
  );
};

/**
 * Util function to check if a given real time message has ben sent by the norrisbot
 * @param {object} message
 * @returns {boolean}
 * @private
 */
Toby.prototype._isFromToby = function(message) {
  return message.user === this.user.id;
};

/**
 * Util function to get the name of a channel given its id
 * @param {string} channelId
 * @returns {Object}
 * @private
 */
Toby.prototype._getChannelById = function(channelId) {
  return this.channels.filter(function(item) {
    return item.id === channelId;
  })[0];
};

module.exports = Toby;
