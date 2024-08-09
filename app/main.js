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
    
    
    const client = net.createConnection({ host, port: masterPort });
    
    const commands = ["*1\r\n$4\r\nPING\r\n", `*3\r\n$8\r\nREPLCONF\r\n$14\r\nlistening-port\r\n$4\r\n${port}\r\n`, "*3\r\n$8\r\nREPLCONF\r\n$4\r\ncapa\r\n$6\r\npsync2\r\n","*3\r\n$5\r\nPSYNC\r\n$1\r\n?\r\n$2\r\n-1\r\n"];
    let idx = 0;
    client.write(commands[idx++]);
    
    if (client.on("data", (data) => {
        const str = data.toString();
        const parsedString = parseInput.parseInput(str);
        console.log({"":parsedString,"parsedString===ppong":parsedString==="pong"});
        if ((parsedString[0] === "pong" ||parsedString[0]==="ok")&& idx<commands.length) {
            console.log({idx});
            client.write(commands[idx++]);
        }

    }));
}
    




const server = net.createServer((connection) => {
   
    let dict = new Map();
    
    connection.on("data", (data) => {
        const str = data.toString();
        const input = parseInput.parseInput(str);
        const output = response.genResponse(input,argv.replicaof,dict);
        console.log("input", input);
        console.log("output in master", output);
        connection.write(output); 
    });
});
server.listen(port);