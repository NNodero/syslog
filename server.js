const dgram = require('dgram');
const fs = require('fs');
const server = dgram.createSocket('udp4');

const PORT = 514; // Standard syslog port
const HOST = '0.0.0.0'; // Listen on all interfaces

server.on('message', (msg, rinfo) => {
  const log = msg.toString().trim();
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] (${rinfo.address}:${rinfo.port}) ${log}\n`;

  console.log(entry);

  fs.appendFile('logs.txt', entry, (err) => {
    if (err) console.error('Error writing to log file:', err);
  });
});

server.bind(PORT, HOST, () => {
  console.log(`Syslog server listening on ${HOST}:${PORT}`);
});
