let { sendMsg } = require("./utils");
const parseInput = require("./parseInput");



function replica(client,port) {
    
    
const commands = [
    ["*", "REPLCONF", "listening-port", `${port}`],
    ["*", "REPLCONF", "capa", "psync2"],
    ["*", "psync", "?", "-1"]

]

    client.on("connect", () => {
        sendMsg(["*","+ping"],client);
    })
      let idx = 0;
    if (client.on("data", (data) => {
        const str = data.toString();
        const parsedString = parseInput.parseInput(str);
        console.log({ parsedString });
      
        if (parsedString[0] === "pong" || parsedString[0]==="ok") {
            sendMsg(commands[idx++], client);
            console.log({ idx });
        }
    }));

}

module.exports = {replica};