const net = require("net");
const parseInput = require("./parseInput");
const response= require("./response");
var argv = require('optimist').argv;
let {mainInfo} = require("./mainInfo");
let replicaServer = require("./replica");
let port = argv.port||6379, masterPort, host;


// replica
if (argv.replicaof) {
    masterPort = Number(argv.replicaof.substr(10, argv.replicaof.length - 1));
    host = argv.replicaof.substr(0, 9);
   mainInfo.role = "slave";
    
    const client = net.createConnection({ host, port: masterPort });
    
    replicaServer(client, port);
  
}
    
// master server
const server = net.createServer((connection) => {
   
    connection.on("data", (data) => {
        const str = data.toString();
        const input = parseInput.parseInput(str);
        console.log({ input });
         response.genResponse(input,connection);
       
    
        
    });
});

server.listen(port);