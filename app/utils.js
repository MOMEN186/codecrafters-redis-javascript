function formatmsg(msgs) {
    
    let reply = [];
    if (msgs.length === 0) {
        return "$-1\r\n";
    }

    for (let i = 0; i < msgs.length; i++) {
        const msg = msgs[i];
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
    console.log("in sendMsg",{msg});
    connection.write(formatmsg(msg));
}

function BroadCast(msg, clients,connection) {
    clients.forEach(client => {
        if(connection!==client)
        sendMsg(msg, client);
    })
}


module.exports={sendMsg,BroadCast}
