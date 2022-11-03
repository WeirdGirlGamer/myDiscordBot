"use strict";

var fs = require('node:fs');

var path = require('node:path');

var _require = require('@discordjs/rest'),
    REST = _require.REST;

var _require2 = require('discord.js'),
    Routes = _require2.Routes;

var _require3 = require('./config.json'),
    clientID = _require3.clientID,
    guildID = _require3.guildID,
    token = _require3.token;

var rest = new REST({
  version: '10'
}).setToken(token);
var commands = [];
var commandsPath = path.join(__dirname, 'commands');
var commandFiles = fs.readdirSync(commandsPath).filter(function (file) {
  return file.endsWith('.js');
});
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = commandFiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var file = _step.value;
    var filePath = path.join(commandsPath, file);

    var command = require(filePath);

    commands.push(command.data.toJSON());
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log('Started refreshing application (/) commands.');
          _context.next = 4;
          return regeneratorRuntime.awrap(rest.put(Routes.applicationGuildCommands(guildID), {
            body: commands
          }));

        case 4:
          console.log('Successfully reloaded application (/) commands.');
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
})();