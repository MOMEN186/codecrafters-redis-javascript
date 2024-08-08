const net = require("net");
const readline = require('node:readline');
const parseInput = require("./parseInput");
const response= require("./response");
var argv = require('optimist').argv;




let port = argv.port||6379, masterPort, host;

console.log("replicaof", argv.replicaof);
if (argv.replicaof) {
    masterPort = Number(argv.replicaof.substr(10, argv.replicaof.length - 1));
    host = argv.replicaof.substr(0, 9);
    
    
    const client = net.createConnection({ host, port:masterPort });
    client.write(`*1\r\n$4\r\nPING\r\n`);
}
console.log({ host, port, masterPort });



const server = net.createServer((connection) => {
   
    let dict = new Map();
    
    connection.on("data", (data) => {
        const str = data.toString();
        
       
        const input = parseInput.parseInput(str);
        const output = response.genResponse(input,argv.replicaof,dict);
        console.log("input", input);
        console.log("output", output);
        connection.write(output); 
        


       
    });
});
//
server.listen(port);
