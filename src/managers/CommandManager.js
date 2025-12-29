// Command manager - handles registering and executing commands
class CommandManager {
  constructor() {
    this.commands = new Map();
  }

  // Register a command instance
  register(command) {
    if (!command.name) {
      throw new Error('Command must have a name property');
    }

    this.commands.set(command.name, command);

    // Register aliases
    if (command.aliases && command.aliases.length > 0) {
      command.aliases.forEach(alias => {
        this.commands.set(alias, command);
      });
    }

    console.log(`✅ Registered command: ${command.name}`);
  }

  // Get a command by name or alias
  get(name) {
    return this.commands.get(name.toLowerCase());
  }

  // Execute a command
  async execute(name, message, args) {
    const command = this.get(name);

    if (!command) {
      return false;
    }

    try {
      await command.execute(message, args);
      return true;
    } catch (error) {
      console.error(`Error executing command ${name}:`, error);
      await message.reply(`❌ Error executing command: ${error.message}`).catch(console.error);
      return false;
    }
  }

  // Get all unique commands (no aliases)
  getAll() {
    const unique = new Map();
    this.commands.forEach((command, key) => {
      if (command.name === key) {
        unique.set(key, command);
      }
    });
    return unique;
  }
}

module.exports = CommandManager;
