
const { ping, echo, get, set, info, replconf,psync } = require("./commands");
const { sendMsg } = require("./utils");
const genResponse = (arr,connection) => {


        switch (arr[0]) {
            case "ping":
                sendMsg([ping()], connection)
                break;
            case "echo":
                sendMsg([echo(arr[1])],connection);
                break;
                
            case "set":
                const key = arr[1], value = arr[2], px = arr[3];

                sendMsg([set(key, value, px)], connection);
                sendMsg(["set", key, value], connection);
                break;
                
            case "get":
                sendMsg([get([arr[1]])], connection);
                break;
                
            case "info":
                
                if (arr[1] === "replication") {
                    console.log("in replication", arr[1]);
                    sendMsg([info()],connection)  ;
                    break;
                }
                break;
            case "replconf":
                console.log("in replconf");
                sendMsg([replconf()],connection);
                break;
            case "psync":
                sendMsg([psync()], connection);
                const rdbFile64 = "UkVESVMwMDEx+glyZWRpcy12ZXIFNy4yLjD6CnJlZGlzLWJpdHPAQPoFY3RpbWXCbQi8ZfoIdXNlZC1tZW3CsMQQAPoIYW9mLWJhc2XAAP/wbjv+wP9aog==";
                const rdb = Buffer.from(rdbFile64, 'base64')
                console.log({ rdb });
                const rdbhead = Buffer.from(`$${rdb.length}\r\n`)
                connection.write(Buffer.concat([rdbhead, rdb]));
                break;
        


    }

};

module.exports = { genResponse };
