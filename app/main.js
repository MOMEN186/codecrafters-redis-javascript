const net = require("net");
var argv = require("optimist").argv;
let { mainInfo } = require("./mainInfo");
let { replica } = require("./replica");
let masterServer = require("./master");

let port = argv.port || 6379,
  masterPort,
    host;



if (argv.replicaof) {
  //replica
  masterPort = Number(argv.replicaof.substr(10, argv.replicaof.length - 1));
  host = argv.replicaof.substr(0, 9);
  mainInfo.role = "slave";

  const client = net.createConnection({ host, port: masterPort });

  replica(client, port);
}

// master server
const server = net.createServer((connection) => {
  masterServer.master(connection);
});
server.listen(port);
