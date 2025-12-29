// Utility class for command prefix handling and parsing
class CommandParser {
  constructor(prefix) {
    this.prefix = prefix;
  }

  // Parse message content into command and args
  parse(content) {
    if (!content.startsWith(this.prefix)) {
      return null;
    }

    const args = content.slice(this.prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();

    return { command, args };
  }

  // Check if message is a command
  isCommand(content) {
    return content.startsWith(this.prefix);
  }
}

module.exports = CommandParser;
