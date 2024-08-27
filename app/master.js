const parseInput = require("./parseInput");
const response = require("./response");
let clients = [];


function addClients(connection) {
    clients.push(connection);
}

function removeClients(connection) {
    clients=clients.filter(client => client !== connection);
}


function master(connection) {
    
    addClients(connection);
    connection.on("data", (data) => {
        
        const str = data.toString();
        const input = parseInput.parseInput(str);
        
        response.genResponse(input, connection,clients);
      
    })

    connection.on("end", () => {
        removeClients(connection);
    })
}




module.exports = {
    master
    
 };


