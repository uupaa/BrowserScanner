(function(global) {

function Test() {
    if (Test._instance) { return Test._instance; } // <<singleton>>
    if (this === global) { return Test._instance = new Test(); }
    this._result = [];
    this._spec = {};
}
Test._instance = null;
Test.getInstance = function() { return new Test(); };
Test.prototype.add = add;
Test.prototype.spec = spec;
Test.prototype.getSpec = getSpec;
Test.prototype.clone = clone;
Test.prototype.clear = clear;

// --- implement ---
function add(var_args) { // @arg Object/ObjectArray: result object.
                         //                          { Category, Class, id, state } or [ {}, ... ]
    var args = arguments;

    for (var i = 0, iz = args.length; i < iz; ++i) {
        var result = args[i];

        if (result) {
            if (Array.isArray(result)) {
                Array.prototype.push.apply(this._result, result);
            } else {
                this._result.push(result);
            }
        }
    }
    return this;
}
function spec(Class, url) {
    this._spec[Class] = url;
}
function getSpec(Class) {
    return this._spec[Class] || "";
}
function clone() {
    return this._result.slice();
}
function clear() {
    this._result.length = 0;
}

// --- export ---
global.Test = Test;

})(this);

