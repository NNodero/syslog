// const dgram = require('dgram');
// const fs = require('fs');

// function syslogserver(){
    
// }
// const server = dgram.createSocket('udp4');

// const PORT = 514; // Standard syslog port
// const HOST = '0.0.0.0'; // Listen on all interfaces

// const regex = /(\w+)=("(?:[^"\\]|\\.)*"|\S+)/g;

// server.on('message', (msg, rinfo) => {
//   const entry = `${msg}\n`;
//   const matches = [...entry.matchAll(regex)]; // Get all matches
//   const logObject = {};

//   // Convert matches to key-value pairs
//   for (const match of matches) {
//     const [, key, value] = match;
//     logObject[key] = value.replace(/^"|"$/g, ''); // Remove quotes from values
//   }

//   // Convert to JSON string
//   const logJson = JSON.stringify(logObject) + '\n';

//   console.log(logObject);

//   fs.appendFile('logs.json', logJson, (err) => {
//     if (err) console.error('Error writing to log file:', err);
//   });
// });

// server.bind(PORT, HOST, () => {
//   console.log(`Syslog server listening on ${HOST}:${PORT}`);
// });