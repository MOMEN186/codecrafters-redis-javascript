const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
const server = net.createServer((connection) => {
    // Handle connection
    let dict = new Map();
    connection.on('data', (data) => {
        const str = data.toString();
        const pattern = "\r\n";
        
         let newString = "";
        let arr = [];
      

        for (let i = 0; i < str.length; i++){
            if (!pattern.includes(str[i])) {
                newString += str[i];
            }
            else newString += "";
        }
        
        console.log("newString:", newString);
        let temp = "";
        for (let i = 0; i < newString.length; i++){
            if ((newString[i].toLowerCase() !== newString[i].toUpperCase())) {
                // console.log("in if", newString[i])
                temp += newString[i];
            }
            else {
                if(temp!=="")arr.push(temp.toLowerCase());
                temp = "";
            }
        }
        if (temp !== "") arr.push(temp.toLowerCase());

        console.log(arr);
        
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "echo") {
                i++;
                connection.write(`+${arr[i]}\r\n`);
            }
            else if (arr[i] === "ping") {
                connection.write("+PONG\r\n");
            }
            else if (arr[i] === "set") {
                const key = arr[++i];
                const value = arr[++i];
                temp = key;
                dict.set(key, value);
                console.log("has", dict.has(key));
                connection.write("+OK\r\n");
            }
            else if (arr[i] === "get") {
                console.log("get", arr[i + 1]);
                console.log("all array", arr);
                const key = arr[++i];
                const value = dict.get(key.toString());
                console.log("value, temp",key===temp);
                if (value) {
                    connection.write(`$${value.length}\r\n${value}\r\n`);
                }
                else connection.write("$-1\r\n");
            }
        }
        
   
       
    })
});
//
server.listen(6379);
