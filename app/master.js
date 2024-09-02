const parseInput = require("./parseInput");
const response = require("./response");

function master(connection) {
    
    
    connection.on("data", (data) => {
        
        const str = data.toString();
        const input = parseInput.parseInput(str);
        
        response.genResponse(input, connection);
      
    })

  
}




module.exports = {
    master
    
 };


