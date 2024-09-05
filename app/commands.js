const { mainInfo } = require("./mainInfo");
let { dict } = require("./hashMap");
let offSet = require("./offSet");

    function ping() {
          return["+PONG"];
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
         return["*","+OK"];
    }
function get(key) {
    return dict.has(key.toString()) ? [dict.get(key.toString())] : [];
}
function info() {
       
    return [`role:${mainInfo.role}\nmaster_replid:${mainInfo.master_replid}`
        + `\nmaster_repl_offset:${mainInfo.master_repl_offset}`];
}

    function replconf() {
         return["*","+OK"];
}
const psync = () => {
    return [`+FULLRESYNC ${mainInfo.master_replid} 0`];
}

const getAck = () => {
    
    let bytes = offSet.getBytes() > 0 ? offSet.getBytes() + 1 : 0;
    offSet.setModify(1);
    offSet.setBytes(3);
    return ["*","REPLCONF", "ACK", `${bytes}`];
}

module.exports={ping,echo,set,get,info,replconf,psync,getAck}