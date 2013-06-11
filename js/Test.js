(function(global) {

var _instance = null;
var _result = [];

function Test() {
    if (_instance) {
        return _instance;
    }
    if (this === global) {
        return _instance = new Test();
    }
}

Test.getInstance = function() {
    return new Test();
};
Test.prototype.add = add;
Test.prototype.clone = clone;
Test.prototype.clear = clear;

// --- implement ---
function add(result) {
    if (Array.isArray(result)) {
        Array.prototype.push.apply(_result, result);
    } else {
        _result.push(result);
    }
    return this;
}
function clone() {
    return _result.slice();
}
function clear() {
    _result.length = 0;
}

// --- export ---
global.Test = Test;

})(this);

