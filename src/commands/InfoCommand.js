const Command = require('./Command');

// Example: Info command - displays user info
class InfoCommand extends Command {
  constructor() {
    super({
      name: 'info',
      description: 'Get information about a user',
      aliases: ['userinfo', 'user'],
    });
  }

  async execute(message, args) {
    const targetUser = message.mentions.users.first() || message.author;
    const createdAt = new Date(targetUser.createdTimestamp).toLocaleDateString();
    const isBot = targetUser.bot ? 'Yes ✅' : 'No ❌';

    const infoText = `📋 **User Information**\n\n**Username:** ${targetUser.username}\n**ID:** ${targetUser.id}\n**Created:** ${createdAt}\n**Bot:** ${isBot}`;

    await message.reply(infoText);
  }
}

module.exports = InfoCommand;
