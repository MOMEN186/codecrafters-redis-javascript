const { mainInfo } = require("./mainInfo");

let dict = new Map();

    function ping() {
        console.log("in ping");
          return("+PONG");
    }

    function echo(word) {
         return(`+${word}\r\n`);
    }
    function set(key, value, px) {
        dict.set(key, value);
        if (px) {
            setTimeout(() => {
                dict.delete(key);
            }, 100);
        }
         return("+OK");
    }
    function get(key) {
        
       return [key in dict ? dict[key] : "",]
    }

    function info() {
        return [`role:${mainInfo.role}\nmaster_replid:${mainInfo.master_replid}`
        + `\nmaster_repl_offset:${mainInfo.master_repl_offset}`];
    }

   
  
    function replconf() {
         return("+OK");
}
const psync = () => {
    return `+FULLRESYNC ${mainInfo.master_replid} 0`;
}

module.exports={ping,echo,set,get,info,replconf,psync}