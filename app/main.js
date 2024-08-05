const net = require("net");
// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");
// Uncomment this block to pass the first stage
const server = net.createServer((connection) => {
    // Handle connection
    connection.addListener('data', (data) => {
      const dataStr = data.toString();
      if (dataStr === '*1\r\n$4\r\nping\r\n') {
        connection.write('+PONG\r\n');
       
      }
    })
    connection.on("close", () => {
      connection.end();
    })
});
process.on('exit', () => {
  server.close();
})
server.listen(6379, "127.0.0.1");