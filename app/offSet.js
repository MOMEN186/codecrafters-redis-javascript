var bytes = 0;
var modify = 0;
exports.getBytes = function getBytes() {
    return bytes;
}

exports.setBytes = function setBytes(add) {
    if(modify)bytes += add;
}

exports.setModify = function setModify(val) {
    modify = val;
}
