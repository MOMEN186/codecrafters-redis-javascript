
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
            // console.log("in if", newString[i])
            temp += newString[i];
        } else {
            if (temp !== "") arr.push(temp.toLowerCase());
            temp = "";
        }
    }
    if (temp !== "") arr.push(temp.toLowerCase());

    return arr;
}

module.exports = { parseInput };

