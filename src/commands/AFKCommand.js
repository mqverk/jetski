const Command = require('./Command');

// Simple in-memory AFK storage
let afkStatus = {
  isAFK: false,
  mode: 'afk',
  message: '',
  since: null,
};

// Predefined modes with emojis
const modes = {
  afk: { emoji: '🔴', name: 'Away from Keyboard' },
  busy: { emoji: '🟠', name: 'Busy' },
  sleeping: { emoji: '😴', name: 'Sleeping' },
  out: { emoji: '🚗', name: 'Out' },
  gaming: { emoji: '🎮', name: 'Gaming' },
  coding: { emoji: '💻', name: 'Coding' },
  working: { emoji: '💼', name: 'Working' },
  studying: { emoji: '📚', name: 'Studying' },
  dnd: { emoji: '🔕', name: 'Do Not Disturb' },
};

class AFKCommand extends Command {
  constructor() {
    super({
      name: 'afk',
      description: 'Set AFK status with different modes',
      aliases: ['away', 'brb', 'status'],
    });
  }

  async execute(message, args) {
    if (args.length === 0) {
      // Toggle AFK off
      if (afkStatus.isAFK) {
        const duration = this.getDuration(afkStatus.since);
        const modeInfo = modes[afkStatus.mode] || modes.afk;
        afkStatus.isAFK = false;
        afkStatus.mode = 'afk';
        afkStatus.message = '';
        afkStatus.since = null;
        return message.reply(`✅ Back online! Was ${modeInfo.emoji} **${modeInfo.name}** for ${duration}`);
      } else {
        return message.reply('❌ You are not AFK. Use `!afk <mode> [message]` to set a mode.');
      }
    }

    const requestedMode = args[0].toLowerCase();

    // Check if it's a valid mode
    if (!modes[requestedMode]) {
      return message.reply(`❌ Invalid mode. Available modes:\n${Object.entries(modes).map(([key, val]) => `${val.emoji} **${key}** - ${val.name}`).join('\n')}`);
    }

    // Set the mode
    const customMessage = args.slice(1).join(' ');
    afkStatus.isAFK = true;
    afkStatus.mode = requestedMode;
    afkStatus.message = customMessage;
    afkStatus.since = Date.now();

    const modeInfo = modes[requestedMode];
    const msgText = customMessage ? `\n📝 Message: "${customMessage}"` : '';

    await message.reply(`✅ AFK mode **enabled**\n${modeInfo.emoji} **${modeInfo.name}**${msgText}`);
  }

  getStatus() {
    return afkStatus;
  }

  setStatus(status) {
    afkStatus = status;
  }

  getAfkMessage() {
    if (!afkStatus.isAFK) return null;
    const modeInfo = modes[afkStatus.mode] || modes.afk;
    const baseMsg = `${modeInfo.emoji} ${modeInfo.name}`;
    return afkStatus.message ? `${baseMsg} - ${afkStatus.message}` : baseMsg;
  }

  getDuration(startTime) {
    if (!startTime) return 'unknown';

    const elapsed = Date.now() - startTime;
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }
}

module.exports = AFKCommand;
