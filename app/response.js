
const genResponse = (arr, isSlave, dict) => {
    let output = [];
    const master_replid = "8371b4fb1155b71f4a04d3e1bc3e18c4a990aeeb";
     
    function ping() {
        console.log("in ping");
         output.push( "+PONG\r\n");
        
    }

    function echo(word) {
        output.push(`+${word}\r\n`);
    }
    function set(key, value, px) {
        dict.set(key, value);
        if (px) {
            setTimeout(() => {
                console.log("deleted");
                dict.delete(key);
                console.log("dict.has", dict.has(key));
            }, 100);
        }
        output.push("+OK\r\n");
    }
    function get(key) {
        const value = dict.get(key.toString());

        if (value) {
             output.push(`$${value.length}\r\n${value}\r\n`);
        } else   output.push("$-1\r\n");
    }

    function info() {
        if (isSlave) { 
            console.log("in slave");
             output.push( "$10\r\nrole:slave\r\n");
        } else {
             output.push( `$85\r\nrole:mastermaster_repl_offset:0master_replid:${master_replid}\r\n`);
        }
    }

    function psync(id, offset) {
        if (id === '?') {
            const rdbFile64 = "UkVESVMwMDEx+glyZWRpcy12ZXIFNy4yLjD6CnJlZGlzLWJpdHPAQPoFY3RpbWXCbQi8ZfoIdXNlZC1tZW3CsMQQAPoIYW9mLWJhc2XAAP/wbjv+wP9aog==";
            const rdb =  Buffer.from(rdbFile64, 'base64')
            const rdbhead= Buffer.from(`$${rdb.length}\r\n`) 
            output.push(`+FULLRESYNC ${master_replid} 0\r\n`);
            console.log("FULL RESYNC");
            console.log({rdb})
            output.push(Buffer.concat([rdbhead, rdb]));
        }
    }

  
    function replconf() {
        
        output.push("+OK\r\n");
        console.log({"in repclonf":output})
    }
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {

        switch (arr[i]) {
            case "ping":
                ping();
                break;
            case "echo":
                i++;
                echo(arr[i]);
                break;
                
            case "set":
                const key = arr[i + 1], value = arr[i + 2], px = arr[i + 3];
                i += 3;
                set(key, value, px);
                break;
                
            case "get":
                get(arr[++i]);
                break;;
                
            case "info":
                i++;
                if (arr[i] === "replication") {
                    console.log("in replication", arr[i]);
                     info();
                    break;
                }
                break;
            case "replconf":
                console.log("in replconf");
                replconf();
                break;
            case "psync":
                const id = arr[++i], offset = arr[++i];
                console.log("in psync")
                psync(id, offset);
                break;
        }


    }
    console.log({output})
    return output;
};

module.exports = { genResponse };
