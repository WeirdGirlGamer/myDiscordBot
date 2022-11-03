"use strict";

var fs = require('node:fs');

var path = require('node:path'); // Require the necessary discord.js classes


var _require = require('discord.js'),
    Client = _require.Client,
    GatewayIntentBits = _require.GatewayIntentBits,
    Collection = _require.Collection;

var _require2 = require('./config.json'),
    token = _require2.token; // Create a new client instance


var client = new Client({
  intents: [1572]
});
client.commands = new Collection();
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

    var command = require(filePath); // Set a new item in the Collection
    // With the key as the command name and the value as the exported module


    client.commands.set(command.data.name, command);
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

client.on('interactionCreate', function _callee(interaction) {
  var command;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(interaction);

          if (interaction.isChatInputCommand()) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return");

        case 3:
          command = client.commands.get(interaction.commandName);

          if (command) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return");

        case 6:
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(command.execute(interaction));

        case 9:
          _context.next = 16;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](6);
          console.error(_context.t0);
          _context.next = 16;
          return regeneratorRuntime.awrap(interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true
          }));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 11]]);
}); // Login to Discord with your client's token

client.login(token); // When the client is ready, run this code (only once)

client.once('ready', function () {
  console.log('Ready!');
});