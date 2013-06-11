(function(global) {

var result = [];

var db = null;
var tableName = "BrowserScanner";
var createSQL = "CREATE TABLE IF NOT EXISTS " + tableName + " (id TEXT PRIMARY KEY,data TEXT)";
var insertSQL = "INSERT OR REPLACE INTO " + tableName + " VALUES(?,?)";
var selectSQL = "SELECT id,data FROM " + tableName + " WHERE id=?";
var deleteSQL = "DELETE FROM " + tableName + " WHERE id=?";
var dropSQL   = "DROP TABLE " + tableName;

_open(function(err) {
    _create(err, function(err) {
        _insert(err, function(err) {
            _select(err, function(err) {
                _delete(err, function(err) {
                    _drop(err, function(err) {
                        Test().add(result);
                        View().update();
                    });
                });
            });
        })
    });
});


// --- detect openDatabase(4.75MB) ---
function _open(callback) {
    function _open(size) {
        if (global.openDatabase) {
            try {
                db = global.openDatabase("BrowserScanner" + size, "", "BrowserScanner", 1024 * 1024 * size);
            } catch(err) {
                db = null;
                console.log("ERROR openDatabase(" + size + "MB) " + err);
            }
        }
        return !!db;
    }
    var size = [1, 2, 3, 4, 4.75, 5, 10, 25, 47.5, 50];
    var i = 0, iz = size.length;
    var alreadyError = false;

    for (; i < iz; ++i) {
        if (alreadyError) {
            result.push({ Class: "WebSQL", id: "openDatabase(" + size[i] + "MB)", state: false });
        } else if (_open(size[i])) {
            result.push({ Class: "WebSQL", id: "openDatabase(" + size[i] + "MB)", state: true });
        } else {
            if (!db) {
                alreadyError = true;
                result.push({ Class: "WebSQL", id: "openDatabase(" + size[i] + "MB)", state: false });
            }
        }
    }
    if (!_open(1)) {
        result.push({ Class: "WebSQL", id: "openDatabase(1MB)", state: false });
    }
    callback(!db);
}

function _create(err, callback) {
    err ? callback(err)
        : db.transaction(function(tr)  { tr.executeSql(createSQL); },
                         function(err) { result.push({ Class: "WebSQL", id: "CREATE TABLE", state: err + "" }); },
                         function()    { result.push({ Class: "WebSQL", id: "CREATE TABLE", state: true });
                                         callback(); });
}
function _insert(err, callback) {
    err ? callback(err)
        : db.transaction(function(tr)  { tr.executeSql(insertSQL, ["a", "b"]); },
                         function(err) { result.push({ Class: "WebSQL", id: "INSERT", state: err + "" }); },
                         function()    { result.push({ Class: "WebSQL", id: "INSERT", state: true });
                                         callback(); });
}
function _select(err, callback) {
    err ? callback(err)
        : db.transaction(function(tr)  { tr.executeSql(selectSQL, ["a"], _fetch); },
                         function(err) { result.push({ Class: "WebSQL", id: "SELECT", state: err + "" }); });

    function _fetch(tr, sqlResult) {
        if (!sqlResult.rows.length) {
            result.push({ Class: "WebSQL", id: "SELECT", state: false });
            callback(true);
            return;
        }
        var obj = sqlResult.rows.item(0);

        if (obj.id !== "a" || obj.data !== "b") {
            result.push({ Class: "WebSQL", id: "SELECT", state: false });
            callback(true);
            return;
        }
        result.push({ Class: "WebSQL", id: "SELECT", state: true });
        callback();
    }
}
function _delete(err, callback) {
    err ? callback(err)
        : db.transaction(function(tr)  { tr.executeSql(deleteSQL, ["a"]); },
                         function(err) { result.push({ Class: "WebSQL", id: "DELETE", state: err + "" }); },
                         function()    { result.push({ Class: "WebSQL", id: "DELETE", state: true });
                                         callback(); });
}
function _drop(err, callback) {
    err ? callback(err)
        : db.transaction(function(tr)  { tr.executeSql(dropSQL); },
                         function(err) { result.push({ Class: "WebSQL", id: "DROP TABLE", state: err + "" }); },
                         function()    { result.push({ Class: "WebSQL", id: "DROP TABLE", state: true });
                                         callback(); });
}

})(this);

