const genResponse = (arr, isSlave, dict) => {
    const master_replid = "8371b4fb1155b71f4a04d3e1bc3e18c4a990aeeb";

    function ping() {
        return "+PONG\r\n";
    }

    function echo(word) {
        return `+${word}\r\n`;
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
        return "+OK\r\n";
    }

    function info() {
        if (isSlave) { 
            console.log("in slave");
            return "$10\r\nrole:slave\r\n";
        } else {
            return `$85\r\nrole:mastermaster_repl_offset:0master_replid:${master_replid}\r\n`;
        }
    }

    function get(key) {
        const value = dict.get(key.toString());

        if (value) {
            return `$${value.length}\r\n${value}\r\n`;
        } else return "$-1\r\n";
    }
    function replconf() {
       return "+OK\r\n";
    }

    for (let i = 0; i < arr.length; i++) {


        switch (arr[i]) {
            case "ping":
              return   ping();
                break;
            case "echo":
                i++;
              return  echo(arr[i]);
                break;
            case "set":
                const key = arr[i + 1], value = arr[i + 2], px = arr[i + 3];
                i += 3;
               return set(key, value, px);
                break;
            case "get":
               return get(arr[++i]);
                break;
            case "info":
                i++;
                if (arr[i] === "replication") {
                    console.log("in replication", arr[i]);
                  return info();
                }
                break;
            case "replconf":
               return replconf();
                break;
        }


    }
};

module.exports = { genResponse };
