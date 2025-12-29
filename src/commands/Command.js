// Command base class for creating reusable command handlers
class Command {
  constructor(options = {}) {
    this.name = options.name || 'unknown';
    this.description = options.description || 'No description provided';
    this.aliases = options.aliases || [];
    this.args = options.args || [];
  }

  // Override this method in subclasses
  async execute(message, args) {
    throw new Error('execute method must be implemented');
  }

  // Get full command help text
  getHelp() {
    return `**${this.name}** - ${this.description}\nAliases: ${this.aliases.join(', ') || 'None'}`;
  }
}

module.exports = Command;
