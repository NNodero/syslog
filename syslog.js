import {createSocket} from 'dgram'
import fs from 'fs/promises'
// import aws from 'aws-sdk'

const server = createSocket('udp4');

export const syslogserver =()=>{


    const PORT = 514; // Standard syslog port
    const HOST = '0.0.0.0'; // Listen on all interfaces

    // const s3 = new aws.s3({region : 'ap-southeast-2'});
    // const bucket_name = 'cpd-firewall-logs';
    // const file = 'logs.json'


    const regex = /(\w+)=("(?:[^"\\]|\\.)*"|\S+)/g;

          //File name to save
    const gethourlyfilename = ()=>{      
       const time= new Date();
       time.setMinutes(0, 0, 0);  // resets seconds and milliseconds
       const timestamp = time.getTime();
       return `${timestamp}-logs.json`;
        
 }



    server.on('message', (msg, rinfo) => {

        const entry = `${msg}\n`;
        const matches = [...entry.matchAll(regex)]; // Get all matches
        const logObject = {};

        // Convert matches to key-value pairs
        for (const match of matches) {
            const [, key, value] = match;
            logObject[key] = value.replace(/^"|"$/g, ''); // Remove quotes from values
        }

        // Convert to JSON string
        const logJson = JSON.stringify(logObject) + '\n';


            fs.appendFile(gethourlyfilename(), logJson, (err) => {
                if (err) console.error('Error writing to log file:', err);
            });
            
    });
    

    server.bind(PORT, HOST, () => {
    console.log(`Syslog server listening on ${HOST}:${PORT}`);
    });



}

