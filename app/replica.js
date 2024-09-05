let { sendMsg } = require("./utils");
const parseInput = require("./parseInput");
let { genResponse } = require("./response");
let { ping,getAck,set} = require("./commands");
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
        
      
        if (parsedString[0] === "pong" || parsedString[0]==="ok") {
            sendMsg(commands[idx++], client);
         
        }

        else {
         
            for (let i = parsedString.length-1;i>=0; i--){
               
                if (parsedString[i] === "set") {
                    {
                   genResponse([parsedString[i],parsedString[++i],parsedString[++i]],client);
                    }
                }
                
                else if (parsedString[i] === "getack") {
                    genResponse([parsedString[i]], client);
                }
                else if (parsedString[i] === "ping" ||parsedString[i]==="echo") {
                    continue;
                }

               
      
               

            }


        }







    }));

}

module.exports = {replica};