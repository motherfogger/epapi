var validateUUID = require('uuid-validate');
var sqlstring = require('sqlstring');

// function that checks if variable passed is a number. returns 0 if not, else returns the number

module.exports.number = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
}



// function that checks if variable passed is a string. returns empty string if not, else returns the string
// maybe redundant 
module.exports.string = (s) => {
    return typeof s === 'string' ? sqlstring.escape(s) : '';
}

module.exports.uuid = (s) => {
    return validateUUID(s) ? s : '';
}
