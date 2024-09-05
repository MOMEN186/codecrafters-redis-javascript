
function formatmsg(msgs) {
    
    let reply = [];
    if (msgs.length === 0) {
        return "$-1\r\n";
    }
  console.log({msgs})
    for (let i = 0; i < msgs.length; i++) {
        const msg = msgs[i];
      
        if (msg[0] === '+') {
        
            reply.push(msg);
        }
        else if (msg[0] === "*") {// array
            reply.push(`*${msgs.length-1}`)
        }
        else if (msg[0] !== '$') {
            reply.push("$" + msg.length.toString());
            reply.push(msg);  
        }
        else {
            reply.push(msg);
            reply.push(msgs[i + 1]);
            i++;
        }
      
    }
    return reply.join('\r\n') + '\r\n';

}

function sendMsg(msg,connection) {
    const formattedMessage = formatmsg(msg);
    console.log({formattedMessage});
    connection.write(formattedMessage);
 
}


module.exports = { sendMsg };