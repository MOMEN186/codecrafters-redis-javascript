const { mainInfo } = require("./mainInfo");
let {dict}= require("./hashMap");

    function ping() {
        console.log("in ping");
          return[("+PONG")];
    }

    function echo(word) {
         return[`+${word}`];
    }
    function set(key, value, px) {
        dict.set(key, value);
        if (px) {
            setTimeout(() => {
                dict.delete(key);
            }, parseInt(px));
        }
         return["+OK"];
    }
function get(key) {
    console.log("key:",key.toString());
    
    console.log("has",dict.has(key.toString()));
    return dict.has(key.toString()) ? [dict.get(key.toString())] : [];
}
function info() {
       
    return [`role:${mainInfo.role}\nmaster_replid:${mainInfo.master_replid}`
        + `\nmaster_repl_offset:${mainInfo.master_repl_offset}`];
}

    function replconf() {
         return["+OK"];
}
const psync = () => {
    return [`+FULLRESYNC ${mainInfo.master_replid} 0`];
}

const getAck = () => {
    return ["*","REPLCONF", "ACK", "0"];
}

module.exports={ping,echo,set,get,info,replconf,psync,getAck}