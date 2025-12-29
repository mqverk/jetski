const Command = require('./Command');

// Example: Ping command - responds with latency
class PingCommand extends Command {
  constructor() {
    super({
      name: 'ping',
      description: 'Check bot latency',
      aliases: ['p', 'latency'],
    });
  }

  async execute(message, args) {
    const sent = await message.reply('Pinging...');
    const latency = sent.createdTimestamp - message.createdTimestamp;
    await sent.edit(`🏓 Pong! Latency: **${latency}ms**`);
  }
}

module.exports = PingCommand;
