
var offSet = require("./offSet");
let idx = 0;
const parseInput = (str) => {
    const pattern = "\r\n";
    let newString = "";
    let arr = [];
    let splitted = str.split("*");

    console.log({ str });

    for (let i = 0; i < splitted.length; i++) offSet.setBytes(splitted[i].length);


    for (let i = 0; i < str.length; i++){
        let x = str.substring(i, i + 2);

        if (x === pattern) {
            i += 2;
            if (str[i] === '$') continue;

            for (i; i < str.length; i++){
                if (str.substring(i, i + 2) === pattern) break;
                newString += str[i];
            }
            arr.push(newString.toLowerCase());
            newString = "";
        }
        else if (str[i] === "+") {
            i++;
            for (i; i < str.length; i++){
                if (str.substring(i, i + 2) === pattern) break;
                newString += str[i];
            }
            arr.push(newString.toLowerCase());
            newString = "";
        }
    }
    return arr;

}

module.exports = { parseInput };
