(function(global) {

var _instance = null;
var _test = null;

function View() {
    if (_instance) {
        return _instance;
    }
    if (this === global) {
        return _instance = new View();
    }
    this._table = null;
    _buildFrame(this);
}

View.getInstance = function() {
    return _instance = new View();
};
View.prototype.bind = bind;
View.prototype.update = update;

// --- implement ---
function bind(testObject) {
    this._test = testObject;
    return this;
}
function update() {
    this._test && _insert(this); // attached?
    return this;
}

function _buildFrame(that) {
    that._table = document.createElement("table");
    that._table.className = "spec";
    that._table.innerHTML = '<caption>' + userAgent(true) + '</caption>' +
                            '<thead><th>Class</th><th></th><th>Spec</th></thead>' +
                            '<tbody></tbody>';

    global.addEventListener("load", function() {
        document.body.appendChild(that._table);
    });
}

function _insert(that) {
    that._test.clone().forEach(function(item) {
        var row = that._table.tBodies[0].insertRow(-1);
        row.insertCell(0).innerHTML = item.Class;

        var cell = row.insertCell(1);
        if (typeof item.state === "boolean") {
            cell.className = item.state ? "ok" : "ng";
            row.insertCell(2).innerHTML = '<a href="' + item.spec + '" target="_blank">' +
                                          item.id + '</a>';
        } else {
            cell.className = "warn";
            row.insertCell(2).innerHTML = '<a href="' + item.spec + '" target="_blank">' +
                                          item.id + " as ( " + item.state + " )" + '</a>';
        }
    });
    that._test.clear();
}

// --- export ---
global.View = View;

})(this);

