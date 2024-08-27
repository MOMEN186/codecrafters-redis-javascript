function formatmsg(msgs) {
    
    let reply = [];
    if (msgs.length === 0) {
        return "$-1\r\n";
    }

    for (let i = 0; i < msgs.length; i++) {
        const msg = msgs[i];
        console.log({msg})
        if (msg[0] === '+') {
         
            reply.push(msg);
        }
        else if (msg[0] === '*') {// array
            reply.push(`*${msgs.length-1}`)
        }
        else if (msg[0] !== '$') {
            reply.push("$" + msg.length.toString());
            reply.push(msg);   console.log({msg});
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
 
    connection.write(formatmsg(msg));// format resp

}






module.exports={sendMsg}
