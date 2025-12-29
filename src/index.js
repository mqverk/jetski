require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');
const CommandManager = require('./managers/CommandManager');
const CommandParser = require('./utils/CommandParser');

// Monkey-patch to fix the friend_source_flags bug
const ClientUserSettingManager = require('discord.js-selfbot-v13/src/managers/ClientUserSettingManager');
const originalPatch = ClientUserSettingManager.prototype._patch;
ClientUserSettingManager.prototype._patch = function(data) {
  if (data && data.friend_source_flags === null) {
    data.friend_source_flags = { all: false };
  }
  return originalPatch.call(this, data);
};

// Import commands
const PingCommand = require('./commands/PingCommand');
const HelpCommand = require('./commands/HelpCommand');
const EchoCommand = require('./commands/EchoCommand');
const InfoCommand = require('./commands/InfoCommand');
const StatusCommand = require('./commands/StatusCommand');
const AFKCommand = require('./commands/AFKCommand');

// Configuration
const PREFIX = process.env.PREFIX || '!';
const TOKEN = process.env.TOKEN;

if (!TOKEN) {
  console.error('❌ TOKEN not found in .env file');
  process.exit(1);
}

// Initialize client with selfbot mode
const client = new Client({
  checkUpdate: false,
  ws: {
    properties: {
      browser: 'Discord Client',
    },
  },
});

// Initialize managers
const commandManager = new CommandManager();
const commandParser = new CommandParser(PREFIX);

// Register commands
commandManager.register(new PingCommand());
commandManager.register(new EchoCommand());
commandManager.register(new InfoCommand());
commandManager.register(new StatusCommand());
commandManager.register(new AFKCommand());

// Register help command last so it has access to all commands
const helpCommand = new HelpCommand(commandManager.getAll());
commandManager.register(helpCommand);

// ==================== EVENT HANDLERS ====================

// Ready event - fires when client is logged in
client.on('ready', () => {
  try {
    console.log(`
╔════════════════════════════════════╗
║  🤖 SELFBOT READY!                 ║
║  User: ${client.user.username}#${client.user.discriminator}
║  ID: ${client.user.id}
║  Prefix: ${PREFIX}
╚════════════════════════════════════╝
    `);
  } catch (error) {
    console.log(`
╔════════════════════════════════════╗
║  🤖 SELFBOT CONNECTED!             ║
║  Prefix: ${PREFIX}
╚════════════════════════════════════╝
    `);
  }
});

// Message event - fires on every message (including own messages in selfbot)
client.on('messageCreate', async (message) => {
  try {
    // Ignore bot messages (except self)
    if (message.author.bot && message.author.id !== client.user.id) {
      return;
    }

    // Check if message is a command
    if (!commandParser.isCommand(message.content)) {
      return;
    }

    // Parse command
    const parsed = commandParser.parse(message.content);
    if (!parsed) {
      return;
    }

    const { command, args } = parsed;

    console.log(`📨 Command: ${command} | Args: ${args.join(', ') || 'none'}`);

    // Execute command
    const executed = await commandManager.execute(command, message, args);

    if (!executed) {
      await message.reply(`❌ Unknown command: \`${command}\`. Type \`${PREFIX}help\` for available commands.`);
    }
  } catch (error) {
    console.error('Error handling message:', error);
  }
});

// Message update event - fires when a message is edited
client.on('messageUpdate', async (oldMessage, newMessage) => {
  // This is useful for editing command responses
  console.log(`📝 Message edited: ${newMessage.content}`);
});

// Error handler
client.on('error', error => {
  console.error('❌ Client error:', error.message);
});

// Warn handler
client.on('warn', warning => {
  console.warn('⚠️ Warning:', warning);
});

// Handle uncaught exceptions from library
process.on('uncaughtException', error => {
  if (error.message.includes('Cannot read properties of null') && 
      error.message.includes('friend_source_flags')) {
    console.warn('⚠️ Library warning (non-fatal):', error.message);
    // Don't exit, continue running
    return;
  } else {
    console.error('❌ Uncaught exception:', error);
    process.exit(1);
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', error => {
  console.error('❌ Unhandled rejection:', error);
});

// Login
client.login(TOKEN);
