const Command = require('./Command');

// Example: Help command - displays all available commands
class HelpCommand extends Command {
  constructor(commandManager) {
    super({
      name: 'help',
      description: 'Display available commands',
      aliases: ['h', 'commands'],
    });
    this.commandManager = commandManager;
  }

  async execute(message, args) {
    const commandName = args[0]?.toLowerCase();

    if (commandName) {
      // Show help for specific command
      const command = this.commandManager.get(commandName);

      if (!command) {
        return message.reply(`❌ Command \`${commandName}\` not found.`);
      }

      return message.reply(command.getHelp());
    }

    // Show all commands
    const commandList = Array.from(this.commandManager.getAll().values())
      .filter((cmd, index, arr) => arr.indexOf(cmd) === index) // Remove duplicates
      .map(cmd => `**${cmd.name}** - ${cmd.description}`)
      .join('\n');

    if (!commandList) {
      return message.reply('❌ No commands registered.');
    }

    const helpText = `📚 **Available Commands**\n\n${commandList}\n\nUse \`!help <command>\` for more info`;
    await message.reply(helpText);
  }
}

module.exports = HelpCommand;
