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
            console.log({parsedString})
            for (let i = 0;i<parsedString.length; i++){
               
                if (parsedString[i] === "set") {
                    {
                        console.log("in set replica",parsedString[i],parsedString[i+1],parsedString[i+2]);
                        set(parsedString[++i], parsedString[++i]);
                    
                    }
                }
                else if (parsedString[i] === "get") {
                    console.log("in get replica",parsedString[i],parsedString[i+1]);
                genResponse([parsedString[i], parsedString[++i]],client);
                }
                
                else if (parsedString[i] === "getack") {
                    genResponse([parsedString[i]], client);
                }
                // else if (parsedString[i] === "ping" ||parsedString[i]==="echo") {
                //     continue;
                // }

               
      
               

            }


        }







    }));

}

module.exports = {replica};