const Command = require('./Command');

// Example: Echo command - repeats what user says
class EchoCommand extends Command {
  constructor() {
    super({
      name: 'echo',
      description: 'Repeat a message',
      aliases: ['repeat', 'say'],
      args: ['text'],
    });
  }

  async execute(message, args) {
    if (args.length === 0) {
      return message.reply('❌ Please provide text to echo!');
    }

    const text = args.join(' ');
    await message.reply(text);
  }
}

module.exports = EchoCommand;
