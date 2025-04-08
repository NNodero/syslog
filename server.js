const dgram = require('dgram');
const fs = require('fs');
const server = dgram.createSocket('udp4');

const PORT = 514; // Standard syslog port
const HOST = '0.0.0.0'; // Listen on all interfaces

server.on('message', (msg, rinfo) => {
  const log = msg.toString();
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${log}\n`;

  console.log(`Received log from ${rinfo.address}:${rinfo.port}`);
  console.log(entry);

  // Append to a local file (optional: later you can use DB instead)
  fs.appendFile('logs.txt', log + '\n')
});

server.bind(PORT, HOST, () => {
  console.log(`Syslog server listening on ${HOST}:${PORT}`);
});
