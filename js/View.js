(function(global) {

var _instance = null;
var _test = null;

function View() {
    if (_instance) { return _instance; } // <<singleton>>
    if (this === global) { return _instance = new View(); }
    this._table = null;
    _buildFrame(this);
}
View.getInstance = function() { return _instance = new View(); };
View.prototype.bind = bind;
View.prototype.update = update;

// --- implement ---
function bind(testObject) {
    this._test = testObject;
    return this;
}
function update() {
    this._test && _insertRows(this); // attached?
    return this;
}
function _buildFrame(that) {
    that._table = document.createElement("table");
    that._table.className = "spec";
    that._table.innerHTML = '<caption>' + userAgent(true) + '</caption>' +
                            '<thead><th>#</th><th>Category</th><th>Class</th><th></th><th>State</th></thead>' +
                            '<tbody></tbody>';

    global.addEventListener("load", function() {
        document.body.appendChild(that._table);
    });
}
function _insertRows(that) {
    that._test.clone().forEach(function(item) {
        if (!item) { return; }

        var Category = item.Category || "";
        var Class = item.Class;
        var id    = item.id;
        var state = item.state;
        var spec  = item.spec || that._test.getSpec(Class) || "";
        var body  = that._table.tBodies[0];
        var rows  = body.rows.length;
        var row   = body.insertRow(-1);

        row.insertCell(0).innerHTML = rows + 1;
        row.insertCell(1).innerHTML = Category;
        row.insertCell(2).innerHTML = Class;

        var cell = row.insertCell(3);
        if (typeof state === "boolean") {
            cell.className = state ? "ok" : "ng";
            row.insertCell(4).innerHTML = '<a href="' + spec + '" target="_blank">' +
                                          id + '</a>';
        } else {
            cell.className = "warn";
            row.insertCell(4).innerHTML = '<a href="' + spec + '" target="_blank">' +
                                          id + " as ( " + state + " )" + '</a>';
        }
    });
    that._test.clear();
}

// --- export ---
global.View = View;

})(this);

