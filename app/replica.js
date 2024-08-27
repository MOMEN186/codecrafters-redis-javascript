let { sendMsg } = require("./utils");
const parseInput = require("./parseInput");
function replica(client,port) {
    
    client.on("connect", () => {
        sendMsg(["*","+ping"],client);
    })
    
    if (client.on("data", (data) => {
        const str = data.toString();
        const parsedString = parseInput.parseInput(str);
        if (parsedString[0] === "pong") {
            sendMsg(["*","REPLCONF","listening-port",`${port}`], client);
            sendMsg(["*","REPLCONF", "capa", "psync2"],client);
             sendMsg(["*", "psync", "?", "-1"], client);
        }
    }));

}

module.exports = {replica};