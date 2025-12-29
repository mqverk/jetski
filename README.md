# Discord.js Selfbot

A simple Discord selfbot built with discord.js-selfbot-v13 for learning advanced JavaScript development with Discord.

## Features

- ✅ Command system with Command class inheritance
- ✅ Command manager for registering and executing commands
- ✅ Command parser for handling prefix-based commands
- ✅ Built-in commands: ping, help, echo, info
- ✅ Event handling system
- ✅ Error handling and logging
- ✅ Extensible architecture for adding new commands

## Setup

### Prerequisites

- Node.js 16+
- Discord account

### Installation

1. Clone or create the project:
```bash
cd /home/await/Projects/jetski
npm install
```

2. Create a `.env` file from the template:
```bash
cp .env.example .env
```

3. Add your Discord token to `.env`:
```
TOKEN=your_discord_token_here
PREFIX=!
```

### Getting Your Discord Token

**⚠️ WARNING: Your token is sensitive! Never share it!**

1. Open Discord in your browser and open DevTools (F12)
2. Go to Application → Cookies → select discord.com
3. Find the `__Secure-next-auth.session-token` cookie
4. Copy the value and paste it into your `.env` file

Alternatively, use this in the browser console:
```javascript
(function() {
    const token = document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage.getItem('token');
    if(!token) alert('No token found!');
    else {alert(token); console.log(token);}
})();
```

## Running

Development with auto-reload:
```bash
npm run dev
```

Production:
```bash
npm start
```

## Commands

| Command | Description | Aliases |
|---------|-------------|---------|
| `!ping` | Check bot latency | `p`, `latency` |
| `!help [command]` | Show all commands or info about one | `h`, `commands` |
| `!echo <text>` | Repeat a message | `repeat`, `say` |
| `!info [@user]` | Get user info | `userinfo`, `user` |

## Project Structure

```
src/
├── index.js              # Main bot entry point
├── commands/             # Command implementations
│   ├── Command.js        # Base command class
│   ├── PingCommand.js    # Example command
│   ├── HelpCommand.js    # Help command
│   ├── EchoCommand.js    # Echo command
│   └── InfoCommand.js    # Info command
├── managers/             # Manager classes
│   ├── CommandManager.js # Handles command registration and execution
│   └── EventManager.js   # Handles event management
└── utils/                # Utility classes
    └── CommandParser.js  # Parses command syntax
```

## Learning Advanced JavaScript

This selfbot demonstrates several advanced JavaScript concepts:

### 1. **Class Inheritance**
```javascript
class Command {
  execute(message, args) { /* override in subclasses */ }
}

class PingCommand extends Command {
  execute(message, args) { /* implementation */ }
}
```

### 2. **Map Data Structure**
```javascript
this.commands = new Map();
this.commands.set(command.name, command);
```

### 3. **Async/Await & Error Handling**
```javascript
async execute(command, message, args) {
  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
  }
}
```

### 4. **Higher-Order Functions**
```javascript
const commandList = Array.from(this.commands.values())
  .map(cmd => `**${cmd.name}** - ${cmd.description}`)
  .join('\n');
```

### 5. **Event-Driven Architecture**
```javascript
client.on('messageCreate', async (message) => {
  // Handle message events
});
```

## Creating New Commands

1. Create a new file in `src/commands/`:

```javascript
const Command = require('./Command');

class MyCommand extends Command {
  constructor() {
    super({
      name: 'mycommand',
      description: 'What it does',
      aliases: ['mc', 'alias2'],
    });
  }

  async execute(message, args) {
    // Command logic here
    await message.reply('Response');
  }
}

module.exports = MyCommand;
```

2. Register it in `src/index.js`:

```javascript
const MyCommand = require('./commands/MyCommand');

commandManager.register(new MyCommand());
```

## Important Notes

⚠️ **Selfbot Usage**: Discord's Terms of Service prohibit selfbots. Use this for educational purposes only and at your own risk.

## License

MIT
