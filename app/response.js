const genResponse = (arr,isSlave,dict) => {
    
    const master_replid = "8371b4fb1155b71f4a04d3e1bc3e18c4a990aeeb";
 

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "echo") {
            i++;
            return(`+${arr[i]}\r\n`);
        }
        else if (arr[i] == "ping") {
            console.log("ping");
             return("+PONG\r\n");
        }
        
        
        else if (arr[i] === "set") {
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
            return("+OK\r\n");
        } else if (arr[i] === "get") {
            const key = arr[++i];
            const value = dict.get(key.toString());
            console.log("value", value);
            if (value) {
                return(`$${value.length}\r\n${value}\r\n`);
            } else return("$-1\r\n");
        }
        else if (arr[i] === "info") {
            i++;
            if (arr[i] === "replication") {
                if (isSlave) {
                    return("$10\r\nrole:slave\r\n");
                }
                else {
                    return(`$85\r\nrole:mastermaster_repl_offset:0master_replid:${master_replid}\r\n`);
                }
            }
        }
        
      
  
    }


}

module.exports = { genResponse };