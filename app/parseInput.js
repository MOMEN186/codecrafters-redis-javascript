
const parseInput = (str) => {
    const pattern = "\r\n";
    let newString = "";
    let arr = [];
    console.log({ str });
    for (let i = 0; i < str.length; i++) {
        if (!pattern.includes(str[i])) {
            newString += str[i];
        } else newString += "";
    }

    console.log("newString:", newString);
    let temp = "";
    for (let i = 0; i < newString.length; i++) {
        if (
            newString[i].toLowerCase() !== newString[i].toUpperCase() ||
            arr[arr.length - 1] === "px" 
        ) {
            temp += newString[i];
        }
        else if (arr[arr.length - 1] === 'psync') {
            console.log('HI ', arr, newString, newString[i]);
            let a = newString[i + 1];
            let b = newString[i + 4] + newString[i + 5];
            arr.push(a);
            arr.push(b);
            i += 6;
        }
        else {
            if (temp !== "") arr.push(temp.toLowerCase());
            temp = "";
        }
    }
    if (temp !== "") arr.push(temp.toLowerCase());
    console.log("in input parser",{arr})
    
  
    
    console.log({ arr });
    
    return arr;
}

module.exports = { parseInput };

