
function updateOffset(str) {
    
    // const splitted = str.split(/\*\d+[\r\n]*/);
    // const arr = (splitted.toString()).split("\r\n");
    

    // let cnt = splitted.length;
    // // console.log({ cnt });

    // for (let i = 0; i < arr.length; i++){
    //     cnt += arr[i].length;
    // }

    // return ( cnt - (splitted.length - 1)) + 2 * arr.length;

    return str.length;
}


module.exports = {updateOffset}