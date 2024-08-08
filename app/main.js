const net = require("net");
const readline = require('node:readline');
var argv = require('optimist').argv;



let port =argv.port ||6379 ;

const server = net.createServer((connection) => {
    // Handle connection
    let dict = new Map();
  
    connection.on("data", (data) => {
        const str = data.toString();
        const pattern = "\r\n";

        let newString = "";
        let arr = [];

        for (let i = 0; i < str.length; i++) {
            if (!pattern.includes(str[i])) {
                newString += str[i];
            } else newString += "";
        }

        console.log("newString:", newString);
        let temp = "";
        for (let i = 0; i < newString.length; i++) {
            if (
                newString[i].toLowerCase() !== newString[i].toUpperCase() ||
                arr[arr.length - 1] === "px"
            ) {
                // console.log("in if", newString[i])
                temp += newString[i];
            } else {
                if (temp !== "") arr.push(temp.toLowerCase());
                temp = "";
            }
        }
        if (temp !== "") arr.push(temp.toLowerCase());

        // console.log(arr);

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "echo") {
                i++;
                connection.write(`+${arr[i]}\r\n`);
            } else if (arr[i] == "ping") {
                connection.write("+PONG\r\n");
            } else if (arr[i] === "set") {
                const key = arr[++i];
                const value = arr[++i];
                dict.set(key, value);
                console.log("has", dict.has(key));
                if (arr[i + 1] === "px") {
                    i += 2;
                    console.log("time :",Number( arr[i]));
                    setTimeout(() => {
                        console.log("deleted");;
                        dict.delete(key);
                        console.log("dict.has", dict.has(key));
                    }, 100);
                   
                }
                connection.write("+OK\r\n");
            } else if (arr[i] === "get") {
                // console.log("get", arr[i + 1]);
                // console.log("all array", arr);
                const key = arr[++i];
                const value = dict.get(key.toString());
                console.log("value", value);
                if (value) {
                    connection.write(`$${value.length}\r\n${value}\r\n`);
                } else connection.write("$-1\r\n");
            }
            else if (arr[i] === "info") {
                i++;
                if (arr[i] === "replication") {
                    connection.write("$11\r\nrole:master\r\n");
                }
            }
          
        }
    });
});
//
server.listen(port)
