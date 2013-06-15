addEventListener("load", function() {
    Test().spec("StorageQuota", "http://www.w3.org/TR/quota-api/");
    Test().spec("ApplicationCache",
                "http://www.w3.org/TR/html5/browsers.html#offline");


    var mapQuota = {
            "StorageQuotaEnvironment#persistentStorage":false,
            "StorageQuotaEnvironment#temporaryStorage": false,
            "StorageQuota#queryUsageAndQuota":  false,
            "StorageQuota#requestQuota":        false
        },
        mapLocal = {
            "window.localStorage": false,
        },
        mapSQL = {
            "window.openDatabase": false,
//          "WebSQL Database quota 5 MB": 0,
        },
        mapIndex = {
            "indexedDB": false,
        },
        mapAppCache = {
            "window.applicationCache": false,
        };


    mix(mapQuota, {
            "StorageQuotaEnvironment#persistentStorage":
                                        navigator.persistentStorage ? true :
                                        navigator.webkitPersistentStorage ? "webkitPersistentStorage" : false,
            "StorageQuotaEnvironment#temporaryStorage":
                                        navigator.temporaryStorage ? true :
                                        navigator.webkitTemporaryStorage? "webkitTemporaryStorage" : false
    });
    mix(mapLocal, {
            "window.localStorage": !!localStorage
    });
    mix(mapIndex, {
            "indexedDB": !!window.indexedDB
    });
    mix(mapAppCache, {
            "window.applicationCache": !!window.applicationCache
    });

    var env = navigator.persistentStorage || navigator.webkitPersistentStorage || null;
    if (env) {
        mix(mapQuota, {
                "StorageQuota#queryUsageAndQuota":  !!env.queryUsageAndQuota,
                "StorageQuota#requestQuota":        !!env.requestQuota
        });
    }

    if (window.openDatabase) {
        _webSQL(function(result, quota) {
            mix(mapSQL, {
                "window.openDatabase": true,
            });
            _add(quota);
        });
    } else {
        _add(0);
    }

    function _add(quota) {
        for (var id in mapQuota) {
            Test().add({ Category: "Storage", Class: "StorageQuota", id: id, state: mapQuota[id] });
        }
        for (var id in mapLocal) {
            Test().add({ Category: "Storage", Class: "WebStorage", id: id, state: mapLocal[id] });
        }
        for (var id in mapSQL) {
            Test().add({ Category: "Storage", Class: "WebSQL", id: id, state: mapSQL[id] });
        }
        Test().add({ Category: "Storage", Class: "WebSQL", id: "WebSQL Database quota " + quota + "MB", state: quota ? true : false });
        for (var id in mapIndex) {
            Test().add({ Category: "Storage", Class: "IndexedDB", id: id, state: mapIndex[id] });
        }
        for (var id in mapAppCache) {
            Test().add({ Category: "Storage", Class: "ApplicationCache", id: id, state: mapAppCache[id] });
        }
        View().update();
    }

    function mix(base, extend) {
        for (var key in extend) { base[key] = extend[key]; }
        return base;
    }

    function _webSQL(callback) {
        var result = [];

        var db = null;
        var size = 0;
        var tableName = "BrowserScanner";
        var createSQL = "CREATE TABLE IF NOT EXISTS " + tableName + " (id TEXT PRIMARY KEY,data TEXT)";
        var insertSQL = "INSERT OR REPLACE INTO " + tableName + " VALUES(?,?)";
        var selectSQL = "SELECT id,data FROM " + tableName + " WHERE id=?";
        var deleteSQL = "DELETE FROM " + tableName;
        var dropSQL   = "DROP TABLE " + tableName;
        var bigString = new Array(((2.45 * 1024 * 1024) | 0) + 1).join("a"); // 2.45MB

        _open(4.75, function(err) {
            _create(err, function(err) {
                _delete(err, function(err) {
                    _insert(err, function(err) {
                        _select(err, function(err) {
                            _delete(err, function(err) {
                                _drop(err, function(err) {
                                    callback(result, size);
                                }, true);
                            }, true);
                        }, true);
                    }, true);
                }, true);
            }, true);
        });

        // --- detect openDatabase(4.75MB) ---
        function _open(size, callback, silent) {
            if (window.openDatabase) {
                try {
                    db = window.openDatabase("BrowserScanner", "", "BrowserScanner", size * 1024 * 1024);
                    silent ? 0
                           : result.push({ Category: "Storage", Class: "WebSQL", id: "window.openDatabase", state: 4.75 });
                } catch (err) {
                    db = null;
                    console.log("ERROR openDatabase(" + size + "MB) " + err);
                    result.push({ Category: "Storage", Class: "WebSQL", id: "window.openDatabase", state: false });
                }
            }
            callback(!db);
        }

        function _create(err, callback, silent) {
            err ? callback(err)
                : db.transaction(function(tr)  { tr.executeSql(createSQL); },
                                 function(err) { result.push({ Category: "Storage", Class: "WebSQL", id: "CREATE TABLE", state: err.message }); callback(err); },
                                 function()    { silent ? 0 : result.push({ Category: "Storage", Class: "WebSQL", id: "CREATE TABLE", state: true });
                                                 callback(); });
        }
        function _insert(err, callback, silent) {
            db.transaction(
                function(tr)  {
                    size += 5;
                    tr.executeSql(insertSQL, ["a", bigString]);
                    size += 5;
                    tr.executeSql(insertSQL, ["b", bigString]);
                    size += 5;
                    tr.executeSql(insertSQL, ["c", bigString]);
                    size += 5;
                    tr.executeSql(insertSQL, ["d", bigString]);
                    size += 5;
                    tr.executeSql(insertSQL, ["e", bigString]);
                    size += 5;
                    tr.executeSql(insertSQL, ["f", bigString]);
                    size += 5;
                    tr.executeSql(insertSQL, ["g", bigString]);
                    size += 5;
                    tr.executeSql(insertSQL, ["h", bigString]);
                    size += 5;
                    tr.executeSql(insertSQL, ["i", bigString]);
                    size += 5;
                    tr.executeSql(insertSQL, ["j", bigString]);
                },
                function(err) {
                    result.push({ Category: "Storage", Class: "WebSQL", id: "WebSQL Database quota " + (size - 5) + "MB", state: true });
                    callback();
                },
                function()    {
                    result.push({ Category: "Storage", Class: "WebSQL", id: "WebSQL Database quota " + size + "MB", state: true });
                    callback();
                });
        }
        function _select(err, callback, silent) {
            err ? callback(err)
                : db.transaction(function(tr)  { tr.executeSql(selectSQL, ["a"], _fetch); },
                                 function(err) { result.push({ Category: "Storage", Class: "WebSQL", id: "SELECT", state: err.message }); callback(err); });

            function _fetch(tr, sqlResult) {
                if (!sqlResult.rows.length) {
                    result.push({ Category: "Storage", Class: "WebSQL", id: "SELECT", state: false });
                    callback(true);
                    return;
                }
                var obj = sqlResult.rows.item(0);

                if (obj.id !== "a" || obj.data.length !== bigString.length) {
                    result.push({ Category: "Storage", Class: "WebSQL", id: "SELECT", state: false });
                    callback(true);
                    return;
                }
                silent ? 0
                       : result.push({ Category: "Storage", Class: "WebSQL", id: "SELECT", state: true });
                callback();
            }
        }
        function _delete(err, callback, silent) {
            err ? callback(err)
                : db.transaction(function(tr)  { tr.executeSql(deleteSQL); },
                                 function(err) { result.push({ Category: "Storage", Class: "WebSQL", id: "DELETE", state: err.message }); callback(err); },
                                 function()    { silent ? 0 : result.push({ Category: "Storage", Class: "WebSQL", id: "DELETE", state: true });
                                                 callback(); });
        }
        function _drop(err, callback, silent) {
            err ? callback(err)
                : db.transaction(function(tr)  { tr.executeSql(dropSQL); },
                                 function(err) { result.push({ Category: "Storage", Class: "WebSQL", id: "DROP TABLE", state: err.message }); callback(err); },
                                 function()    { silent ? 0 : result.push({ Category: "Storage", Class: "WebSQL", id: "DROP TABLE", state: true });
                                                 callback(); });
        }
    }
});

