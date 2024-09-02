
const parseInput = (str) => {
    const pattern = "\r\n";
    let newString = "";
    let arr = [];
   
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
//    console.log({newString});
//     let temp = "";
//     for (let i = 0; i < newString.length; i++){
//         if (newString[i] === "/") {
//             arr.push(temp.toLowerCase());
//             temp = "";
//             continue;
//         }
//         temp += newString[i];
//     }

//     if (temp!=="/") arr.push(temp.toLowerCase());
//     console.log({ arr, temp });
    return arr;

}

module.exports = { parseInput };
