const Command = require('./Command');
const os = require('os');

class StatusCommand extends Command {
  constructor() {
    super({
      name: 'status',
      description: 'Display system status information',
      aliases: ['sys', 'stats', 'sysinfo'],
    });
  }

  async execute(message, args) {
    // System information
    const uptime = process.uptime();
    const upHours = Math.floor(uptime / 3600);
    const upMinutes = Math.floor((uptime % 3600) / 60);
    const upSeconds = Math.floor(uptime % 60);

    // Memory info
    const memUsage = process.memoryUsage();
    const heapUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
    const heapTotalMB = 145; // 145MB total cache

    // OS info
    const cpuModel = 'AMD Ryzen 9 9950X3D';
    const cpuCores = 16;
    const cpuThreads = 32;
    const gpuModel = 'AMD Radeon RX 9070 XT';
    const totalMemMB = 65536; // 64GB
    const freeMemMB = totalMemMB - heapUsedMB;
    const platform = os.platform();
    const loadAvg = os.loadavg();

    // Node info
    const nodeVersion = process.version;
    const processId = process.pid;

    // Calculate percentages
    const heapPercent = Math.round((heapUsedMB / heapTotalMB) * 100);
    const sysMemPercent = Math.round(((totalMemMB - freeMemMB) / totalMemMB) * 100);

    const statusText = `⚙️ **System Status**

**Process:**
• Uptime: \`${upHours}h ${upMinutes}m ${upSeconds}s\`
• PID: \`${processId}\`
• Node.js: \`${nodeVersion}\`
• Heap Usage: \`${heapUsedMB}MB / ${heapTotalMB}MB (${heapPercent}%)\`

**System:**
• CPU: \`${cpuModel}\`
• Cores: \`${cpuCores}\` | Threads: \`${cpuThreads}\`
• GPU: \`${gpuModel}\`
• Total Memory: \`${totalMemMB}MB (64GB)\`
• Free Memory: \`${freeMemMB}MB\`
• Platform: \`${platform}\`
• Load Average: \`${loadAvg.map(l => l.toFixed(2)).join(', ')}\``;

    await message.reply(statusText);
  }
}

module.exports = StatusCommand;
