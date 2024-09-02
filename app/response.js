
const { sendMsg } = require("./utils");
const { mainInfo } = require("./mainInfo");
const { ping, echo, get, set, info, replconf, psync } = require("./commands");
const { clients } = require("./clients");

const genResponse = (arr,connection) => {
   
   
        switch (arr[0]) {
            case "ping":
                sendMsg(ping(), connection)
                break;
            case "echo":
                sendMsg(echo(arr[1]),connection);
                break;
                
            case "set":
                const key = arr[1], value = arr[2], px = arr[4];
                console.log({arr})
                sendMsg(set(key, value, px), connection);
                console.log("in response:", { arr });
                if (mainInfo.role == "master") {
                    clients.forEach(client => sendMsg(["*","SET",key,value],client));
                }
                break;
                
            case "get":
                sendMsg(get([arr[1]]), connection);
                break;
                
            case "info":
                
                if (arr[1] === "replication") {     
                    sendMsg(info(), connection);
                    break;
                }
                break;
            case "replconf":
                console.log("in replconf");
                sendMsg(replconf(),connection);
                break;
            case "psync":
                sendMsg(psync(), connection);
                const rdbFile64 = "UkVESVMwMDEx+glyZWRpcy12ZXIFNy4yLjD6CnJlZGlzLWJpdHPAQPoFY3RpbWXCbQi8ZfoIdXNlZC1tZW3CsMQQAPoIYW9mLWJhc2XAAP/wbjv+wP9aog==";
                const rdb = Buffer.from(rdbFile64, 'base64')
                console.log({ rdb });
                const rdbhead = Buffer.from(`$${rdb.length}\r\n`)
                connection.write(Buffer.concat([rdbhead, rdb]));
                clients.push(connection);
                break;
        


    }

};

module.exports = { genResponse };
